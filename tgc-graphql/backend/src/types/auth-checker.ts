import { Context } from "./context.type";

export interface AuthenticatedUser {
  userId: number;
  email: string;
}

// Étendre le Context pour inclure l'utilisateur
export interface AuthContext extends Context {
  user?: AuthenticatedUser | null;
} 