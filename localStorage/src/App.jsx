import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          email: "",
          phone: "",
          age: "",
          address: "",
          username: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
          }}
        />
        <br />
        <label htmlFor="age">Age:</label>
        <select
          id="age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <br />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
