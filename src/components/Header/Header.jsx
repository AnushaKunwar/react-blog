import { useState, useEffect } from "react";
import Axios from "./../../api/server";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ handleSelect, selected, term, setTerm, onSearch }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const res = await Axios.get("/api/v1/tags");
      setTags(res.data.data);
    };
    fetchTags();
  }, []);

  const mappedTags = tags.map((tag, index) => {
    return (
      <p
        className={`tag ${selected.indexOf(tag._id) !== -1 ? "active" : ""}`}
        key={index}
        onClick={() => {
          handleSelect(tag._id);
        }}
      >
        {tag.name}
      </p>
    );
  });

  return (
    <>
      <div className="header">
        <Link to="/" className="link">
          <h1>
            <span className="small-text">Welcome to</span> <br />
            <span className="main-text">Programming Blogs</span>
          </h1>
        </Link>
        <div className="search-wrapper">
          <form onSubmit={onSearch}>
            <input
              type="text"
              placeholder="Search blogs..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              autoFocus
            />
          </form>
        </div>
        <div className="tags">{mappedTags}</div>
      </div>
    </>
  );
};

export default Header;
