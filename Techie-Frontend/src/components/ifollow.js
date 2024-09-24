import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRightLong } from "react-icons/fa6";
import { verifyToken } from "../utils/utlis";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ifollow.scss";
import"../styles/home.scss";
import Header from "./header";
import Footer from "./footer";
import Navigationpanel from "./navigationpanel";
import { getAllCompanies, getUserFollowedComp } from "../redux/slices/dataSlice";

function Ifollow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    dispatch(getAllCompanies());
    dispatch(getUserFollowedComp({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!verifyToken(email, userId, token)) {
      navigate("/login");
      window.location.reload();
    }
  }, [email, userId, token, navigate]);

  const companyData = useSelector((state) => state.User.value.companyData);
  const followedCompanies = useSelector(
    (state) => state.User.value.followedCompanies
  );

  console.log(companyData, followedCompanies);
  const renderCompany = (company) => (
    <Link to={`/viewCompany/${company._id}`} className="link" style={{color:'black',textDecoration:'solid'}}>

<div key={company._id} className="browse-comp-inner border shadow">
      <div className="comp-profile">
        <div>
          <p
            className="random"
            style={{
              backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,color:'white'
            }}
          >
            {company?.company_name.slice(0, 2).toUpperCase()}
          </p>
        </div>
        <div>
          <div>
            <b>{company.company_name}</b>
          </div>
          <div>{company.location}</div>
        </div>
      </div>
      <div className="view-company">
        <Link to={`/viewCompany/${company._id}`} className="link">
          View Company <FaArrowRightLong />
        </Link>
      </div>
    </div>
    </Link>
  );

  return (
    <div className="ifollowcomp">
      <Header />
      <div className="ifollow-inner container">
        <div className="ifollow-text">i-Follow</div>

        <div className="followed">
          <h2>Companies Followed</h2>
        </div>

        <div className="browse-comp">{followedCompanies && followedCompanies.map(renderCompany)}</div>

        <div className="browse">
          <h2>Browse Companies</h2>
        </div>

        <div className="browse-comp">{companyData && companyData.map(renderCompany)}</div>
      </div>

      <Footer />
      <Navigationpanel />
    </div>
  );
}

export default Ifollow;