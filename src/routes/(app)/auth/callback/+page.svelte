<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabase/supabaseClient';
  
    onMount(async () => {
        const {
            data: { session },
            error
        } = await supabase.auth.getSession();
    
        if (error) {
            console.error('세션 복원 오류:', error);
            return;
        }
    
        if (session) {
            // 필요한 서버 호출 or 유저 정보 저장 작업 가능
        }
    
        // 민감한 URL 제거 + /main 이동
        goto('/main', { replaceState: true });
    });
</script>
  
  <p class="font-body">로그인 처리 중입니다...</p>