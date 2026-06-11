import React from 'react';

interface UserAvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'none';
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  src,
  size = 'md',
  status = 'none',
}) => {
  const getInitials = (n: string) => {
    const parts = n.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return n.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-medium',
    lg: 'w-14 h-14 text-lg font-semibold',
  };

  const statusClasses = {
    online: 'bg-success',
    offline: 'bg-slate-400 dark:bg-slate-600',
    none: '',
  };

  return (
    <div className="relative inline-block flex-shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white ring-2 ring-slate-100 dark:ring-slate-800`}
        >
          {getInitials(name)}
        </div>
      )}
      {status !== 'none' && (
        <span
          className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-darkBg ${
            statusClasses[status]
          }`}
        />
      )}
    </div>
  );
};
