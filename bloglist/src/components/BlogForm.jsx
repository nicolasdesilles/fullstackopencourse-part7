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
    <div>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
