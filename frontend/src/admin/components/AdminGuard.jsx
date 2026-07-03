import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Loader2 } from 'lucide-react';

export default function AdminGuard({ children, minRole = 'Admin' }) {
  const { user, loading } = useAuth();

  const ROLE_HIERARCHY = { 'Super Admin': 3, 'Admin': 2, 'User': 1 };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-matte-black text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#D4AF37]" size={36} />
          <span className="text-xs font-mono text-matte-text uppercase tracking-widest animate-pulse">Verifying credentials...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRoleValue = ROLE_HIERARCHY[user.role] || 0;
  const minRoleValue = ROLE_HIERARCHY[minRole] || 0;

  if (userRoleValue < minRoleValue) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#080808] text-white">
        <div className="text-center max-w-sm px-6 py-10 bg-[#0F0F0F] border border-[#1E1E1E] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <p className="text-5xl mb-4">🚫</p>
          <h2 className="font-display font-bold text-xl text-white mb-2">Access Denied</h2>
          <p className="text-xs font-mono text-[#6B7280] mb-6 leading-relaxed">
            You do not have permission to view this section. Required role: <span className="text-[#D4AF37] font-semibold">{minRole}</span>
          </p>
          <Link to="/" className="inline-block px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c49e28] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:-translate-y-0.5 transition-all cursor-pointer">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
