import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="prose w-full">
      <h2>Blogs List</h2>

      <div>
        <ul className="list bg-accent text-primary-content rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            All blogs added by users
          </li>
          {blogs.map((blog) => (
            <li className="list-row flex justify-between" key={blog.id}>
              <div>
                <div>
                  <Link
                    className="text-l no-prose text-primary-content"
                    to={`/blogs/${blog.id}`}
                  >
                    {blog.title}
                  </Link>
                </div>
                <div className="flex gap-2">
                  <em className="text-xs font-semibold opacity-60">by:</em>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {blog.author}
                  </div>
                </div>
              </div>
              <div>{blog.likes} likes</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogList;
