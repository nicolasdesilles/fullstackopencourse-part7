import { useSelector, useDispatch } from "react-redux";
import { addLikeTo, deleteBlog } from "../reducers/blogsReducer";
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

  const remove = async (blog) => {
    console.log("delete", blog.id);
    dispatch(deleteBlog(blog));
    dispatch(setNotification("success", `you deleted '${blog.title}'`, 4));
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLikeClicked={() => like(blog)}
          onDeleteClicked={() => remove(blog)}
        />
      ))}
    </div>
  );
};

export default BlogList;
