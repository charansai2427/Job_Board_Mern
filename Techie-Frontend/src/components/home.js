import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../redux/slices/dataSlice";
import Header from "./header";
import Footer from "./footer";

import NavigationPanel from "./navigationpanel";
import { verifyToken } from "../utils/utlis";
import "../styles/home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, userId, token } = localStorage;

  const { jobData, searchOn, getSearchJob } = useSelector(
    (state) => state.User.value
  );

  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState({});
  const [filtJobs, setFiltJobs] = useState([]);
  const [on, setOn] = useState(false);

  useEffect(() => {
    dispatch(getAllJobs());

    if (!verifyToken(email, userId, token)) {
      navigate("/login");
    }
  }, [dispatch, email, userId, token, navigate]);

  useEffect(() => {
    setOn(searchOn);
  }, [searchOn]);

  const filter = () => {
    const uniqueRoles = Array.from(
      new Set(jobData.map((job) => job.role.trim()))
    );
    setRoles({ rolesArr: uniqueRoles });
  };

  const handleRoleChange = (e) => {
    if (e.target.value === "All") {
      setFiltJobs(jobData.map((job) => job));
      setOpen(true);
    } else {
      setFiltJobs(jobData.filter((job) => job.role === e.target.value));
      setOpen(true);
    }
  };

  // Render individual job card
  const renderJobCard = (job) => (
    
    <div key={job._id} className=" jobs-single shadow-lg border rounded container">
        <Link className="view-job-link" to={"/viewJOb/" + job._id} style={{color:'black'}}>
        <div>

            <div className="card-1">
            <div>
                <h5 className="title">{job.title}</h5>
                <h5 className=" h5 text-secondary">{job.company_name}</h5>
                <div>
                <span>Role :</span>
                <label className="h6">{job.role}</label>
                </div>
                <div>
                <span >Functional Area : </span>
                <label className="h6">{job.functionalarea}</label>
                </div>
                <div>
                <span>States/Cities :</span>
                <label className="h6">{job.States}</label>
                </div>
                <div>
                <span>Employment Type :</span>
                <label className="h6">{job.employmenttype}</label>
                </div>
            </div>

            <div>
                <span>Skills :</span>
                <div className="skills container">
                {job.skills &&
                    job.skills.split(",").map((i) => {
                    return (
                        <div>
                        <Link to={"/searchSkill/" + i} style={{textDecoration:'solid'}}>
                            <label className="skills-text bg-secondary rounded-pill h6 ps-2 pe-2 pb-1 pt-1">{i}</label>
                        </Link>
                        </div>
                    );
                    })}
                </div>
            </div>
            {/* <span>Hirings :</span> */}
            <div className="d-flex flex-wrap gap-2 justify-content-start container hirings">
              <div>
                <label className="hiring-01 bg-success text-white rounded-pill ps-2 pe-2 pb-1 pt-1">Hirings</label>
              </div>
                <div>
                <label className="h6 hiring-01 rounded-pill bg-secondary text-white ps-2 pe-2 pb-1 pt-1">{job.experience}</label>
                </div>
                <div>
                <span className="hiring-01 rounded-pill bg-secondary text-white ps-2 pe-2 pb-1 pt-1">
                    {job.salary && job.salary == "" ? (
                    <span className=""></span>
                    ) : (
                    <span className=" ">{job.salary}</span>
                    )}
                </span>
                </div>
                <div>
                <span className=" hiring-01 rounded-pill bg-secondary text-white ps-2 pe-2 pb-1 pt-1">{job.openings}</span>
                </div>
            </div>
            </div>
      </div>
            </Link>

      <div className="card-2">
        <Link className="view-job-link" to={"/viewJOb/" + job._id}>
          {" "}
          <div className="viewjob">
            View Job <BsArrowRight />
          </div>
        </Link>
      </div>
      <p
        className="random"
        style={{
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          color: "white",
        }}
      >
        {job.company_name.slice(0, 2).toUpperCase()}
      </p>
    </div>
  );

  // Render job listings based on conditions
  const renderJobListings = () => {
    if (on) {
      return (
        <div className="jobs-container-main container">
          <div className="jobs-container-inner">
            <div className="jobs-container">
              {getSearchJob && getSearchJob.map(renderJobCard)}
            </div>
          </div>
        </div>
      );
    } else if (open) {
      return (
        <div className="jobs-container-main container">
          <div className="jobs-container-inner">
            <div className="jobs-container">
              {filtJobs && filtJobs.map(renderJobCard)}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="jobs-container-main container">
          <div className="jobs-container-inner">
            <div className="jobs-container">
              {jobData && jobData.map(renderJobCard)}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="home-container">
      <Header />
      <div className="filter container" onClick={filter}>
        <div className="filter-select ">
          <div>Sort by :</div>
          <div>
            <select
              onChange={handleRoleChange}
            >
              <option value={"All"}>All</option>
              {roles.rolesArr &&
                roles.rolesArr.map((e) => {
                  return <option value={e}>{e}</option>;
                })}
            </select>
          </div>
        </div>
      </div>
      {renderJobListings()}
      <Footer />
      <NavigationPanel />
    </div>
  );
};

export default Home;