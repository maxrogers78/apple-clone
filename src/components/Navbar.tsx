import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-between px-5 py-5 sm:px-10">
      <nav className="screen-max-width flex w-full justify-between">
        <img src={appleImg} alt="Apple logo" width={14} height={18} />

        <div className="flex flex-1 justify-center gap-10 max-sm:hidden">
          {navLists.map((item) => (
            <div
              key={item}
              className="text-gray cursor-pointer text-sm transition-all hover:text-white"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
          <img src={searchImg} alt="Search icon" width={14} height={18} />
          <img src={bagImg} alt="Shopping bag icon" width={14} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
