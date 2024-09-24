import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followCompany, getCompanyJobs, getOneCompany } from "../redux/slices/dataSlice";
import { Link, useMatches, useNavigate, useParams } from "react-router-dom";
import Header from "./header";
import "../styles/home.scss";
import "../styles/viewCompany.scss"

import { BsBookmark, BsArrowRight } from "react-icons/bs";
import { verifyToken } from "../utils/utlis";
import Footer from "./footer";
import Navigationpanel from "./navigationpanel";
const ViewCompany = () => {
  const company = useSelector((state) => state.User.value.company);
  console.log(company);
  console.log(company.about?.split(",")[0]);
  const companyJobs = useSelector((state) => state.User.value.companyJobs);
  const [aboutCompanyArr, setAboutCompanyArr] = useState([])
  const dispatch = useDispatch();
  const params = useMatches();
  const [open123, setOpen123] = useState({ open1: true, open2: false, open3: false })
  const params1 = useParams();

  const handleFollow = () => {
    dispatch(followCompany(params1))
  }
  const handleClick2 = () => {
    setOpen123({ ...open123, open2: true, open1: false, open3: false })
  }
  const handleClick3 = () => {
    dispatch(getCompanyJobs({ cid: params[0].params.cid }))
    const { about } = company;
    // console.log(about);
    // const temp = about?.split(" ").filter((e)=> e!== '');
    // console.log(temp);
    setAboutCompanyArr(about);
    console.log(aboutCompanyArr);
    setOpen123({ ...open123, open1: true, open2: false, open3: false })

    console.log(aboutCompanyArr);
    setOpen123({ ...open123, open2: false, open1: false, open3: true })
  }
  const handleClick4 = () => {
    setOpen123({ ...open123, open2: false, open1: true, open3: false })
  }
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  useEffect(() => {

    if (!verifyToken(email, userId, token)) {
      navigate("/login");
      window.location.reload();
    }
  }, [token]);

  useEffect(() => {
    dispatch(getOneCompany(params1));



  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="d-flex justify-content-between pt-3">
          <div className="follow-i">i-Follow / {company._id && company.company_name}</div>
          <div style={{ cursor: "pointer" }}>
            <BsBookmark />{" "}
            <span onClick={handleFollow} className="text-decoration-solid">Follow</span></div>
        </div>
        <div className="h2">{company && company.company_name} , {company && company.location}</div>

        {/* <hr  className="container"  /> */}

        <div className=" profiles  container border shadow ">
          <div>
            <p className="random-Profile"
              style={{
                backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16), width: "3em", height: "3em", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "1em", color: 'white'
              }}
            >
              {company.company_name &&
                company.company_name.slice(0, 2).toUpperCase()}
            </p>
          </div>
          <div>
            <div className="compname"><b>{company && company.company_name}</b></div>
            <div className="companyloc">{
              company && company.location
            }
            </div>
          </div>

          {/* <b className="abtcomp">About Company</b> */}
        </div>
        <div
          className="info contanier border shadow"
        >
          <div className="hom"
            onClick={handleClick4}
          >
            <b>Home</b>{" "}
          </div>
          <div className="abt"

            onClick={handleClick3}
          >
            <b>About</b>
          </div>
          <div className="jobss"
            onClick={handleClick2}
          >
            <b>Jobs</b>
          </div>
        </div>
      </div>
      <div className="container" >
        {open123.open1 && <p>No posts published by the company!</p>}
      </div>
      <div className="homePage-container">
        <div className="card-container  container">
          {open123.open2 && companyJobs &&
            companyJobs?.map((e) => {
              console.log(e?.value);
              return (
                <Link to={"/viewJOb/" + e?.value._id}>
                  {" "}


                  <div className="card rounded shadow container ">
                    <div>
                      <div className="card-1">
                        <div>
                          <h5 className="title" >{e?.value.title}</h5>
                          <h5 className=" h5 text-secondary">{e?.value.company_name}</h5>
                          <div>
                            <label className="h6">Role :</label>
                            <span>{e?.value.role}</span>
                          </div>
                          <div>
                            <label className="h6">Functional Area : </label>
                            <span>{e?.value.functionalarea}</span>
                          </div>
                          <div>
                            <label className="h6">States/Cities :</label>
                            <span>{e?.value.States}</span>
                          </div>
                          <div>
                            <label className="h6">Employment Type :</label>
                            <span>{e?.value.employmenttype}</span>
                          </div>
                        </div>

                        <div>
                          <label className="h6">Skills :</label>
                          <div className="skills" style={{ columnGap: "0.1em" }} >
                            {e?.value.skills &&
                              e?.value.skills.split(",").map((i) => {
                                return (
                                  <div>
                                    <Link to={"/searchSkill/" + i} style={{ textDecoration: 'solid' }}>
                                      <span className="skills-text bg-secondary  pb-2 pe-2 ps-2">
                                        {i}
                                      </span>
                                    </Link>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                        <label className="h6">Hirings :</label>
                        <div className="d-flex gap-1 ">
                          <div>
                            <span
                              style={{
                                fontSize: "0.7rem",
                                padding: "0 0.2rem 0 0.2rem",
                              }}
                              className="bg-secondary text-white rounded-pill  pb-2 pe-2 ps-2 pt-2"
                            >
                              {e?.value.experience}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{
                                fontSize: "0.7rem",
                                padding: "0 0.2rem 0 0.2rem",
                              }}
                            >
                              {e?.value.salary && e?.value.salary == "" ? (
                                <span className="bg-white"></span>
                              ) : (
                                <span className="bg-secondary text-white rounded-pill  pb-2 pe-2 ps-2 pt-2">
                                  {" "}
                                  {e?.value.salary}
                                </span>
                              )}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{
                                fontSize: "0.7rem",
                                padding: "0 0.2rem 0 0.2rem",
                              }}
                              className="bg-secondary text-white rounded-pill  pb-2 pe-2 ps-2 pt-2"
                            >
                              {e?.value.openings}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card-2">
                        <p className="random"
                          style={{
                            backgroundColor:
                              "#" +
                              Math.floor(Math.random() * 16777215).toString(16),
                            color: "white",
                          }}
                        >
                          {e?.value.company_name.slice(0, 2).toUpperCase()}
                        </p>

                        <Link to={"/viewJOb/" + e?.value._id}>
                          {" "}
                          <div className="viewjob">
                            View Job <BsArrowRight />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      <div  >
        <div>
          {
            open123.open3 && company.about ?
              <div className="about container " >

                <div className=" container rounded shadow">
                  <div>
                    <p>{aboutCompanyArr}</p>
                  </div>

                </div>
              </div>
              :
              ""
          }
        </div>
      </div>
      <Footer />
      <Navigationpanel />
    </div>

  );
};

export default ViewCompany;