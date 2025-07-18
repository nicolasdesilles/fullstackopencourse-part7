import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector((state) => state.users);

  const id = useParams().id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
