import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nobody } from "../../constants/AppConstants";
import { fetchUsers } from "../../redux/user/actions";

function UserAdministration(props) {
  const listUsers = useSelector((state) => state.listUsers);
  const { users } = listUsers;
  const dispatch = useDispatch();

  const editHandler = (id) => {
    //TODO:
  };

  const deleteHandler = (id) => {
    //TODO:
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <div>
        <h1>{nobody.admin.users}</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>{nobody.user.name}</th>
            <th>{nobody.user.email}</th>
            <th>IS SELLER</th>
            <th>IS ADMIN</th>
            <th>{nobody.action.title}</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>NO</td>
                <td>NO</td>
                <td>
                  <button className="small" onClick={editHandler(user._id)}>
                    {nobody.action.edit}
                  </button>
                  <button className="small" onClick={deleteHandler(user._id)}>
                    {nobody.action.delete}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserAdministration;
