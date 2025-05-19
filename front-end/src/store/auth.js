import AuthController from "@/controllers/AuthController";
import { defineStore } from "pinia";
import { useStore } from "./store";
import User from "@/models/User";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null
    }),
    actions: {
        async login(email, password) {
            useStore().setLoading(true)
            try {
                this.user = await AuthController.login(email, password)
            } catch (error) {
                console.error(error.message)
            } finally {
                useStore().setLoading(false)
            }
        },

        async setUser(user) {
            this.user = User.fromJson(user)
        },

        async logout() {
            useStore().setLoading(true)
            try {
                await AuthController.logout()
                this.user = null
            } catch (error) {
                console.error(error.message)
            } finally {
                useStore().setLoading(false)
            }
        }
    }
})
