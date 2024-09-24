import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllJobs, getSearchJobs, searchState } from "../redux/slices/dataSlice";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import "../styles/header.scss";
import Home from "./home";

function Header() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const [on, setOn] = useState(false);
  const searchJobs = useSelector((state) => state.User.value.searchJobs);
  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState({});
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const handleClick = () => {
  //   setOpen(!isOpen);
  // };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const searchClick = () => {
    dispatch(getSearchJobs({ searchedInput: search }));
    dispatch(searchState(true))
  };

  useEffect(() => {
    dispatch(getAllJobs());
    if (!token) {
      navigate("/login");
      window.location.reload();
    }
  }, [token]);

  return (
    <div className="header-container-main bg-white ">
      <div className="header-container ">
        <div className="logo-container">
          <div className="logo">
            <img
              src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"
              onClick={() => {
                dispatch(searchState(false));
                navigate("/home")
              }}
            />
          </div>
        </div>
        <div className="search-container">
          <div className="search">
            <div className="inputSearch">
              <input
                type="search"
                placeholder="Search Company/Role"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="search-btn">
              <button>
                <BiSearch className="search-icon" onClick={searchClick} />
              </button>
            </div>
          </div>
        </div>
        {/* <div className="ifollow" onClick={() => navigate("/ifollow")}>
          <p>i-Follow</p>
          </div>
        <div className="profile-icon-container">
          <div onClick={handleClick} className="profile-name">
            <p>{email && email.slice(0, 2).toUpperCase()}</p>
          </div>
        </div> 
      
      <div className="mprofile">
        <label onClick={() => navigate("/profile/:userId")}>My Profile</label>
      </div>
      <div className="savjob">
        <Link className="save"  to={"/savedJobs/" + userId}>Saved Jobs
          <label onClick={()=> navigate("/savedJobs/:userId")}>Saved Jobs</label>
          </Link>
      </div>
      <div className="log">
        <label className="out" onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}>Logout</label>
      </div> */}

   
        <div>
          <img src="https://res.cloudinary.com/dpt7h5lui/image/upload/v1706353805/3388823_n8wnxd.png" onClick={() => setOpen(!isOpen)} className={`hamburger-button ${isOpen ? "open" : "close"}`} />
          
          <div className={`panel ${isOpen ? "open" : "close"}`}>
          
            <ul>

              <li>
                <label    onClick={() => {
                dispatch(searchState(false));
                navigate("/home")
              }}>Home</label>
              </li>
              <li>
                <label onClick={() => navigate("/ifollow")}>I-Follow</label>
              </li>
              <li>
                <label onClick={() => navigate("/profile/:userId")}>My Profile</label>
              </li>
              <li>
                <Link className="save" to={"/savedJobs/" + userId} style={{color:'white',textDecoration:'solid'}}><label>Saved Jobs
                </label> 
                </Link>     
                    </li>
              <li>
                <label className="out" onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div
        className={` profile-dropdown ${open ? "display" : "display-none"}`}
      >
        <ul>
          <li onClick={() => navigate("/profile/:userId")}>My Profile</li>
          <li>
            <Link
              to={"/savedJobs/" + userId}
              style={{ color: "black", textDecoration: "solid" }}
            >
              Saved Jobs
            </Link>
          </li>
          <li
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Log Out
          </li>
        </ul>
      </div> */}


    </div>
  );
}

export default Header;