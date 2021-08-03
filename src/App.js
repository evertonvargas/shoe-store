import Routes from "./routes";
import GlobalStyles from "./styles/global";
import Header from "./components/Header";
import { CartProvider } from "./hooks/useCart";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <GlobalStyles />
        <Header />
        <Routes />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
