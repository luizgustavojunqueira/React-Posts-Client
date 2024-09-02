import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookie.get("token")) navigate("/posts", { replace: true });
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      axios
        .post("/api/v1/auth/register", {
          email,
          password,
          confirm_password,
          first_name,
          last_name,
        })
        .then((response) => {
          console.log(response);

          if (response.status == 201) {
            navigate("/posts", { replace: true });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="register_page">
      <header className="register_header">
        <h1>Register</h1>
      </header>
      <main className="register_main">
        <p>
          Fill the form to register. Or login <a href="/">here</a>
        </p>
        <form onSubmit={handleRegister}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="register_button" type="submit">
            Register
          </button>
        </form>
      </main>
    </section>
  );
}

export default Register;
