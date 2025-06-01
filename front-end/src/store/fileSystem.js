import FileSystemController from "@/controllers/FileSystemController";
import { defineStore } from "pinia";
import { useStore } from "./store";

export const useFileSystemStore = defineStore("fileSystem", {
    state: () => ({
        files: [],
        folders: []
    }),
    actions: {
        async getAll(search) {
            useStore().setLoading(true)
            try {
                const data = await FileSystemController.getAll(search)
                if (!data) throw new Error('No data found')
                    
                this.files = data.files
                this.folders = data.folders
            } catch (error) {
                console.error(error.message)
            } finally {
                useStore().setLoading(false)
            }
        },

        async createFolder(name) {
            useStore().setLoading(true)
            try {
                await FileSystemController.createFolder(name)
                await this.getAll()
            } catch (error) {
                console.error(error.message)
            } finally {
                useStore().setLoading(false)
            }
        },

        async createFile(name, folderId) {
            useStore().setLoading(true)
            try {
                await FileSystemController.createFile(name, folderId)
                await this.getAll()
            } catch (error) {
                console.error(error.message)
            } finally {
                useStore().setLoading(false)
            }
        },

        async downloadFile(fileId) {
            useStore().setLoading(true)
            try {
                const data = await FileSystemController.downloadFile(fileId)
                console.log(typeof data)
                if (!data) throw new Error('No data found')
                
                const blob = new Blob([data])
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = fileId
                a.click()
                window.URL.revokeObjectURL(url)
            } catch (error) {
                console.error(error.message)
            } finally {
                useStore().setLoading(false)
            }
        }
        
    }
})
