import { ReactNode } from "react";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col overflow-auto">
      <Navbar />
      <section className="flex-1 container xl:w-[1032px] py-2 px-0">
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
