import DeviceController from "@/controllers/DeviceController";
import { defineStore } from "pinia";
import { useStore } from "./store";

export const useDeviceStore = defineStore("device", {
    state: () => ({
        devices: null,
    }),
    actions: {
        async getAll(search) {
            useStore().setLoading(true)
            try {
                this.devices = await DeviceController.getAll(search)
            } catch (error) {
                console.error(error.message)
            } finally {
                useStore().setLoading(false)
            }
        },
    }
})
