import { create } from "zustand";
import { popupParam } from "../types/popupParams";

export const usePopupStore = create<popupParam>((set) => ({
    isActive : false,
    title : "Notification",
    message: "",
    open : (title,message) => set({isActive:true,title,message}),
    close : () => set({isActive:false,title:"Notification",message:""})
}))