import { useSelector, useDispatch } from "react-redux";
import { addLikeTo } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationsReducer";

import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const like = async (blog) => {
    console.log("like", blog.id);
    dispatch(addLikeTo(blog.id));
    dispatch(setNotification("success", `you liked '${blog.title}'`, 4));
  };

  /*
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <div>{blog.title}</div>
          <div>by {blog.author}</div>
          <div>by {blog.url}</div>
          <div>
            has {blog.likes} likes
            <button onClick={() => like(blog)}>like</button>
          </div>
        </div>
      ))}
    </div>
  );
  */

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLikeClicked={() => like(blog)}
          onDeleteClicked={() => console.log(`deleting ${blog.id}`)}
        />
      ))}
    </div>
  );
};

export default BlogList;
