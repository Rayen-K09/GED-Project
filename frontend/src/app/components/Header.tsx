import React from 'react';
import { Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'Admin':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'Manager':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Finançier':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1">
        {/* Search removed as per request */}
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-700">{user ? `${user.nom} ${user.prenom}` : 'Admin User'}</p>
            <div className="flex items-center justify-end gap-2 mt-0.5">
              
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${getRoleBadgeColor(user?.role || 'Admin')}`}>
                {user?.role || 'Admin'}
              </span>
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium shadow-md cursor-pointer"
          >
            {user?.nom?.charAt(0) || 'A'}
          </motion.div>
        </div>
      </div>
    </header>
  );
}