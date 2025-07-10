import { supabase } from '../lib/supabase';

export const realtimeService = {
  // Subscribe to user profile changes
  subscribeToUserProfile(userId, callback) {
    return supabase
      .channel(`user_profile_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles',
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();
  },

  // Subscribe to user tasks
  subscribeToTasks(userId, callback) {
    return supabase
      .channel(`user_tasks_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();
  },

  // Subscribe to user music
  subscribeToMusic(userId, callback) {
    return supabase
      .channel(`user_music_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_music',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();
  },

  // Subscribe to study sessions
  subscribeToSessions(userId, callback) {
    return supabase
      .channel(`user_sessions_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'study_sessions',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();
  },

  // Unsubscribe from all channels
  unsubscribeAll() {
    supabase.removeAllChannels();
  },

  // Subscribe to all user data
  subscribeToAllUserData(userId, callbacks) {
    const subscriptions = [];

    if (callbacks.profile) {
      subscriptions.push(this.subscribeToUserProfile(userId, callbacks.profile));
    }

    if (callbacks.tasks) {
      subscriptions.push(this.subscribeToTasks(userId, callbacks.tasks));
    }

    if (callbacks.music) {
      subscriptions.push(this.subscribeToMusic(userId, callbacks.music));
    }

    if (callbacks.sessions) {
      subscriptions.push(this.subscribeToSessions(userId, callbacks.sessions));
    }

    return subscriptions;
  }
}; 