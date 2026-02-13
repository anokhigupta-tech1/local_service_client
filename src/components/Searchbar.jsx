import React from "react";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";

export default function Searchbar({
  searchValue,
  setSearchValue,
  handleSearch,
}) {
  return (
    <form
      className="flex items-center justify-start gap-3 px-3 py-2 border shadow lg:w-1/2 md:w-2/3 w-full rounded-md"
      onSubmit={handleSearch}
    >
      <button type="submit">
        <FaSearch size={20} className="text-[#039cad] cursor-pointer" />
      </button>
      <input
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={
          "outline-none border-none py-2 focus:outline-none focus:border-none w-full"
        }
        placeholder={"Search for Plumber or Math Tutor.."}
      />
    </form>
  );
}
