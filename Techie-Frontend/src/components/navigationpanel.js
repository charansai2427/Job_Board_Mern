import React from "react";
import { IoMdHome } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdFactory } from "react-icons/md";
import "../styles/navigationpanel.scss";
import { Link, useNavigate } from "react-router-dom";


function Navigationpanel() {
  const navigate = useNavigate();
  return (
    <div className="navigation-container border shadow bg-light container">
      <div className="navigation">
        <div className="categories" onClick={() => navigate("/home")}>
          <div>
            <IoMdHome />
          </div>
          <div>Home</div>
        </div>
        <div className="categories">
          <div>
            <IoSearchOutline />
          </div>
          <div>Search</div>
        </div>
        <div className="categories" onClick={() => navigate("/ifollow")}>
          <div>
            <MdFactory />
          </div>
          <div>i-Follow</div>
        </div>
        <div className="categories">
              <Link to={"/profile/"+ localStorage.getItem("userId")}>
              <div>
            <FaUserCircle />
          </div>
          <div>Profile</div>
              </Link>
         
        </div>
      </div>
    </div>
  );
}

export default Navigationpanel;
