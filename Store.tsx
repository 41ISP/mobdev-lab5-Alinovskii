import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ITask {
    id: string;
    name: string;
    doneState: boolean;
}

export interface ITaskStore {
 tasks: ITask[];
 addTask: (task: ITask) => void
 delTask: (task: ITask) => void
 doneTask: (task: ITask) => void
}

export const Store = create<ITaskStore>()(
persist(
    (set) => ({
        tasks: [],
        addTask: (task) => set((state) => ({ ...state, tasks: [...state.tasks, task]})), 
        delTask: (task) =>set((state) => ({ ...state, tasks: state.tasks.filter((t) => task.id!== t.id)})),
        doneTask: (task) => set((state) => ({...state, tasks: state.tasks.map((t) => task.id === t.id ? { ...t, state: !t.doneState } : t)}))
    }
    
    
),
{
    name:'Task-Storage',
    storage: createJSONStorage(() => AsyncStorage),
}
)
)
export default Store

    


