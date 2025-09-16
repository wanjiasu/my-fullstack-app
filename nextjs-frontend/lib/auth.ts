import { cookies } from "next/headers";
import { usersCurrentUser } from "@/app/clientService";

export interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");

    if (!token) {
      return null;
    }

    const options = {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    };

    const { data, error } = await usersCurrentUser(options);

    if (error || !data) {
      return null;
    }

    return data as User;
  } catch (err) {
    console.error("Error getting current user:", err);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
