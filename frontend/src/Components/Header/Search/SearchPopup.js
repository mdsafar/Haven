import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../../actions/productAction";

const SearchPopup = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  function handleSearch() {
    if (keyword.trim() !== "") {
      dispatch(searchProducts(keyword));
    }
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
      navigate("/products/search");
    }
  }

  return (
    <Modal
      show={open}
      fullscreen={true}
      style={{ height: "300px" }}
      onHide={handleClose}
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Haven</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          className="search_input"
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </Modal.Body>
    </Modal>
  );
};

export default SearchPopup;
