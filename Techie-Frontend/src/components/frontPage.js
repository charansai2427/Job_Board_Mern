import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightShort, BsInstagram } from "react-icons/bs";
import { PiStudentLight } from "react-icons/pi";
import { MdOutlineApartment } from "react-icons/md";
import { AiFillLinkedin } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import "../styles/frontPage.scss";

const Front = () => {
    const navigate = useNavigate();

    const onHandleClick = (e) => {
        e.preventDefault();
        navigate("/login")
    };

    const onHandleClick1 = (e) => {
        e.preventDefault();
        navigate("/login")
    }

    return (
        <div className="frontpage-container">

            <div className="header">
                <img src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"/>
                <button onClick={onHandleClick}>Login</button>
            </div>

            <div className="titles">
                <h2>Techiepanda.in</h2>
                <p className="job">Coding , Tech & HR Job</p>
                <p className="search">Search</p>
                <button>Find Your Dream Job in 3 Minutes</button>

            </div>
            <button className="view" onClick={onHandleClick1}>View Jobs <BsArrowRightShort /></button>

            <div className="learnimg">
                <img className="img" src="https://img.freepik.com/free-vector/cute-boy-study-with-laptop-cartoon-icon-illustration-education-technology-icon-concept-isolated-flat-cartoon-style_138676-2107.jpg" />
            </div>

            <div className="middle">
                <div className="content">

                    <h1>Our Services</h1>
                    <hr />
                    <div className="card">
                        <PiStudentLight className="student" />
                        <h3 className="seeker">As a Job Seeker</h3>
                        <p className="mat">- Get Best Coding, Tech, Sales & HR Jobs</p>
                        <p className="mat">- Premium Account at no cost</p>
                    </div>

                    <div className="seccard">
                        <MdOutlineApartment className="apart" />
                        <h3 className="recruitor">As a Job Recruiter</h3>
                        <p className="matter">- Post Unlimited Jobs for Free</p>
                        <p className="matter">- Hire Best Coders, IT Sales and HR Professionals</p>
                        <p className="matter">- Evaluate Candidates with Pre-recorded Video Interviews</p>

                    </div>
                </div>
            </div>

            <div className="foer">
                <div className="inside">
                    <img className="photo" src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"/>
                    <p className="privacy">Privacy Policy . Terms & Conditions . Beware of Fraudsters</p>
                    <p className="copy">Copyright © 2023 techiepanda.in | All Rights Reserved</p>
                    <div className="icons">
                        <FaTwitter />
                        <BsInstagram />
                        <AiFillLinkedin />
                        <CiMail />
                    </div>
                </div>
            </div>
            {/* <div className="links">
                <img className="lion" src="" />
                <img className="play" src="" />
            </div> */}
        </div>
    )
}
export default Front