import { useEffect } from "react"
import { useAuthStore } from "../store/authStore"
import { apiFetch } from "../lib/api"
import { User } from "../types/user"

type RefreshResponse = {
  accessToken: string
}
type userResponse = {
  user:User,
  message: string
}

export const useReloadInfo = () => {
  const setAuth = useAuthStore(s => s.setAuth)

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const refresh = await apiFetch<RefreshResponse>("auth/refresh", {
          method: "POST"
        })

        if(!refresh?.accessToken) return;

        const userRes:userResponse = await apiFetch("auth/me", {
          headers: {
            Authorization: `Bearer ${refresh.accessToken}`
          }
        })

        if(!userRes) return;

        setAuth(userRes.user, refresh.accessToken)

      } catch (error:unknown) {
            if (error instanceof Error) {
                console.error("user not logged in",error.message);
            } else {
                console.log("Unknown error");
            }
        }
    }

    loadAuth()
  },)
}