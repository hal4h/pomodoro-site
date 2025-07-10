
import { supabase } from '../lib/supabase'

// User Profile Operations
export const userService = {
  // Get or create user profile
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code === 'PGRST116') {
      // User profile doesn't exist, create it
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          points: 0,
          unlocked_backgrounds: ['default'],
          selected_background: 'default'
        })
        .select()
        .single()

      return { data: newProfile, error: createError }
    }

    return { data, error }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    return { data, error }
  },

  // Update points
  async updatePoints(userId, points) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ points })
      .eq('id', userId)
      .select()
      .single()

    return { data, error }
  },

  // Update unlocked backgrounds
  async updateUnlockedBackgrounds(userId, backgrounds) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ unlocked_backgrounds: backgrounds })
      .eq('id', userId)
      .select()
      .single()

    return { data, error }
  }
}

// Task Operations
export const taskService = {
  // Get user's tasks
  async getUserTasks(userId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return { data, error }
  },

  // Create new task
  async createTask(userId, taskData) {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userId,
        title: taskData.text,
        due_date: taskData.dueDate,
        priority: taskData.priority,
        category: taskData.category
      })
      .select()
      .single()

    return { data, error }
  },

  // Update task
  async updateTask(taskId, updates) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single()

    return { data, error }
  },

  // Delete task
  async deleteTask(taskId) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    return { error }
  },

  // Complete task
  async completeTask(taskId) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ completed: true })
      .eq('id', taskId)
      .select()
      .single()

    return { data, error }
  }
}

// Music Operations
export const musicService = {
  // Get user's music tracks
  async getUserMusic(userId) {
    const { data, error } = await supabase
      .from('user_music')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return { data, error }
  },

  // Add music track
  async addMusicTrack(userId, trackData) {
    const { data, error } = await supabase
      .from('user_music')
      .insert({
        user_id: userId,
        track_name: trackData.name,
        embed_url: trackData.embedUrl
      })
      .select()
      .single()

    return { data, error }
  },

  // Delete music track
  async deleteMusicTrack(trackId) {
    const { error } = await supabase
      .from('user_music')
      .delete()
      .eq('id', trackId)

    return { error }
  },

  // Update music track
  async updateMusicTrack(trackId, updates) {
    const { data, error } = await supabase
      .from('user_music')
      .update(updates)
      .eq('id', trackId)
      .select()
      .single()

    return { data, error }
  }
}

// Background Operations
export const backgroundService = {
  // Get user's unlocked backgrounds
  async getUserBackgrounds(userId) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('unlocked_backgrounds, selected_background')
      .eq('id', userId)
      .single()

    return { data, error }
  },

  // Update unlocked backgrounds
  async updateUnlockedBackgrounds(userId, backgrounds) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ unlocked_backgrounds: backgrounds })
      .eq('id', userId)
      .select()
      .single()

    return { data, error }
  },

  // Update selected background
  async updateSelectedBackground(userId, backgroundId) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ selected_background: backgroundId })
      .eq('id', userId)
      .select()
      .single()

    return { data, error }
  }
}

// Study Session Operations
export const sessionService = {
  // Record study session
  async recordSession(userId, sessionData) {
    const { data, error } = await supabase
      .from('study_sessions')
      .insert({
        user_id: userId,
        duration: sessionData.duration,
        points_earned: sessionData.pointsEarned,
        task_id: sessionData.taskId
      })
      .select()
      .single()

    return { data, error }
  },

  // Get user's study sessions
  async getUserSessions(userId) {
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return { data, error }
  }
} 