import React from 'react';
import type { NotificationItemType } from '../services/mockData';
import { Bell, Check, Trash2, Calendar, Award, MessageSquare } from 'lucide-react';

interface NotificationItemProps {
  notification: NotificationItemType;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mentor Feedback':
        return <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'Skill Recommendations':
        return <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Deadlines':
        return <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Roadmap Updates':
      default:
        return <Bell className="w-4 h-4 text-primary dark:text-primary-light" />;
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'Mentor Feedback':
        return 'bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/50';
      case 'Skill Recommendations':
        return 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50';
      case 'Deadlines':
        return 'bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/50';
      case 'Roadmap Updates':
      default:
        return 'bg-primary/5 dark:bg-primary/10 border-primary/10 dark:border-primary/20';
    }
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
        notification.read
          ? 'bg-white/40 dark:bg-darkBg-card/40 border-slate-200 dark:border-slate-800'
          : 'bg-white dark:bg-darkBg-card border-slate-200 dark:border-slate-700 shadow-sm'
      }`}
    >
      {/* Category Icon */}
      <div className={`p-2.5 rounded-lg border flex-shrink-0 ${getCategoryBg(notification.category)}`}>
        {getCategoryIcon(notification.category)}
      </div>

      {/* Main Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {notification.category}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">{notification.time}</span>
        </div>
        <h4 className={`text-sm font-semibold truncate ${notification.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
          {notification.title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {notification.message}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 self-center">
        {!notification.read && onMarkAsRead && (
          <button
            onClick={() => onMarkAsRead(notification.id)}
            title="Mark as read"
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <Check className="w-4 h-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(notification.id)}
            title="Delete notification"
            className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
