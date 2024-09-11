import Footer from "components/footer/Footer";
import Header from "components/Header/Header";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LocationUrlAtom } from "store/LocationUrl";

export const PageLayout = () => {
  const location = useLocation();
  const [, setLocation] = useAtom(LocationUrlAtom);

  useEffect(() => {
    if(location.state?.type === 'edit') {
      setLocation(true);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <div className="justify-center flex-grow"></div>
      <Footer />
    </div>
  );
};
