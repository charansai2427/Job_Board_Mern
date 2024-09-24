import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAllJobs } from '../redux/slices/dataSlice';
import { BiSearch } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { Progress } from 'reactstrap';
import "../styles/header.scss"

function Header() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(!open);
  };
    
  useEffect(() => {
    dispatch(getAllJobs());
    if (!token) {
      navigate("/admin/login");
      window.location.reload();
    }
  }, [token]);
  return (

    <div className="home-container shadow bg-white ">
      <div className="line"></div>
      <div className="home-container-header">
        <div>
          <img
            className="logo"
            src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png" onClick={() =>navigate("/admin/dashboard")}
          />
        </div>
        <div>
          <input type="search" placeholder="Search by Keyboard / desigination / role / company" style={{ position: 'relative', top: '0.1em', left: '2em', borderRadius: '50px', width: '27em', height: '3em', border: 'solid rgb(232,235,238)' }} />
          <BiSearch style={{ position: "absolute", top: '1.3em', left: "27em", fontSize: '1.5em', color: 'gray' }} />
        </div>

        <div>
          <Link
            to={"/profile/edit/:" + userId}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "gray",
              fontSize:'1.5em',
            }}
          >
            Build My Profile
          </Link>
          <Progress
            color="warning"
            striped
            value={50} style={{height:'1.5vh'}}
          />
        </div>
        <div className="border rounded-pill p-2 border-success text-success">
          iFollow
        </div>
        <div onClick={handleClick} className="profile-name">
          <p>{email && email.slice(0, 2).toUpperCase()}</p>
        </div>
      </div>
      <div
        className={` profile-dropdown ${open ? "display" : "display-none"}`}
      >
        <ul>
          <li onClick={() => navigate("/profile=/:userId")}>My Profile</li>
          <li>Saved Jobs</li>
          <li>Applied Jobs</li>
          <li
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Log Out
          </li>
        </ul>
      </div>
    </div>

  )
}

export default Header
