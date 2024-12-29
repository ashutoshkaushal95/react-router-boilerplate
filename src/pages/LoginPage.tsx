import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const LoginPage: React.FC = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, isAdmin ? "admin" : "user");
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login Page</h1>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Login as Admin:
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
