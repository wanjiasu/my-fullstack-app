"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { registerRegister, authJwtLogin } from "@/app/clientService";

import { registerSchema } from "@/lib/definitions";
import { getErrorMessage } from "@/lib/utils";

export async function register(prevState: unknown, formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const input = {
    body: {
      email,
      password,
    },
  };
  try {
    // Register the user
    const { error: registerError } = await registerRegister(input);
    if (registerError) {
      return { server_validation_error: getErrorMessage(registerError) };
    }

    // Auto-login after successful registration
    const loginInput = {
      body: {
        username: email, // Using email as username for login
        password,
      },
    };

    const { data: loginData, error: loginError } = await authJwtLogin(loginInput);
    if (loginError) {
      // If auto-login fails, still redirect to login page
      redirect(`/login`);
    } else {
      // Set the access token cookie
      (await cookies()).set("accessToken", loginData.access_token);
    }
  } catch (err) {
    console.error("Registration error:", err);
    return {
      server_error: "An unexpected error occurred. Please try again later.",
    };
  }
  redirect(`/`);
}
