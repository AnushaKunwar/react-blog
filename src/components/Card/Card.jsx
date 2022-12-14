import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

const Card = ({ id, title, date, name, description }) => {
  return (
    <>
      <div className="card">
        <Link to={`/blog/${id}`} className="link">
          <h2>{title}</h2>
        </Link>
        <span className="date">{date}</span>
        <p className="tag">{name}</p>
        <p className="description">{description}</p>
      </div>
    </>
  );
};

export default Card;
