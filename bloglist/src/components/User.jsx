import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector((state) => state.users);

  const id = useParams().id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  return (
    <div className="m-8 prose">
      <h2>
        <em>User:</em> <b>{user.name}</b>
      </h2>

      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
