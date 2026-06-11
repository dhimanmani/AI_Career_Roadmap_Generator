import React, { useState, useMemo } from 'react';
import { notificationsList } from '../services/mockData';
import type { NotificationItemType } from '../services/mockData';
import { NotificationItem } from '../components/NotificationItem';
import { Bell, CheckSquare, Trash2 } from 'lucide-react';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItemType[]>(notificationsList);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Roadmap Updates', 'Mentor Feedback', 'Skill Recommendations', 'Deadlines'];

  const filteredNotifs = useMemo(() => {
    if (filter === 'All') return notifications;
    return notifications.filter(n => n.category === filter);
  }, [notifications, filter]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) return { ...n, read: true };
      return n;
    }));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header controls */}
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-805 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Notification Center</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage alerts, feedback deadlines, and learning updates.</p>
        </div>

        <div className="flex items-center gap-2">
          {notifications.some(n => !n.read) && (
            <button
              onClick={handleMarkAllRead}
              className="px-3 py-1.5 border border-slate-205 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-605 dark:text-slate-350 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <CheckSquare className="w-3.5 h-3.5" /> Mark All Read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="p-1.5 border border-rose-100 dark:border-rose-950/20 hover:bg-rose-50 dark:hover:bg-rose-955/20 text-rose-505 dark:text-rose-400 rounded-lg text-xs font-semibold"
              title="Delete all notifications"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-colors ${
              filter === cat
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-550 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="glass-panel py-16 px-6 text-center rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-805 text-slate-400 rounded-full">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Clear Inbox</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">No notifications match your current filter parameters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
