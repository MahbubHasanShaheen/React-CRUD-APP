import React, { useState, useEffect } from "react";

const UserForm = ({ handleSubmitData, selectedUser, btnText }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const { username, email } = user;

  useEffect(() => {
    setUser({
      username: selectedUser.username,
      email: selectedUser.email,
    });
  }, [selectedUser]);

  const handleChange = (e) => {
    const selectedField = e.target.name;
    const selectedValue = e.target.value;
    setUser((prevState) => {
      return { ...prevState, [selectedField]: selectedValue };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitData(user);
    setUser({
      username: "",
      email: "",
    });
  };

  return (
    <div className="form-area">
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="username">User name</label>
        <input className="inputiled"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="field-group">
        <label htmlFor="email">User Email</label>
        <input className="inputiled"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn">
        {btnText}
      </button>
    </form>
    
    </div>

  );
};

UserForm.defaultProps = {
  selectedUser: {
    username: "",
    email: "",
  },
};

export default UserForm;