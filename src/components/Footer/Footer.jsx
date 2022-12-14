import React from "react";
import Prashant from "./../../images/prashant.jpg";
import Facebook from "./../../images/facebook.png";
import Linkedin from "./../../images/linkedin.png";
import Instagram from "./../../images/instagram.png";
import Github from "./../../images/github.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <img src={Prashant} alt="Prashant Rayamajhi" />
      <div className="text">
        <h4>Prashant Rayamajhi</h4>
        <p>
          Hi, I am Prashant Rayamajhi. I build interesting and scalable Web
          Applications.
        </p>
        <div className="social-wrapper">
          <a
            href="https://github.com/prashantrayamajhi"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Github} alt="" />
          </a>
          <a href="/" target="_blank" rel="noreferrer">
            <img src={Facebook} alt="" />
          </a>
          <a
            href="https://www.instagram.com/prashant_rayamajhi/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Instagram} alt="Prashant Rayamajhi Instagram" />
          </a>
          <a
            href="https://www.linkedin.com/in/prashant-rayamajhi-0087311ab/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Linkedin} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
