import React, { useEffect } from "react";
import Header from "./header";
import "../styles/savedJobs.scss";
import "../styles/home.scss"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserSaveJobs } from "../redux/slices/dataSlice";
import { BsArrowRight } from "react-icons/bs"
import { verifyToken } from "../utils/utlis";
import Navigationpanel from "./navigationpanel";
function SavedJobs() {
  const params = useParams();
  console.log(params);
  const getSavedjob = useSelector((state) => state.User.value.getSavedJob);
  console.log(getSavedjob);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSaveJobs(params));
  }, []);
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  useEffect(() => {
    if (!verifyToken(email, userId, token)) {
      navigate("/login");
      window.location.reload();
    }
  }, [token]);
  return (
    <div className="homePage-container">
      <Header />

      <div className="container">
        <div  ><h3 className="container  save  " >Saved Jobs</h3></div>
        <div className="card-container  container">
          {getSavedjob &&
            getSavedjob?.map((e) => {
              console.log(e?.value);
              return (
                <Link
                  className="view-job-link"
                  to={"/viewJOb/" + e?.value?._id} style={{ color: 'black' }}
                >
                  {" "}
                  <div className="cards  shadow rounded container  ">
                    <div>
                      <div className="card-1">
                        <div>
                          <h5 className="title" >{e?.value?.title}</h5>
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
                                    <Link to={"/searchSkill/" + i} style={{ textDecoration: 'solid', color: 'white' }}>
                                      <span style={{
                                        fontSize: "0.8em",
                                        padding: "0 0.2rem 0 0.2rem",
                                      }}
                                        className="bg-secondary text-white rounded-pill pb-1 pe-2 ps-2 ">
                                        {i}
                                      </span>
                                    </Link>
                                  </div>
                                );
                              })}
                          </div>
                        </div>

                        {/* <label className="h6">Hirings :</label> */}
                        <div className="d-flex gap-1 ">
                          <div>
                            <span className="bg-secondary text-white rounded-pill ps-2 pe-2 ">Hirings</span>
                          </div>
                          <div>
                            <span
                              style={{
                                fontSize: "0.7rem",
                                padding: "0 0.2rem 0 0.2rem",
                              }}
                              className="bg-secondary text-white rounded-pill ps-2 pb-1 pe-2 pt-1"
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
                                <span className="bg-secondary text-white rounded-pill ps-2 pb-1 pe-2 pt-1">
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
                              className="bg-secondary text-white rounded-pill ps-2 pb-1 pe-2 pt-1"
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
      <Navigationpanel />
    </div>
  );
}

export default SavedJobs;