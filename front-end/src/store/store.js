import { defineStore } from "pinia"

export const useStore = defineStore('store', {
    state: () => ({
        loading: false,
    }),
    actions: {
        setLoading(value) {
            this.loading = value
        },
    },
})
