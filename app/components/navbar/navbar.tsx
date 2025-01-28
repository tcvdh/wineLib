import MobileNavbar from './mobile';
import DesktopNavbar from './desktop';

export default function Navbar() {
    return (
        <>
            <div className='hidden md:block'>
                <DesktopNavbar />
            </div>
            <div className='md:hidden'>
                <MobileNavbar />
            </div>
        </>
    );
}