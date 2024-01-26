import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-100 w-full flex justify-center p-4">
      <div className="w-[1032px] h-[64px] flex items-center justify-between">
        <h1 className="flex gap-x-3 font-medium">
          © Wisata App
          <span>·</span>
          <Link to="/terms" className="text-slate-500">
            Terms
          </Link>
        </h1>
        <p className="text-xs">v4.01</p>
      </div>
    </footer>
  );
};

export default Footer;
