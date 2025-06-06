import { supabase } from '$lib/supabase/supabase-client';

export const loginWithGoogle = async () => {
    return await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3027/auth/callback'
        }
    });
};