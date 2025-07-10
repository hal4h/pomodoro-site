import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xxeqxdstomzkxjpkushp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZXF4ZHN0b216a3hqcGt1c2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMDI5OTAsImV4cCI6MjA2NzY3ODk5MH0.Ngl7pksg5xLkw7UHuVYXQVdyOFEb1ZMOnS90tbpXGdY'

export const supabase = createClient(supabaseUrl, supabaseKey) 