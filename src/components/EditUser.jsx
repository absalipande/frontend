import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userGender, setUserGender] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const getUserById = async () => {
    const response = await axios.get(`https://mern-app-backend-x1cm.onrender.com/users/${id}`);
    setUserName(response.data.name);
    setUserAge(response.data.age);
    setUserEmail(response.data.email);
    setUserGender(response.data.gender);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (event) => {
    event.preventDefault();

    const editData = JSON.parse(
      JSON.stringify({
        name: userName,
        age: userAge,
        email: userEmail,
        gender: userGender,
      })
    );
    try {
      await axios.patch(`https://mern-app-backend-x1cm.onrender.com/users/${id}`, editData);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Age</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Age"
                value={userAge}
                onChange={(event) => setUserAge(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={userGender}
                  onChange={(event) => setUserGender(event.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Intersex">Intersex</option>
                  <option value="I prefer not to say">
                    I prefer not to say
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-success" type="submit">
                Update Information
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
