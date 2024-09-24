import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useMatches, useNavigate, Link } from "react-router-dom";
import {
  delUserSavedJob,
  getJob,
  saveJob,
  savedJobColorfunc,
} from "../redux/slices/dataSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import Header from "./header";

import { verifyToken } from "../utils/utlis";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  InstapaperShareButton,
  InstapaperIcon,
} from "react-share";

import "../styles/viewJob.scss";
import "../styles/header.scss";
import Footer from "./footer";
import Navigationpanel from "./navigationpanel";

function ViewJob() {
  const [copied, setCopied] = useState(false);
  
  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  const handleCopy = () => {
    const textToCopy = "https://localhost:3000/home";
    copyText(textToCopy);
  };
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const toggle = () => {
    setModal(!modal);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const companyData = useSelector((state) => state.User.value.companyData);

  const getJobDetails = useSelector((state) => state.User.value.getJobDetails);
  const [savedJob, setSavedJob] = useState(false)
  const params = useMatches();

  const handleSaveJob = () => {
   
     dispatch(saveJob({ jobId: params[0].params.jobId }));
     setSavedJob(!savedJob)
  };
  const handleDeleteSaveJob = () => {
   
  dispatch(delUserSavedJob({jobId: params[0].params.jobId}));
  setSavedJob(!savedJob)
  }
  useEffect(() => {
    dispatch(getJob({ jobId: params[0].params.jobId }));
   
  }, [savedJob]);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  useEffect(() => {
    if (!verifyToken(email, userId, token)) {
      navigate("/login");
      window.location.reload();
    }
  }, [token]);
  return (
    <div
      className="job-container w-100% bg-white"
      style={{ backgroundColor: "rgb(243,243,243)" }}
    >
      <Header />
      <div className="viewhome container ">
        <div>
         <span onClick={() => navigate("/home")} style={{cursor: "pointer",fontWeight: "400"}}> Home</span> / JobId : {getJobDetails._id && getJobDetails._id.slice(0, 3)}
        </div>
        <div style={{ cursor: "pointer" }}>
          {getJobDetails.savedJobColor ?
        <FaBookmark
        style={{ color: "orange" }}
      />
        :
        <FaRegBookmark />
        }
          <span  className="text-decoration-solid">
          {getJobDetails.savedJobColor? <span onClick={handleDeleteSaveJob}>{"Unsave Job"}</span>: <span onClick={handleSaveJob}>{ "Save Job"}</span>}
          </span>
        </div>
      </div>
      <div className="h2 container ">{getJobDetails.title}</div>
      <div className="">
        <div className="hiring-div container">
          <div className=" hirings">HIRING</div>
          <div className="openings">{getJobDetails.openings}</div>

          <div
            style={{ cursor: "pointer" }}
            className=" container sharejob"
            onClick={handleClick}
            toggle={toggle}
            shareUrl="http://localhost:3000/home"
          >
            {" "}
            Share Job
          </div>

          <div style={{ width: "100%" }}>
            <Modal isOpen={open} toggle={() => setOpen(false)}>
              <ModalHeader>Share Link</ModalHeader>
              <ModalBody>
                <div className="d-flex justify-content-evenly">
                  <div className="Demo__some-network">
                    <EmailShareButton
                      url="shareUrl"
                      separator=":: "
                      className="Demo_some-network_share-button"
                    >
                      <EmailIcon size={40} round />
                    </EmailShareButton>
                  </div>

                  <div className="Demo__some-network">
                    <WhatsappShareButton
                      url="shareUrl"
                      separator=":: "
                      className="Demo_some-network_share-button"
                    >
                      <WhatsappIcon size={40} round />
                    </WhatsappShareButton>
                  </div>

                  <div className="Demo__some-network">
                    <TwitterShareButton
                      url="shareUrl"
                      separator=":: "
                      className="Demo_some-network_share-button"
                    >
                      <TwitterIcon size={40} round />
                    </TwitterShareButton>
                  </div>

                  <div className="Demo__some-network">
                    <TelegramShareButton
                      url="shareUrl"
                      separator=":: "
                      className="Demo_some-network_share-button"
                    >
                      <TelegramIcon size={40} round />
                    </TelegramShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <LinkedinShareButton
                      url="shareUrl"
                      separator=":: "
                      className="Demo_some-network_share-button"
                    >
                      <LinkedinIcon size={40} round />
                    </LinkedinShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <FacebookShareButton
                      url="shareUrl"
                      separator=":: "
                      className="Demo_some-network_share-button"
                    >
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>
                  </div>

                  <div className="Demo__some-network">
                    <InstapaperShareButton
                      url="shareUrl"
                      separator=":: "
                      className="Demo_some-network_share-button"
                    >
                      <InstapaperIcon size={40} round />
                    </InstapaperShareButton>
                  </div>
                </div>
                <hr />
                <div className="url">
                  <label style={{ color: "gray",fontFamily:'bold' }}>Copy Url :</label>

                  <span style={{ color: "skyblue" }}>
                    https://localhost:3000/home
                  </span>

                  <div className="copy"
                    onClick={handleCopy}
                    style={{float:'right', cursor:'pointer', paddingTop: "-1em",color:'gray'}}
                  >
                    <MdContentCopy  >
                      {/* {copied ? 'Copied!' : 'Copy to Clipboard'} */}
                    </MdContentCopy>
                  </div>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>

      <hr className="container" />
      <div className="data">
        {/* diplay job details */}
        <div className=" viewjobsDetails-main  shadow border rounded container w-90% ">
          <div className=" viewjobsDetails container">
            <div className="viewjobsDetails-1">
              <div className="firstfour">
                <div>
                  <label>
                    <b>ROLE</b>
                  </label>
                  <p>{getJobDetails && getJobDetails.role}</p>
                </div>
                <div>
                  <div>
                    <label>
                      <b>SKILLS</b>
                    </label>
                    <div className="skil">
                      {getJobDetails.skills &&
                        getJobDetails.skills.split(",").map((i) => {
                          return (
                            <div>
                              <Link
                                to={"/searchSkill/" + i}
                                style={{
                                  textDecoration: "solid",
                                  color: "white",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "0.8em",
                                    padding: "0 0.2rem 0 0.2rem",
                                  }}
                                  className="bg-secondary text-white rounded-pill  pb-1 pe-2 ps-2 p-0"
                                >
                                  {i}
                                </span>
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div>
                  <label>
                    <b>FUNCTIONAL AREA</b>
                  </label>
                  <p>{getJobDetails && getJobDetails.functionalarea}</p>
                </div>
                <div>
                  <label>
                    <b>JOB TYPE</b>
                  </label>
                  <p>{getJobDetails && getJobDetails.employmenttype}</p>
                </div>
                <div>
                  <label>
                    <b>STATES/CITIES</b>
                  </label>
                  <p>{getJobDetails && getJobDetails.States}</p>
                </div>
              </div>

              <div className="lastsix">
                <div>
                  <label>
                    <b>CTC</b>
                  </label>
                  <p>{getJobDetails && getJobDetails.salary}</p>
                </div>
                <div>
                  <label>
                    <b>OPENINGS</b>
                  </label>
                  <p>{getJobDetails && getJobDetails.openings}</p>
                </div>
                <div>
                  <label>
                    <b>MINIMUM EXPERIENCE</b>
                  </label>
                  <p>{getJobDetails && getJobDetails.minimumexperience}</p>
                </div>
                <div>
                  <label>
                    <b>PREFERED EXPERIENCE</b>
                  </label>
                  <p>{getJobDetails && getJobDetails.preferedexperience}</p>
                </div>
                <div>
                  <label>
                    <b>MINIMUM EDUCATION</b>
                  </label>
                  <p>{getJobDetails && getJobDetails.minimumeducation}</p>
                </div>
                <div>
                  <label>
                    <b>PREFERED EDUCATION</b>
                  </label>
                  <p>{getJobDetails && getJobDetails.preferededucation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="description">
            <label>
              <b>JOB DESCRIPTION :</b>
            </label>
            <p>{getJobDetails && getJobDetails.description}</p>

            <div className="responsibilities">
              <label>
                <b>Responsibilities :</b>
              </label>
              <p>{getJobDetails && getJobDetails.responsibilities}</p>
            </div>
          </div>

          <div className="loca">
            <label>
              <b>location : </b>
            </label>
            <p>{getJobDetails && getJobDetails.States}</p>
          </div>
        </div>
      </div>

      <div>
       
        <div className="aboutcomp container ">About Company</div>
      </div>
      <div className="container">
        <div className=" card-company shadow border rounded">
          <div className="randoms">
            <p
              style={{
                backgroundColor:
                  "#" + Math.floor(Math.random() * 16777215).toString(16),
                width: "3em",
                height: "3em",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "1em",
                position: "absolute",
                top: "0.8em",
                color: "white",
              }}
            >
              {getJobDetails.company_name &&
                getJobDetails.company_name.slice(0, 2).toUpperCase()}
            </p>
          </div>
          <div className="locationcomp container">
            <div>
              {<div>{getJobDetails && getJobDetails.company_name}</div>}
            </div>
            <div>
              {
                <div style={{ color: "gray" }}>
                  <b>{getJobDetails && getJobDetails.States}</b>
                </div>
              }
            </div>

            <div className=" container">
              {
                <div className="abt">
                  {" "}
                  {getJobDetails && getJobDetails.about}
                </div>
              }
            </div>
          </div>
          <div className="view">
            <span>
              View Company <FaArrowRightLong />
            </span>
          </div>
        </div>
      </div>

      <div className="container verify ">
        <button
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          className="btn-verify"
        >
          Verify Account to Apply
        </button>
      </div>

      {/* ///footer// */}

      <Footer />
      <Navigationpanel />
    </div>
  );
}

export default ViewJob;