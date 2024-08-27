import Footer from "components/footer/Footer";
import Header from "components/Header/Header";
import { Outlet } from "react-router-dom";

export const PageLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <div className="justify-center flex-grow"></div>
      <Footer />
    </div>
  );
};
