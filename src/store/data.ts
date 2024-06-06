import {defineStore} from "pinia";
import type {FormData} from "@/types/FormData";

export const useDataStore = defineStore({
    id: 'data',
    state: () => ({
        userData: undefined as unknown as FormData,
    }),
    actions: {
        saveData(data: FormData)  {
            this.userData = data
        }
    }
})
