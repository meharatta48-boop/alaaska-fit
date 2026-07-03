import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { Shield, Trash2, Loader2, UserCog } from 'lucide-react';

const ROLES = ['Super Admin', 'Admin', 'User'];
const ROLE_BADGE = {
  'Super Admin': 'bg-gold-400 text-black',
  'Admin': 'bg-blue-500/20 text-blue-400 border border-blue-400/20',
  'User': 'bg-matte-border text-matte-text border border-matte-border',
};

export default function UserManager() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/users');
      setUsers(data);
    } catch {
      setUsers([
        { _id: 'u1', name: 'Super Admin', email: 'admin@alaaskafit.com', role: 'Super Admin', permissions: ['all'], createdAt: new Date().toISOString() },
        { _id: 'u2', name: 'Admin User', email: 'editor@alaaskafit.com', role: 'Admin', permissions: ['products:edit', 'blogs:edit'], createdAt: new Date().toISOString() },
      ]);
    } finally { setLoading(false); }
  };

  const updateRole = async (id, role) => {
    setUpdating(id);
    try {
      await apiFetch(`/users/${id}/role`, { method: 'PUT', body: JSON.stringify({ role }) });
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
    } catch (e) { alert(e.message); }
    finally { setUpdating(null); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Remove this user from the system?')) return;
    setDeleting(id);
    try {
      await apiFetch(`/users/${id}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (e) { alert(e.message); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-xl text-white">Users & Roles</h2>
        <p className="text-xs text-matte-text font-light mt-0.5">Manage dashboard user accounts and RBAC role assignments</p>
      </div>

      {/* Role Legend */}
      <div className="flex flex-wrap gap-3 p-4 bg-matte-gray border border-matte-border rounded-xl">
        <p className="text-[10px] font-mono text-matte-text uppercase tracking-wider w-full mb-1">Role Hierarchy (highest → lowest)</p>
        {ROLES.map(r => (
          <span key={r} className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${ROLE_BADGE[r]}`}>{r}</span>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-matte-gray border border-matte-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-matte-border">
                <th className="text-left px-5 py-4 text-matte-text uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider hidden lg:table-cell">Joined</th>
                <th className="text-right px-5 py-4 text-matte-text uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-matte-border/30">
                    <td className="px-5 py-4"><div className="h-4 bg-white/10 rounded animate-pulse w-1/2" /></td>
                    <td className="px-4 py-4 hidden md:table-cell"><div className="h-4 bg-white/10 rounded animate-pulse w-2/3" /></td>
                    <td className="px-4 py-4"><div className="h-4 bg-white/10 rounded animate-pulse w-20" /></td>
                    <td className="px-4 py-4 hidden lg:table-cell"><div className="h-4 bg-white/10 rounded animate-pulse w-24" /></td>
                    <td />
                  </tr>
                ))
              ) : users.map(u => (
                <tr key={u._id} className="border-b border-matte-border/30 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/30 flex items-center justify-center text-gold-400 font-bold text-xs shrink-0">
                        {u.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{u.name}</p>
                        {u._id === currentUser?._id && <p className="text-[9px] text-gold-400 font-mono">YOU</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-matte-text hidden md:table-cell">{u.email}</td>
                  <td className="px-4 py-4">
                    {u._id === currentUser?._id || u.role === 'Super Admin' ? (
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${ROLE_BADGE[u.role]}`}>{u.role}</span>
                    ) : (
                      <select
                        value={u.role}
                        onChange={e => updateRole(u._id, e.target.value)}
                        disabled={updating === u._id}
                        className="bg-matte-black border border-matte-border text-white text-[10px] font-mono rounded-lg px-2 py-1.5 outline-none focus:border-gold-400 cursor-pointer transition-colors"
                      >
                        {ROLES.filter(r => r !== 'Super Admin').map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    )}
                  </td>
                  <td className="px-4 py-4 text-matte-text hidden lg:table-cell">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {updating === u._id && <Loader2 size={13} className="animate-spin text-gold-400" />}
                      {u._id !== currentUser?._id && u.role !== 'Super Admin' && (
                        <button
                          onClick={() => deleteUser(u._id)}
                          disabled={deleting === u._id}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-matte-text hover:text-red-400 transition-colors cursor-pointer"
                        >
                          {deleting === u._id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { role: 'Super Admin', icon: '⚡', perms: ['All system access', 'Delete other users', 'Manage configs & settings', 'Role & permissions editing'] },
          { role: 'Admin', icon: '🛡️', perms: ['Product management', 'Quote & lead management', 'Blog & CMS management', 'Media uploads & dashboard'] },
          { role: 'User', icon: '👤', perms: ['Browse public pages', 'View products & blogs', 'Submit quotes & contact inquiries', 'No admin panel access'] },
        ].map(({ role, icon, perms }) => (
          <div key={role} className="bg-matte-gray border border-matte-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{icon}</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${ROLE_BADGE[role]}`}>{role}</span>
            </div>
            <ul className="space-y-1.5">
              {perms.map(p => (
                <li key={p} className="text-[10px] text-matte-text flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-gold-400/50 rounded-full shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
