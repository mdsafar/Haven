import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import SearchPopup from "./SearchPopup";

const SearchButton = () => {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(true);
  }

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={handleClick}
      >
        <RiSearch2Line size={20} />
      </div>
      <SearchPopup open={open} handleClose={()=> setOpen(false)} />
    </>
  );
};

export default SearchButton;
