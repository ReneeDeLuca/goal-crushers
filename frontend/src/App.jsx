import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <section className="relative container overflow-auto min-w-[450px] mx-auto justify-center pt-2 pb-28">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default App;
