import React, { useState, useEffect } from "react";
import Axios from "./../../../api/server";
import Delete from "./../../../images/trash.png";
import Edit from "./../../../images/edit.png";
import config from "./../../../helper/config";
import Navbar from "./../Navbar/Navbar";
import "./Tags.scss";

const Tags = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState();
  const [tags, setTags] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setName(name.trim());
    const data = {
      name,
    };
    if (!isEdit) {
      await Axios.post("/api/v1/tags", data, config);
    } else {
      await Axios.patch("/api/v1/tags/" + id, data, config);
    }
    window.location.reload();
  };

  const fetchTags = async () => {
    const res = await Axios.get("/api/v1/tags");
    setTags(res.data.data);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDelete = async (id) => {
    await Axios.delete("/api/v1/tags/" + id, config);
    window.location.reload();
  };

  const handleEdit = async (name, id) => {
    setName(name);
    setId(id);
    setIsEdit(true);
  };

  let sn = 0;
  const mappedTags = tags.map((tag, index) => {
    sn++;
    return (
      <tr key={index}>
        <td>{sn}</td>
        <td>{tag.name}</td>
        <td>
          <img
            src={Edit}
            alt="Edit Icon"
            onClick={() => {
              handleEdit(tag.name, tag._id);
            }}
          />
          <img
            src={Delete}
            alt="Edit Icon"
            onClick={() => {
              handleDelete(tag._id);
            }}
          />
        </td>
      </tr>
    );
  });

  const displayBtn = () => {
    if (isLoading) {
      return <div className="loader"></div>;
    } else {
      return <button disabled={isLoading}>Add</button>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="tags-wrapper">
        <div className="add-tag">
          <form onSubmit={onFormSubmit}>
            <h3>Add A Tag</h3>
            <input
              type="text"
              placeholder="Enter the tag"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {displayBtn()}
          </form>
        </div>
        <div className="tags">
          <table border="1">
            <thead>
              <tr>
                <th>SN</th>
                <th>Tag</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{mappedTags}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tags;
