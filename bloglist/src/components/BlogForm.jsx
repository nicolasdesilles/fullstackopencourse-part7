import { useState } from "react";
import { useDispatch } from "react-redux";

import { createBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationsReducer";

const BlogForm = () => {
  //local state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const addNewBlog = async (event) => {
    event.preventDefault();

    const content = {
      title: title,
      author: author,
      url: url,
    };

    dispatch(createBlog(content));
    dispatch(
      setNotification(
        "success",
        `you added '${content.title}' by '${content.author}'`,
        4
      )
    );

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="prose">
      <form onSubmit={addNewBlog}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Add a new blog</legend>

          <label className="label">Title</label>
          <input
            type="text"
            value={title}
            name="Title"
            className="input"
            placeholder="Blog Title"
            onChange={({ target }) => setTitle(target.value)}
          />

          <label className="label">Author</label>
          <input
            type="text"
            value={author}
            name="Author"
            className="input"
            placeholder="Author Name"
            onChange={({ target }) => setAuthor(target.value)}
          />

          <label className="label">Url</label>
          <input
            type="url"
            value={url}
            name="URL"
            className="input"
            placeholder="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
          <button className="btn btn-neutral mt-4" type="submit">
            Create
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default BlogForm;
