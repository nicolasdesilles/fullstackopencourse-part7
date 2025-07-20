import { addLikeTo, deleteBlog, addCommentTo } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationsReducer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Blog = () => {
  const [currentComment, setCurrentComment] = useState("");
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
    //console.log("like", blog.id);
    dispatch(addLikeTo(blog.id));
    dispatch(setNotification("success", `you liked '${blog.title}'`, 4));
  };

  const remove = async () => {
    //console.log("delete", blog.id);
    dispatch(deleteBlog(blog));
    dispatch(setNotification("success", `you deleted '${blog.title}'`, 4));
  };

  const comment = async (event) => {
    event.preventDefault();
    //console.log("like", blog.id);
    dispatch(addCommentTo(id, currentComment));
    dispatch(
      setNotification("success", `you commented '${currentComment}'`, 4)
    );
    setCurrentComment("");
  };

  return (
    <div className="prose m-8 flex gap-6 justify-start ">
      <div className="bg-base-300 p-8 rounded-box">
        <h2>{blog.title}</h2>{" "}
        <div className="flex gap-3">
          <em>by:</em>
          <div>
            <b>{blog.author}</b>
          </div>
        </div>
        <div className="flex gap-3">
          <em>URL:</em>{" "}
          <div>
            <b>{blog.url}</b>
          </div>
        </div>
        <div className="flex gap-3 align-center">
          <div>
            <em>Likes:</em>
          </div>{" "}
          <div>
            <b>{blog.likes}</b>
          </div>
          <button className="btn btn-info btn-xs" onClick={like}>
            like
          </button>
        </div>
        <div className="flex gap-3">
          <em>added by:</em>{" "}
          <div>
            <b>{blog.user.name}</b>
          </div>
        </div>
        <div>
          <span style={deleteButtonVisibility}>
            <button className="btn btn-soft bent-neutral" onClick={remove}>
              remove
            </button>
          </span>
        </div>
      </div>

      <div className="bg-base-300 p-8 rounded-box">
        <h3>Comments</h3>
        <div>
          <form onSubmit={comment}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Add a comment</legend>

              <label className="label">Your comment</label>
              <input
                type="text"
                value={currentComment}
                name="Comment"
                className="input"
                placeholder="Type your comment"
                onChange={({ target }) => setCurrentComment(target.value)}
              />
              <button type="submit" className="btn btn-neutral mt-4">
                Add
              </button>
            </fieldset>
          </form>
        </div>
        <ul>
          {blog.comments.map((comment) => (
            <li key={blog.comments.indexOf(comment)}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
