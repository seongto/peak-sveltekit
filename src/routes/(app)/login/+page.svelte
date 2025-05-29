<script lang="ts">
    import { supabase } from '$lib/supabase/supabase-client';

    const loginWithGoogle = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: 'http://localhost:3027/auth/callback'
			}
		});
  
    	if (error) console.error(error);
    };
</script>
  
<button on:click={loginWithGoogle} class="font-body">구글 로그인</button>