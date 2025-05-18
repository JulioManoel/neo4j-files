import { useAuthStore } from "@/store/auth"

export function isUserLoggedIn() {
    const user = localStorage.getItem('user')
    if(user) {
        useAuthStore().setUser(JSON.parse(user))
        return true
    }
    return false
}
