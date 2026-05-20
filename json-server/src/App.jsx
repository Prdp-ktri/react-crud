import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3000/users";

  // READ
  const fetchUsers = async () => {
    const response = await axios.get(API);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CREATE + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    // UPDATE
    if (editId !== null) {
      await axios.put(`${API}/${editId}`, formData);
      setEditId(null);
    }

    // CREATE
    else {
      await axios.post(API, formData);
    }

    // CLEAR FORM
    setFormData({
      name: "",
      email: "",
      phone: "",
    });
    fetchUsers();
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  // EDIT
  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setEditId(user.id);
  };

  return (
    <div>
      <h1>CRUD with JSON Server</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <br />
        <button type="submit">{editId !== null ? "Update" : "Add"}</button>{" "}
        <hr />
        {users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        ))}
      </form>
    </div>
  );
}

export default App;
