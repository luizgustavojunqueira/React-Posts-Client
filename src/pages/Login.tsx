import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      axios
        .post("http://localhost:3000/api/v1/auth/login", {
          email,
          password,
        })
        .then((response) => {
          if (response.status == 200) {
            navigate("/posts", { replace: true });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <header>
        <h1>Login</h1>
      </header>

      <main>
        <p>Fill the form to login</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </main>
    </section>
  );
}

export default Login;
