import React, { useState } from "react";

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Hillary Clinton",
      email: "hillaryclinton@example.com",
      phone: "098-765-4321",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // UPDATE
    if (editId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === editId ? { ...user, ...formData } : user,
      );

      setUsers(updatedUsers);
      setEditId(null);
    }

    // CREATE
    else {
      const newUser = {
        id: Date.now(),
        ...formData,
      };

      setUsers([...users, newUser]);
    }

    // Clear Form
    setFormData({
      name: "",
      email: "",
      phone: "",
    });
  };

  // DELETE
  const handleDelete = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);

    setUsers(filteredUsers);
  };

  // EDIT
  const handleEdit = (user) => {
    setFormData(user);
    setEditId(user.id);
  };

  return (
    <div>
      <h1>CRUD Operations</h1>
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
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <br />
        <button type="submit">{editId !== null ? "Update" : "Add"}</button>
      </form>
      <hr />
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
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
