import React, { useState,useEffect } from "react";
import { searchProducts } from "../../../actions/productAction";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useState(false)
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const savedKeyword = localStorage.getItem("searchKeyword");
        if (savedKeyword) {
            setKeyword(savedKeyword);
        }
    },[]);

    useEffect(()=>{
        dispatch(searchProducts(keyword))
    },[dispatch,keyword])

    function handleClick() {
        setSearch(true)
    }
    function handleChange(e) {
        e.preventDefault();
        setSearch(false)
        setKeyword("")
        localStorage.removeItem("searchKeyword")
    }
  
    function handleSearch() {

        if (keyword.trim() !== "") {
            localStorage.setItem("searchKeyword", keyword);
        }

    }
    function handleKeyPress(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
            navigate("/products/search")
        }
    }

    return (
        <form className={`search_container ${search ? 'open' : ''}`} >
            <div className={`search_icon ${search ? 'animate' : ''}`} onClick={handleClick}>
                <i className="ri-search-2-line"></i>
            </div>
            <input
                className={`search_input ${search ? 'animate' : ''}`}
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button className={`search_button ${search ? 'pop_up' : ''}`} onClick={handleChange}>
                Cancel
            </button>
        </form>
    )
}

export default SearchBar;