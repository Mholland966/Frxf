import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.displayName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;