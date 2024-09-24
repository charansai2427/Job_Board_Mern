import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdModeEditOutline} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "../styles/profileform.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../redux/slices/dataSlice";
import Header from "./header";

const BuildProfile = () => {
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
  console.log(userDetails);
  
  useEffect(() => {
    if(!token) navigate("/admin/login")
    dispatch(getUser({ userId: userId }));
    
  }, [token]);
  return (
    <div className="buldmyprofile-container">
       <Header/>
       <div className="container profile-container bg-white">
        <div className="profile-div" >
          <div className="profile-details" >
            <div className="no1">
              <div>
                <label style={{paddingRight:'1.1em'}}>User Name :</label>
              </div>
              <div>
                <input 
                  type="text" style={{width:'16em',height:'2.5em',textAlign:'center',marginRight:'0.5em'}}
                  placeholder={`${userDetails.username}`}
                  onChange={(e) => setFormData({...formData,username : e.target.value})}
                />
              </div>
            </div>
            <div className="no1">
           
              <div>
                <label style={{paddingRight:'4em'}}>Name :</label>
              </div>
              <div>
                <input
                  type="text" style={{width:'16em',height:'2.5em',textAlign:'center',marginRight:'1em'}}
                  name="name"
                  placeholder={`${userDetails.name? userDetails.name:"N/A"}`}
                  onChange={(e) => setFormData({...formData,name : e.target.value})}
                />
              </div>
           
            </div>
            <div className="no1">
          
              <div>
                <label>Email Address :</label>
              </div>
              <div>
                <input
                  type="text" style={{width:'16em',height:'2.5em',textAlign:'center',marginRight:'0.5em'}}
                  placeholder={`${userDetails.email}`}
                  readOnly
                />
              </div>
           
            </div>
            <div className="no1">
            
              <div>
                <label>Phone Number :</label>
              </div>
              <div>
                <input
                  type="text" style={{width:'16em',height:'2.5em',textAlign:'center',marginRight:'1em'}}
                  placeholder={`+91${userDetails.mobilenumber}`}
                  readOnly
                />
              </div>
           
            </div>
            <div className="no1">
              <div>
                <label style={{paddingRight:'0.9em'}}>Date of Birth :</label>
              </div>
              <div>
                <input
                  type="date" style={{width:'16em',height:'2.5em',textAlign:'center',marginRight:'0.6em',color:'rgb(244,179,74)'}}
                  placeholder= "Dob"
                  onChange={(e) => setFormData({...formData,dob : e.target.value})}
                />
              </div>
            </div>
            <div className="no1">
              <div>
                <label style={{paddingRight:'4em'}}>Gender :</label>
              </div>
              <div>
                <input
                  type="text" style={{width:'16em',height:'2.5em',textAlign:'center',marginRight:'1.1em'}}
                  placeholder="gender"
                  onChange={(e) => setFormData({...formData, gender : e.target.value})} 
                />
              </div>
            </div>
            <div className="no1">
              <div><label style={{paddingRight:'3.5em'}}>Address :</label></div>
            <textarea onChange={(e) => setFormData({...formData, address: e.target.value})} >{`${userDetails.address? userDetails.address:"N/A"}`}</textarea>
            </div>
          </div>
      
          <div className="saved" >
            <button onClick={handleClick} type="button" className="rounded" style={{width:'7em',height:'7vh',border:'none',outline:'none',backgroundColor:'orange',marginLeft:'29em',marginTop:'2em'}}>Save User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildProfile;
