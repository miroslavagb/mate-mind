import { computed } from 'vue';

export function useAuth() {
    const isAuthenticated = computed(() => !!localStorage.getItem('token'));
    return { isAuthenticated };
}
