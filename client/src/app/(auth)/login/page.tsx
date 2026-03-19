"use client";

import Loader from "@/src/components/Loader";
import { apiFetch } from "@/src/lib/api";
import { useAuthStore } from "@/src/store/authStore";
import { usePopupStore } from "@/src/store/popupStore";
import { User } from "@/src/types/user";
import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEventHandler, useState } from "react";

export default function Login() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const openPopup = usePopupStore(s=>s.open)
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit:SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if(!form.username || !form.password){
      openPopup("Error","All fields are required");
      return;
    }
    try{
      setLoading(true);
      const data:{token:string;user:User;message:string} = await apiFetch("auth/login",{
        method: "POST",
        body: JSON.stringify({username:form.username,password:form.password})
      });
      setAuth(data.user,data.token);
      setLoading(false);
      openPopup("Success",data.message);
      router.push("/");
    }
    catch(error:unknown){
      const message = error instanceof Error ? error.message : "Login failed"
      openPopup("Error",message);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-fit mx-auto mt-20 p-12 ">
      <h2 className="text-xl font-bold mb-12 underline">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 text-white">
        <input
          type="text"
          name="username"
          placeholder="name"
          value={form.username}
          onChange={handleChange}
          className="bg-slate-300 text-black p-3 rounded-xl"
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
          className="bg-slate-300 text-black p-3 rounded-xl"
        />
        <button type="submit" className="bg-blue-400 p-4 text-xl rounded-xl">Submit</button>
      </form>
      <Loader isActive={loading} />
    </div>
  );
}
