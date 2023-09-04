import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <section className="relative container overflow-x-auto min-w-[450px] mx-auto justify-center px-6 py-2 lg:px-8">
        <Outlet />
      </section>
    </>
  );
};

export default App;
