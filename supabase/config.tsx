import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://ppjxcfslnowxotnpgqql.supabase.co',
     'sb_publishable_5ewQ0ELZYc_nSIKHgSFLkg_Mvhk8WIH'
    )