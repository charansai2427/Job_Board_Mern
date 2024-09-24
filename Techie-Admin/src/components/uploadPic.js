import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";
import "../styles/uploadPic.scss";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, uploadImage } from '../redux/slices/dataSlice';
import axios from 'axios';


function UploadPic() {
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const upload = useSelector((state) => state.User.value.upload)
    const [image,setImage] = useState("");
    console.log(image);
    const dispatch = useDispatch();
    const onHandleClick = (e) => {
       const data =  new FormData()
       data.append("file",image);
       data.append("upload_preset","p4mod1jk");
       data.append("cloud_name","dzeek4uww")
       
       console.log(data);
       dispatch(uploadImage(data));
       dispatch(updateUser({profile_pic : upload.url}))
    }
  return (
    <div className='container-fluid'>
          <div className="home-container">
        <div className="line"></div>
        <div className="home-container-header">
          <div>
            <img
              className="logo"
              src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"
            />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3 border p-1 searchbar-div">
            <div>
              <input
                className=" border-0 searchbar"
                placeholder="Search by Designation/KeyWord"
              />
            </div>
            <div className="h4 pt-1">
              <GoSearch className="" />
            </div>
          </div>
          <div>Jobs</div>
          <Link
            to={"/profile=/" + userId}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
          >
            Build My Profile
          </Link>
          <div className="border rounded-pill p-2 border-success text-success">
            iFollow
          </div>
          <div className="profile-name">
            <p>{email && email.slice(0, 2).toUpperCase()}</p>
          </div>
        </div>
      </div>
      <div className='container'>
          <h2 className='text-secondary'>Edit Photo</h2>
          <p className='h4'>Photo*</p>
          <input type='file' onChange={(e) => setImage(e.target.files[0])} />
          <p>Please upload your profile pic</p>
          <div className='display-pic'>
          
            {
              upload.url? <img src = {upload.url}/> : <p></p>
            }
            
          </div>
          <button onClick={onHandleClick}>Save</button>
      </div>
    </div>
  )
}

export default UploadPic
