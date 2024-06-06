import { defineStore } from 'pinia';

export const useMouseStore = defineStore({
    id: 'mouse',
    state: () => ({
        movements: [] as { x: number; y: number }[],
        saveMovements: true
    }),
    actions: {
        addMovement(movement: { x: number; y: number }) {
            if (this.saveMovements){
                this.movements.push(movement);
            }
        },
        resetMovements() {
            this.movements = [];
            this.saveMovements = true;
        },
        setSaveMovements(saveMovement: boolean) {
            this.saveMovements = saveMovement;
        }
    }
});
