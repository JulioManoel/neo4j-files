import UserController from "@/controllers/UserController";
import { defineStore } from "pinia";
import { useStore } from "./store";

export const useUserStore = defineStore("user", {
    state: () => ({
        users: null,
    }),
    actions: {
        async getAll() {
            useStore().setLoading(true)
            try {
                this.users = await UserController.getAll()
            } catch (error) {
                console.error(error.message)
            } finally {
                useStore().setLoading(false)
            }
        },

        async create(user) {
            useStore().setLoading(true)
            try {
                await UserController.create(user)
                await this.getAll()
            } catch (error) {
                console.error(error.message)
            } finally {
                useStore().setLoading(false)
            }
        },

        async delete(id) {
            useStore().setLoading(true)
            try {
                await UserController.delete(id)
                await this.getAll()
            } catch (error) {
                console.error(error.message)
            } finally {
                useStore().setLoading(false)
            }
        }
    }
})
