import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    border: "2px outset #000000",
    padding: "5px",
    margin: "2px",
  };

  return (
    <div>
      <h2>blogs list</h2>
      <div>
        {blogs.map((blog) => (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
