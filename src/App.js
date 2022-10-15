

import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import './App.css';
const URL = "https://rest-api-without-db.herokuapp.com/users";

    const App = () => {
      const [users, setUsers] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);
      const getAllUsers = () => {
         fetch(URL)
          .then((res) => {
             if (!res.ok) {
              throw Error("Could not fetch");
             }
             return res.json();
          })
          .then((data) => {
            console.log(data.users);
            setUsers(data.users)
          })
          .catch((err)=>{
            setError(err.message);
          })
          .finally(() => {
            setIsLoading(false);
          })
      }

       useEffect(() => {

          getAllUsers();
         
           },[]);
//delete user..........
const handleDelete = (id) => {
    fetch(URL + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not delete");
        }
        getAllUsers();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

      const addUser = (user) => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 201) {
          getAllUsers();
        } else {
          throw new Error("could not create new user");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };


  // update
  const [selectedUser, setSelectedUser] = useState({
    username: "",
    email: "",
  });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");


  const handleEdit = (id) => {
    setSelectedUserId(id);
    setUpdateFlag(true);
    const filteredData = users.filter((user) => user.id === id);
    setSelectedUser({
      username: filteredData[0].username,
      email: filteredData[0].email,
    });
  };

  const handleUpdate = (user) => {
    fetch(URL + `/${selectedUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to update");
        }
        getAllUsers();
        setUpdateFlag(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };



     return(
          <div className="App">
           <h1>CRUD APP</h1>
            {isLoading && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
         {updateFlag ? (
        <UserForm
          btnText="Update User"
          selectedUser={selectedUser}
          handleSubmitData={handleUpdate}
        />
      ) : (
        <UserForm btnText="Add User" handleSubmitData={addUser} />
      )}

              <table>
              <tr>
               <td>Name</td>
               <td>Email</td>
               <td>Action</td>
              </tr>
                  {users && users.map((user) => {
                    const {id, username, email} = user;
                    return(
                      <tr className="card" key = {id}>
                     <td>{username}</td>
                     <td>{email}</td>
                     <td>
                      <button className="btn" onClick={() => {handleEdit(id); }} > Edit</button>
                     <button className="btn" onClick={() =>{handleDelete(id)}}>Delete</button>
                     </td>
                   </tr>
                )
               })};
            </table>


          </div>
      
      );
          
    };
    


export default App;
