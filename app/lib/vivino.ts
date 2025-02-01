"use server";
import * as cheerio from "cheerio";
import { getVivinoPrice } from "./getVivinoPrice";

// https://www.vivino.com/NL/nl/wines/1531643?year=2012
// https://api.vivino.com/v/9.1.1/vintages/1852295
// in this top one you can also find the wine number for the link below
// https://api.vivino.com/v/9.0.0/wines/79265
// in this top one you can also find all the vintages with their id for the 9.1.1 api

interface Vino {
  name: string;
  link: string;
  thumb: string;
  price: string;
  region: string;
  country: string;
}

const BASE_URL = "https://www.vivino.com";
const SEARCH_PATH = "/search/wines?q=";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const RESULT_LIMIT = 3;

// export async function GET(request: Request): Promise<Response> {
export async function fetchWinesFromVivino(name: string): Promise<Vino[]> {
  // const url = new URL(request.url);
  // const name = url.searchParams.get('name');
  // const result: { vinos: Vino[], http_status?: number } = { vinos: [] };

  const result: Vino[] = [];

  if (!name) {
    throw new Error("Name query parameter is required");
  }

  try {
    const response = await fetch(`${BASE_URL}${SEARCH_PATH}${name}`, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html",
      },
      method: "GET",
      redirect: "follow",
      // cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const body = await response.text();
    const $ = cheerio.load(body);

    const CARDS_SELECTOR = ".default-wine-card";
    const NAME_SELECTOR = ".wine-card__name";
    const REGION_SELECTOR = ".wine-card__region .link-color-alt-grey";
    const LINK_SELECTOR = "a";
    const THUMB_SELECTOR = ".wine-card__image";
    const THUMB_REGEX = /url\((['"])?(.*?)\1\)/;

    await Promise.all(
      $(CARDS_SELECTOR).map(async (i, e) => {
        if (i >= RESULT_LIMIT) return false; // Limit to the first 3 items

        const nameElement = $(e).find(NAME_SELECTOR);
        const linkElement = $(e).find(LINK_SELECTOR);
        const thumbElement = $(e).find(THUMB_SELECTOR);
        const regionElement = $(e).find(REGION_SELECTOR).first();
        const countryElement = $(e).find(REGION_SELECTOR).eq(1);

        const name = nameElement.text().trim();
        // const nameId = name
        //     .normalize('NFD')
        //     .replace(/[\u0300-\u036f]/g, '')
        //     .replace(/\s+/g, '-')
        //     .replace(/[()]/g, '')
        //     .toLowerCase();
        // console.log(nameId);
        const link = linkElement.attr("href");
        const id = link ? link.split("/").pop() : "";
        // console.log(id)
        // const wineId = $(e).attr('data-wine');
        // console.log(wineId)
        const thumbStyle = thumbElement.attr("style");
        const thumbMatch = thumbStyle?.match(THUMB_REGEX);
        if (!thumbMatch) {
          throw new Error("Could not extract thumbnail URL");
        }

        const thumbUrl = `https:${thumbMatch[2].replace(
          /_pb_\d+x\d+\.png$/,
          "_pb_x600.png"
        )}`;
        const region = regionElement.text().trim();
        const country = countryElement.text().trim();
        let price = "";

        if (id) {
          price = (await getVivinoPrice(id)) || "";
        }

        result.push({
          name,
          link: `${BASE_URL}${link}`,
          thumb: thumbUrl,
          price,
          region,
          country,
        });
      })
    );
  } catch (error) {
    console.error("Exception:", error);
    throw new Error("Internal Server Error");
  }

  // to get the redirect link / wine id link instead of vintage link (with name in link)
  // const redirectResponse = await fetch(`${result.vinos[0].link}`, {
  //     headers: {
  //         'User-Agent': USER_AGENT,
  //         'Accept': 'text/html',
  //     },
  //     method: 'GET',
  //     redirect: 'manual',
  //     cache: 'no-store',
  // });

  // if (redirectResponse.status === 301 || redirectResponse.status === 302) {
  //     const newUrl = redirectResponse.headers.get('location');
  //     console.log(`Redirected to: ${newUrl}`);
  // } else {
  //     console.log(`No redirect, status code: ${redirectResponse.status}`);
  // }

  return result;
}
