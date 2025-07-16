import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const ClientLayout = () => {
    return (
        <>
            <Navbar />

            <main className=''>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default ClientLayout;
