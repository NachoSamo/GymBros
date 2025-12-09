import { Outlet } from 'react-router-dom';
import NavBar from '../components/navbar/NavBar';
import { Footer } from '../components/footer/Footer';

export default function LayoutPostLogin() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}