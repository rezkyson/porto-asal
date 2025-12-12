
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfakrfeesrihhzohkexr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYWtyZmVlc3JpaGh6b2hrZXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1Mjc1MzEsImV4cCI6MjA4MTEwMzUzMX0.-LSx1mzGKV27GQKNLcD5xjvNqtkhYgmACH3Ba1UKDP0'

export const supabase = createClient(supabaseUrl, supabaseKey)
