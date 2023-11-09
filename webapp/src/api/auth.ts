import api from "./api";
import {AxiosError} from "axios";

export interface User {
    name: string;
    email: string;
}

export namespace auth {
    export async function getCurrentUser(): Promise<User> {
        const response = await api.get("/api/user");
        return response.data;
    }

    export async function login(email: string, password: string): Promise<void> {
        try {
            // await api.get("/sanctum/csrf-cookie");
            const resp = await api.post("/api/login", {
                email,
                password,
            });
            localStorage.setItem("token", resp.data.token);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 422) {
                throw new Error("Invalid email or password");
            }
            throw error;
        }
    }

    export async function logout(): Promise<void> {
        // await api.post("/logout");
        localStorage.removeItem("token");
    }
}