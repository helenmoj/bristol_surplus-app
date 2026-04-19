import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://etyqdnkkuhilixmxotag.supabase.co'
const supabaseKey = 'sb_publishable_ed_aQAb_cThrWn7wsQ6Qlg_cdN9t0zF'

export const supabase = createClient(supabaseUrl, supabaseKey)