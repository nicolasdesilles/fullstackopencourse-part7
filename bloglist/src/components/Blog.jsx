import { useState } from "react";

const Blog = ({ blog, onLikeClicked, onDeleteClicked }) => {
  const [visible, setVisible] = useState(false);

  const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser");
  const loggedUser = loggedUserJSON ? JSON.parse(loggedUserJSON) : null;

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const deleteButtonVisibility = {
    display:
      loggedUser !== null && loggedUser.username === blog.user.username
        ? ""
        : "none",
  };

  const blogStyle = {
    border: "2px outset #000000",
    padding: "5px",
    margin: "2px",
  };
  const detailsStyle = {
    margin: "5px",
  };
  const titleStyle = {
    fontWeight: "bold",
  };
  const authorStyle = {
    fontStyle: "italic",
  };
  const fieldNameStyle = {
    textDecoration: "underline solid #000000",
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <span style={titleStyle}>{blog.title}</span> by{" "}
      <span style={authorStyle}>{blog.author}</span>
      <div style={hideWhenVisible}>
        <div>
          <span>
            {" "}
            <button onClick={toggleVisibility}>view</button>{" "}
          </span>
        </div>
      </div>
      <div style={showWhenVisible}>
        <span>
          {" "}
          <button onClick={toggleVisibility}>hide</button>{" "}
        </span>
        <div style={detailsStyle}>
          <div>
            <span style={fieldNameStyle}>url:</span> <span>{blog.url}</span>
          </div>
          <div>
            <span style={fieldNameStyle}>likes: {blog.likes}</span>{" "}
            <span>
              <button onClick={onLikeClicked}>like</button>
            </span>
          </div>
          <div>
            <span style={fieldNameStyle}>added by:</span>{" "}
            <span>{blog.user.name}</span>
          </div>
          <div>
            <span style={deleteButtonVisibility}>
              <button onClick={onDeleteClicked}>remove</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
