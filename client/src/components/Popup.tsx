"use client";
import { useEffect } from "react"
import { usePopupStore } from "../store/popupStore"

const Popup = () => {

  const isActive = usePopupStore((s) => s.isActive);
  const title = usePopupStore((s) => s.title);
  const message = usePopupStore((s) => s.message);
  const close = usePopupStore((s) => s.close);

  useEffect(()=>{
    if(!isActive) return;
    const timeout = setTimeout(() => {
      close();
    }, 2000);

    return() => clearTimeout(timeout)

  },[isActive,close])
  
  if(!isActive) return null;
  return (
   isActive && <div className="w-full h-full text-white absolute top-0 left-0">
    <div className="border-2 w-1/2  absolute top-1/2 left-1/2 -translate-1/2 p-4 bg-white/40">
      <h2 className="mb-4 w-fit mx-auto" style={{fontSize:"var(--text-size-big)"}}>{title}</h2>
      <h3 className="">{message}</h3>
    </div>
   </div>
  )
}

export default Popup