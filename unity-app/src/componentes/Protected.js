import React from 'react';
import { Navigate } from 'react-router-dom';

function Protected({ isAuth, isAdmin, children, adminOnly = false }) {
  if (!isAuth) {
    return <Navigate to="/login-register" />;
  }
  if (adminOnly && !isAdmin) {
    return <Navigate to="/acesso-negado" />;
  }
  return children;
}

export default Protected;
