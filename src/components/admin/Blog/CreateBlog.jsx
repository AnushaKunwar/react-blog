import React, { useState, useEffect } from "react";
import Axios from "./../../../api/server";
import { useHistory, useParams } from "react-router-dom";
import config from "./../../../helper/config";
import Navbar from "./../Navbar/Navbar";
import "./CreateBlog.scss";

const CreateBlog = () => {
  // const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [err, setErr] = useState("");
  const { id } = useParams();

  const history = useHistory();

  // states for inputs
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleInputChange = (updateState, value) => {
    updateState(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      title,
      // tag,
      description,
      content,
    };
    try {
      if (isEdit) {
        const res = await Axios.patch("/api/v1/blogs/" + id, data, config);
        if (res.status === 200) {
          history.push("/admin/blogs");
        }
      } else {
        const res = await Axios.post("/api/v1/blogs", data, config);
        if (res.status === 201) {
          history.push("/admin/blogs");
        }
      }
    } catch (err) {
      console.log(err);
      setErr(err.response.data.err);
      setIsLoading(false);
    }
  };

  // const renderTags = tags.map((tag, index) => {
  //   return (
  //     <option key={index} value={tag._id}>
  //       {tag.name}
  //     </option>
  //   );
  // });

  // handle edit
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const res = await Axios.get("/api/v1/blogs/" + id);
        if (res.status === 200) {
          console.log(res.data.data);
          setIsEdit(true);
          setTitle(res.data.data.title);
          // setTag(res.data.data.tag._id);
          setDescription(res.data.data.description);
          setContent(res.data.data.content);
        }
      };
      fetchBlog();
    }
  }, [id]);

  // useEffect(() => {
  //   const fetchTags = async () => {
  //     const res = await Axios.get("/api/v1/tags");
  //     setTags(res.data.data);
  //     setTag(res.data.data[0]._id);
  //   };
  //   fetchTags();
  // }, []);

  const displayBtn = () => {
    if (isLoading) {
      return <div className="loader"></div>;
    } else {
      return (
        <button disabled={isLoading}>{isEdit ? "Update" : "Submit"}</button>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-blog">
        <h2>{isEdit ? "Update the blog" : "Let's write a blog"}</h2>
        {err && (
          <div className="err">
            <p>{err}</p>
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => {
                handleInputChange(setTitle, e.target.value);
              }}
            />
          </div>
          {/* <div className="input-wrapper">
            <select
              id="tags"
              value={tag}
              onChange={(e) => {
                handleInputChange(setTag, e.target.value);
              }}
            >
              {renderTags}
            </select>
          </div> */}

          <div className="input-wrapper">
            <textarea
              placeholder="Description"
              rows={4}
              value={description}
              onChange={(e) => {
                handleInputChange(setDescription, e.target.value);
              }}
            ></textarea>
          </div>

          <div className="input-wrapper">
            <textarea
              placeholder="Write your blog"
              rows={15}
              value={content}
              onChange={(e) => {
                handleInputChange(setContent, e.target.value);
              }}
            ></textarea>
          </div>
          {displayBtn()}
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
