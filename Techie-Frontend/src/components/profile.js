import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Header from "./header";
import { getUser, updateUser } from "../redux/slices/dataSlice";
import { Link, useNavigate } from "react-router-dom";
import "../styles/profile.scss";
import { IoMdSettings } from "react-icons/io";
import Navigationpanel from "./navigationpanel";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const date = new Date();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [open, setOpen ] = useState(false)
  console.log(formData);
  const handleClick = (e) => {
    e.preventDefault()
      dispatch(updateUser({...formData, lastupdatetime : date}));
      alert("Saved Successfully")
  }
  const handleClick1 = () => {
    setOpen(!open)
}
  const userDetails = useSelector((state) => state.User.value.userDetails);

  
  useEffect(() => {
    if(!token) navigate("/accounts/login")
    dispatch(getUser({ userId: userId }));
    
  }, [token]);
  return (
    <div className="profile-container">
       <Header/>
       <div className="profile p-3">
          <div className="card">
              <div className="card-header d-flex justify-content-between">
                 <div>Profile</div>
                 <div>
<IoMdSettings /></div>
              </div>
             <div className="card-body">
             <div>
                <span>User Name :</span> {userDetails?.username}
              </div>
              <div>
                <span>Email Address :</span> {userDetails?.email}
              </div>
              <div>
                <span>Phone number :</span> {userDetails?.mobilenumber}
              </div>
              <div>
                <span>Date of Birth :</span> N/A
              </div>
              <div>
                <span>Gender :</span> N/A
              </div>
              <div>
                <span>Category:</span> N/A
              </div>
              <div>
                <span>Address :</span> N/A
              </div>
              <div>
                <span>Languages :</span> N/A
              </div>
             </div>
             <div className="card-footer">
               <Link to={"/savedJobs/" + localStorage.getItem("userId")} style={{textDecoration:'solid'}}>
               <div className="fw-bold" style={{cursor: "pointer",textDecoration:"solid", color: "black"}} >
                  Saved Jobs
                </div>
               </Link>
                <div className="fw-bold" style={{cursor: "pointer"}} onClick={() => localStorage.clear()}>
                  Log Out
                </div>
             </div>
          </div>
       </div>
       <Navigationpanel/>
    </div>
  );
};

export default Profile;