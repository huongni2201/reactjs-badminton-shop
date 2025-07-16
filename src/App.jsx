import { Bounce, ToastContainer } from 'react-toastify';
import Routers from './routes/Routers';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <>
            <UserProvider>
                <CartProvider>
                    <Routers />
                    <ToastContainer
                        position='top-right'
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='light'
                        transition={Bounce}
                    />
                </CartProvider>
            </UserProvider>
        </>
    );
}

export default App;
