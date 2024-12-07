import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import Logo from "./Logo";
import UserOptions from "./UserOptions";
import { useDispatch, useSelector } from "react-redux";
import SidePanel from "./SidePanel";
import { getBagItem } from "../../actions/bagAction";
import SearchButton from "./Search/SearchButton";

const nav_link = [
  {
    path: "/",
    display: "Featured",
  },
  {
    path: "/stores",
    display: "Stores",
  },
  {
    path: "/men",
    display: "Men",
  },
  {
    path: "/women",
    display: "Women",
  },
  {
    path: "/kids",
    display: "Kids",
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { bagItems } = useSelector((state) => state.bag);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const openSidePanel = () => {
    setIsSidePanelOpen(true);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  const id = user?._id;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getBagItem(id));
    }
  }, [dispatch, id, isAuthenticated]);

  return (
    <>
      <div className="header">
        <div className="nav_bar">
          <Logo />
          <div className="navigation">
            <ul className="menu">
              {nav_link.map((items, index) => {
                return (
                  <li key={index} className="nav_items ">
                    <NavLink
                      className={(navActive) =>
                        navActive.isActive ? "nav_active" : ""
                      }
                      to={items.path}
                    >
                      {items.display}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="nav_right ">
            <SearchButton />
            <div className="fav-bag ">
              <div className="bag-icon">
                <Link to="/bag">
                  <i class="ri-handbag-line"></i>
                  {bagItems && bagItems.length > 0 && (
                    <span className="item-count">{bagItems.length}</span>
                  )}
                </Link>
              </div>
              {isAuthenticated && user ? (
                <div className="options">
                  <UserOptions />
                </div>
              ) : (
                <div className="acc_icon">
                  <Link to="/login">
                    {" "}
                    <i class="ri-account-circle-line"></i>
                  </Link>
                </div>
              )}
            </div>
            <div onClick={openSidePanel} className="mobile_menu">
              <i class="ri-menu-line"></i>
            </div>
            <SidePanel isOpen={isSidePanelOpen} closePanel={closeSidePanel} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
