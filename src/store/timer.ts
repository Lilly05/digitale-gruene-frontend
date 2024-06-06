import { defineStore } from 'pinia';

export const useTimerStore = defineStore({
    id: 'recordTime',
    state: () => ({
        startTime: new Date(),
        endTime: new Date(),
        finalTime: 0
    }),
    actions: {
        setStartTime(startTime: Date) {
            this.startTime = startTime;
        },

        setEndTime(endTime: Date) {
            this.endTime = endTime;
        },

        calculateRecordedTime() {
            this.finalTime = this.endTime.getTime() - this.startTime.getTime();
        }

    }
});
