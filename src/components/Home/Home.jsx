import React, { useState, useEffect } from "react";
import Header from "./../Header/Header";
import Card from "./../Card/Card";
import Axios from "./../../api/server";
import Loader from "./../Loader/Home";
import "./Home.scss";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");
  // const [selected, setSelected] = useState([]);

  // const handleSelect = (tag) => {
  //   const arr = [...selected];
  //   if (arr.indexOf(tag) === -1) {
  //     arr.push(tag);
  //     setSelected(arr);
  //   } else {
  //     arr.splice(arr.indexOf(tag), 1);
  //     setSelected(arr);
  //   }
  // };

  const onSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.get("/api/v1/blogs/search/" + term);
      // setSelected("");
      if (res.data.data.length > 0) {
        setBlogs(res.data.data);
      } else {
        setTerm("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     if (selected.length <= 0) {
  //       const res = await Axios.get("/api/v1/blogs");
  //       setBlogs(res.data.data);
  //       setLoading(false);
  //     } else {
  //       const data = { tags: selected };
  //       const res = await Axios.post("/api/v1/blogs/tags", data);
  //       setBlogs(res.data.data);
  //       setLoading(false);
  //     }
  //   };
  //   fetchBlogs();
  // }, [selected]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await Axios.get("/api/v1/blogs");
      setBlogs(res.data.data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const mappedBlogs = blogs.map((blog, index) => {
    return (
      <Card
        id={blog._id}
        key={index}
        title={blog.title}
        date={blog.date}
        // tag={blog.tag.name}
        name={blog.user.name}
        description={blog.description}
      />
    );
  });

  return (
    <>
      <div className="blogs-home">
        <Header
          // handleSelect={handleSelect}
          // selected={selected}
          term={term}
          setTerm={setTerm}
          onSearch={onSearch}
        />
        <div className="blogs-wrapper">
          {loading ? <Loader /> : mappedBlogs}
        </div>
      </div>
    </>
  );
};

export default Home;
