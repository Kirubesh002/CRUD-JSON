import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [updated, setUpdated] = useState({ id: "", name: "" });

  useEffect(() => {
    loadData();
  }, []);

  //get user from API
  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/users");

    setUsers(res.data);
  };

  // add user
  const addUser = () => {
    if (id && name) {
      axios
        .post("http://localhost:5000/users", {
          id,
          name,
        })
        .then(() => {
          setName("");
          setId("");
        })
        .catch((err) => {
          console.error(err);
        });
      setTimeout(() => {
        loadData();
      }, 100);
      console.log(id, name);
    } else {
      console.log("*INVALID INPUT");
    }
  };

  //delete User

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`);
    console.log(id);
    setTimeout(() => {
      loadData();
    }, 100);
  };

  //update User

  const updateUser = async () => {
    console.log(updated);
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${updated.id}`,
        {
          id: updated.id,
          name: updated.name,
        }
      );
      console.log(response.data);
      await loadData(); // Ensure the UI updates after the API call
    } catch (err) {
      console.error("Update failed: ", err);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={id}
        placeholder="enter your ID "
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        value={name}
        placeholder="enter your Name "
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addUser}>ADD</button>
      <div className="update"></div>
      {users.map((e) => (
        <>
          <div key={e.id}>
            {e.id} {e.name}{" "}
            <button
              onClick={() => {
                deleteUser(e.id);
              }}
            >
              Disable
            </button>
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="update user ID"
              onChange={(e) => setUpdated({ ...updated, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="update user Name"
              onChange={(e) => setUpdated({ ...updated, name: e.target.value })}
            />
            <button onClick={updateUser}>Update</button>
          </div>
        </>
      ))}
    </div>
  );
}

export default App;
