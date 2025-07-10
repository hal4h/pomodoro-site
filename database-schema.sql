-- -- Enable UUID extension
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -- User Profiles table (extends Supabase auth)
-- CREATE TABLE IF NOT EXISTS user_profiles (
--   id UUID REFERENCES auth.users(id) PRIMARY KEY,
--   email TEXT,
--   points INTEGER DEFAULT 0,
--   unlocked_backgrounds TEXT[] DEFAULT ARRAY['default'],
--   selected_background TEXT DEFAULT 'default',
--   current_task_id UUID,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Tasks table
-- CREATE TABLE IF NOT EXISTS tasks (
--   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
--   title TEXT NOT NULL,
--   due_date DATE,
--   completed BOOLEAN DEFAULT FALSE,
--   priority TEXT DEFAULT 'normal',
--   category TEXT,
--   pomodoro_count INTEGER DEFAULT 0,
--   notes TEXT,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Music tracks table
-- CREATE TABLE IF NOT EXISTS user_music (
--   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
--   track_name TEXT NOT NULL,
--   embed_url TEXT NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Study sessions table
-- CREATE TABLE IF NOT EXISTS study_sessions (
--   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
--   duration INTEGER NOT NULL, -- in seconds
--   points_earned INTEGER DEFAULT 0,
--   task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Create indexes for better performance
-- CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
-- CREATE INDEX IF NOT EXISTS idx_user_music_user_id ON user_music(user_id);
-- CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON study_sessions(user_id);

-- -- Enable Row Level Security (RLS)
-- ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_music ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

-- -- Create RLS policies
-- -- User profiles: users can only access their own profile
-- CREATE POLICY "Users can view own profile" ON user_profiles
--   FOR SELECT USING (auth.uid() = id);

-- CREATE POLICY "Users can update own profile" ON user_profiles
--   FOR UPDATE USING (auth.uid() = id);

-- CREATE POLICY "Users can insert own profile" ON user_profiles
--   FOR INSERT WITH CHECK (auth.uid() = id);

-- -- Tasks: users can only access their own tasks
-- CREATE POLICY "Users can view own tasks" ON tasks
--   FOR SELECT USING (auth.uid() = user_id);

-- CREATE POLICY "Users can insert own tasks" ON tasks
--   FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can update own tasks" ON tasks
--   FOR UPDATE USING (auth.uid() = user_id);

-- CREATE POLICY "Users can delete own tasks" ON tasks
--   FOR DELETE USING (auth.uid() = user_id);

-- -- Music: users can only access their own music
-- CREATE POLICY "Users can view own music" ON user_music
--   FOR SELECT USING (auth.uid() = user_id);

-- CREATE POLICY "Users can insert own music" ON user_music
--   FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can delete own music" ON user_music
--   FOR DELETE USING (auth.uid() = user_id);

-- -- Study sessions: users can only access their own sessions
-- CREATE POLICY "Users can view own sessions" ON study_sessions
--   FOR SELECT USING (auth.uid() = user_id);

-- CREATE POLICY "Users can insert own sessions" ON study_sessions
--   FOR INSERT WITH CHECK (auth.uid() = user_id);

-- -- Function to automatically create user profile on signup
-- CREATE OR REPLACE FUNCTION public.handle_new_user()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   INSERT INTO public.user_profiles (id, email)
--   VALUES (NEW.id, NEW.email);
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- -- Trigger to create user profile on signup
-- CREATE OR REPLACE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 