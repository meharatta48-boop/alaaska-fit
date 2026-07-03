import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Loader2 } from 'lucide-react';

export default function AdminGuard({ children, minRole = 'content-manager' }) {
  const { user, loading } = useAuth();

  const ROLE_HIERARCHY = { 'super-admin': 4, 'admin': 3, 'editor': 2, 'content-manager': 1 };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-matte-black text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-gold-400" size={36} />
          <span className="text-xs font-mono text-matte-text uppercase tracking-widest">Verifying credentials...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (ROLE_HIERARCHY[user.role] < ROLE_HIERARCHY[minRole]) {
    return (
      <div className="flex items-center justify-center h-screen bg-matte-black text-white">
        <div className="text-center">
          <p className="text-6xl mb-4">🚫</p>
          <h2 className="font-display font-bold text-2xl text-white mb-2">Access Denied</h2>
          <p className="text-xs font-mono text-matte-text">Insufficient role. Required: <span className="text-gold-400">{minRole}</span></p>
        </div>
      </div>
    );
  }

  return children;
}
