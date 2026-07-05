import React, { useState, useMemo } from 'react';
import { NotificationItem } from '../components/NotificationItem';
import { Bell, CheckSquare, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../services/notification.service';
import type { Notification } from '../types/api';
import type { NotificationItemType } from '../services/mockData';

// Map backend type to display category
function mapCategory(type: string): NotificationItemType['category'] {
  const map: Record<string, NotificationItemType['category']> = {
    ROADMAP: 'Roadmap Updates',
    MENTOR: 'Mentor Feedback',
    REMINDER: 'Deadlines',
    SYSTEM: 'Skill Recommendations',
  };
  return map[type] ?? 'Roadmap Updates';
}

// Shape notifications to the format the existing NotificationItem component expects
function toDisplayNotif(n: Notification): NotificationItemType {
  return {
    id: n.id,
    title: n.title,
    message: n.message,
    category: mapCategory(n.type),
    read: n.isRead,
    time: new Date(n.createdAt).toLocaleDateString(),
  };
}

export const Notifications: React.FC = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<string>('All');
  const [localDeleted, setLocalDeleted] = useState<Set<string>>(new Set());

  const categories = ['All', 'Roadmap Updates', 'Mentor Feedback', 'Skill Recommendations', 'Deadlines'];

  const { data: notifications = [], isLoading, isError } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationService.list,
    staleTime: 30_000,
  });

  // Mark as read mutation
  const { mutate: markRead } = useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // Local delete (no backend delete endpoint — just hide optimistically)
  const handleDelete = (id: string) => {
    setLocalDeleted((prev) => new Set([...prev, id]));
  };

  const handleMarkAllRead = () => {
    const unread = notifications.filter((n) => !n.isRead && !localDeleted.has(n.id));
    unread.forEach((n) => markRead(n.id));
  };

  const handleDeleteAll = () => {
    const ids = notifications.map((n) => n.id);
    setLocalDeleted(new Set(ids));
  };

  // Filter and exclude locally-deleted
  const visibleNotifications = useMemo(() => {
    return notifications
      .filter((n) => !localDeleted.has(n.id))
      .map(toDisplayNotif)
      .filter((n) => filter === 'All' || n.category === filter);
  }, [notifications, localDeleted, filter]);

  const hasUnread = notifications.some((n) => !n.isRead && !localDeleted.has(n.id));
  const hasAny = notifications.some((n) => !localDeleted.has(n.id));

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header controls */}
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-805 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Notification Center</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage alerts, feedback deadlines, and learning updates.</p>
        </div>

        <div className="flex items-center gap-2">
          {hasUnread && (
            <button
              onClick={handleMarkAllRead}
              className="px-3 py-1.5 border border-slate-205 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-605 dark:text-slate-350 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <CheckSquare className="w-3.5 h-3.5" /> Mark All Read
            </button>
          )}
          {hasAny && (
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

      {/* Loading / Error / Empty / List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : isError ? (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-xs font-medium">Failed to load notifications. Please refresh.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleNotifications.length > 0 ? (
            visibleNotifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                notification={notif}
                onMarkAsRead={(id) => markRead(id)}
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
      )}
    </div>
  );
};
