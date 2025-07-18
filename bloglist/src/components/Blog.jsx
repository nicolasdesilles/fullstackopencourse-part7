import { addLikeTo, deleteBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationsReducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return null;
  }

  const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser");
  const loggedUser = loggedUserJSON ? JSON.parse(loggedUserJSON) : null;

  const deleteButtonVisibility = {
    display:
      loggedUser !== null && loggedUser.username === blog.user.username
        ? ""
        : "none",
  };

  const like = async () => {
    console.log("like", blog.id);
    dispatch(addLikeTo(blog.id));
    dispatch(setNotification("success", `you liked '${blog.title}'`, 4));
  };

  const remove = async () => {
    console.log("delete", blog.id);
    dispatch(deleteBlog(blog));
    dispatch(setNotification("success", `you deleted '${blog.title}'`, 4));
  };

  const blogStyle = {
    border: "2px outset #000000",
    padding: "5px",
    margin: "2px",
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

  return (
    <div style={blogStyle}>
      <span style={titleStyle}>{blog.title}</span> by{" "}
      <span style={authorStyle}>{blog.author}</span>
      <div>
        <span style={fieldNameStyle}>url:</span> <span>{blog.url}</span>
      </div>
      <div>
        <span style={fieldNameStyle}>likes: {blog.likes}</span>{" "}
        <span>
          <button onClick={like}>like</button>
        </span>
      </div>
      <div>
        <span style={fieldNameStyle}>added by:</span>{" "}
        <span>{blog.user.name}</span>
      </div>
      <div>
        <span style={deleteButtonVisibility}>
          <button onClick={remove}>remove</button>
        </span>
      </div>
    </div>
  );
};

export default Blog;
