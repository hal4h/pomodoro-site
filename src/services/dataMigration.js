import { supabase } from '../lib/supabase';
import { userService, taskService, musicService } from './supabaseService';

export const dataMigrationService = {
  // Migrate user profile data
  async migrateUserProfile(userId) {
    try {
      const localStorageData = localStorage.getItem('pomodoro-app');
      if (!localStorageData) return { success: true, message: 'No local data to migrate' };

      const data = JSON.parse(localStorageData);
      
      // Update user profile with localStorage data
      const { error } = await userService.updateUserProfile(userId, {
        points: data.points || 0,
        unlocked_backgrounds: data.unlockedBackgrounds || ['default'],
        selected_background: data.selectedBackground || 'default',
      });

      if (error) {
        console.error('Error migrating user profile:', error);
        return { success: false, error: error.message };
      }

      return { success: true, message: 'User profile migrated successfully' };
    } catch (error) {
      console.error('Migration error:', error);
      return { success: false, error: error.message };
    }
  },

  // Migrate tasks data
  async migrateTasks(userId) {
    try {
      const localStorageData = localStorage.getItem('pomodoro-app');
      if (!localStorageData) return { success: true, message: 'No tasks to migrate' };

      const data = JSON.parse(localStorageData);
      const tasks = data.tasks || [];

      if (tasks.length === 0) {
        return { success: true, message: 'No tasks to migrate' };
      }

      // Migrate each task
      for (const task of tasks) {
        const { error } = await taskService.createTask(userId, {
          text: task.text || task.title,
          dueDate: task.dueDate,
          priority: task.priority || 'normal',
          category: task.category,
        });

        if (error) {
          console.error('Error migrating task:', task, error);
        }
      }

      return { success: true, message: `${tasks.length} tasks migrated successfully` };
    } catch (error) {
      console.error('Task migration error:', error);
      return { success: false, error: error.message };
    }
  },

  // Migrate music tracks
  async migrateMusic(userId) {
    try {
      const localStorageData = localStorage.getItem('pomodoro-app');
      if (!localStorageData) return { success: true, message: 'No music to migrate' };

      const data = JSON.parse(localStorageData);
      const tracks = data.tracks || [];

      if (tracks.length === 0) {
        return { success: true, message: 'No music tracks to migrate' };
      }

      // Migrate each music track
      for (const track of tracks) {
        const { error } = await musicService.addMusicTrack(userId, {
          name: track.name,
          embedUrl: track.embedUrl,
        });

        if (error) {
          console.error('Error migrating music track:', track, error);
        }
      }

      return { success: true, message: `${tracks.length} music tracks migrated successfully` };
    } catch (error) {
      console.error('Music migration error:', error);
      return { success: false, error: error.message };
    }
  },

  // Complete migration process
  async migrateAllData(userId) {
    try {
      const results = {
        profile: await this.migrateUserProfile(userId),
        tasks: await this.migrateTasks(userId),
        music: await this.migrateMusic(userId),
      };

      // Clear localStorage after successful migration
      if (results.profile.success && results.tasks.success && results.music.success) {
        localStorage.removeItem('pomodoro-app');
      }

      return results;
    } catch (error) {
      console.error('Complete migration error:', error);
      return { success: false, error: error.message };
    }
  },

  // Check if migration is needed
  hasLocalData() {
    const localStorageData = localStorage.getItem('pomodoro-app');
    if (!localStorageData) return false;

    try {
      const data = JSON.parse(localStorageData);
      return data.points > 0 || (data.tasks && data.tasks.length > 0);
    } catch {
      return false;
    }
  }
}; 