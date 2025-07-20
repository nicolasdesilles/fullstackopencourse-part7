import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { initializeUsers } from "../reducers/usersReducer";

const UsersList = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUsersList = async () => {
      await dispatch(initializeUsers());
      setIsInitialized(true);
    };
    initializeUsersList();
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-8 prose">
      <h2>Users</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>User Name</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-base-300">
                <th>{users.indexOf(user)}</th>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
