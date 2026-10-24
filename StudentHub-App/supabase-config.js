
/* StudentHub - Supabase Configuration */

const SUPABASE_URL = "https://sryqummojcpzuuowsghe.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_6qt_cxoVbdrN0Tk2qfURtQ_myX9-cp7";

window.studentHubSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
