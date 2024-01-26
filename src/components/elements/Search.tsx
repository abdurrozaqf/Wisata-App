import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="w-full bg-slate-200 rounded-md py-[10px] md:py-[8px] flex justify-center">
      <h1 className="font-medium flex items-center">
        <SearchIcon size={15} className="mr-2" />{" "}
        <span className="text-xs md:text-sm">
          The Langham, Jakarta · 1 – 3 Jun
        </span>
      </h1>
    </div>
  );
};

export default Search;
