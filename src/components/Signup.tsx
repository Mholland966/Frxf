import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      history.push('/dashboard');
    } catch {
      setError('Failed to create an account');
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;