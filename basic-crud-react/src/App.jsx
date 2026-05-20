import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const API = "http://localhost:3000/users";

  // Users State
  const [users, setUsers] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Edit State
  const [editId, setEditId] = useState(null);

  // ================= READ =================
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= CREATE + UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // UPDATE
      if (editId !== null) {
        await axios.put(`${API}/${editId}`, formData);

        setEditId(null);
      }

      // CREATE
      else {
        await axios.post(API, formData);
      }

      // Clear Form
      setFormData({
        name: "",
        email: "",
        phone: "",
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= EDIT =================
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
      <h1>CRUD Operations with API</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <br />

        <button type="submit">{editId !== null ? "Update" : "Add"}</button>
      </form>

      <hr />

      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>

          <button onClick={() => handleEdit(user)}>Edit</button>

          <button onClick={() => handleDelete(user.id)}>Delete</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
