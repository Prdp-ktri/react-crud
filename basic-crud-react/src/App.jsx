import { useState } from "react";
import "./App.css";

function App() {
  const [name, seytName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");

  return (
    <>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" />
        <br />
        <label htmlFor="age">Age:</label>
        <option value="age">
          <select id="one">1</select>
          <select id="two">2</select>
          <select id="three">3</select>
          <select id="four">4</select>
          <select id="five">5</select>
          <select id="six">6</select>
          <select id="seven">7</select>
          <select id="eight">8</select>
          <select id="nine">9</select>
          <select id="ten">10</select>
        </option>
        <br />
        <label htmlFor="address">Address:</label>
        <input type="text" />
        <br />
        <label htmlFor="username">Username:</label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
