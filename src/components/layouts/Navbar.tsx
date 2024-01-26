import { useLocation, useNavigate } from "react-router-dom";

import Search from "@/components/elements/Search";
import { Button } from "@/components/ui/button";

import Logo from "/src/assets/logo.png";
import Logo2 from "/logo-ico.png";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className="backdrop-blur-sm w-full border-b md p-3 flex justify-center sticky top-0 z-10">
      <nav className="w-[1032px] flex items-center justify-between gap-x-4 md:gap-x-16">
        <img
          onClick={() => navigate("/")}
          src={Logo}
          alt="Logo Wisata App"
          className="h-[42px] cursor-pointer hidden md:block"
        />
        <img
          onClick={() => navigate("/")}
          src={Logo2}
          alt="Logo Wisata App"
          className="h-[42px] cursor-pointer block md:hidden"
        />
        {pathname !== "/" && <Search />}
        <Button variant={"default"} className="h-[36px]">
          Sign In
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
