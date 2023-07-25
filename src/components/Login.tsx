import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push('/dashboard');
    } catch {
      setError('Failed to log in');
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;