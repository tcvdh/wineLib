export default function Loader() {
  return (
    <div className="flex h-[60vh] items-center justify-center" role="status">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-mist border-t-merlot" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
