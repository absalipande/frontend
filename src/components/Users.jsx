import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const response = await axios.get(
      'https://mern-app-backend-x1cm.onrender.com/users'
    );
    setUsers(response.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://mern-app-backend-x1cm.onrender.com/users/${id}`);
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered is-size-6">
      <div className="column is-fullwidth">
        <Link to={'addUser'} className="button is-success mt-5">
          Add New User
        </Link>
        <table className="table is-bordered is-fullwidth mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <div className="buttons is-centered are-normal">
                    <Link to={`edit/${user._id}`} className="button is-info">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="button is-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
