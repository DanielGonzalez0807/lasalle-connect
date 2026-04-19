import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gpnexymksvlupikfpdxu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmV4eW1rc3ZsdXBpa2ZwZHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MzEwNzUsImV4cCI6MjA5MjIwNzA3NX0.DVT6fkPsHF2kutaNbq9cvBs-_LkF25eq1nQ2y0J0H-g"

export const supabase = createClient(supabaseUrl, supabaseKey)