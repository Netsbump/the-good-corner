import { AuthChecker } from "type-graphql";
import { AuthContext, AuthenticatedUser } from "../types/auth-checker";
import jwt from 'jsonwebtoken';

export const authChecker: AuthChecker<AuthContext> = async (
  { context },
  roles,
) => {
  try {
    const token = context.cookies.get('token');
    if (!token) return false;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as AuthenticatedUser;

    // Ajouter l'utilisateur au contexte
    context.user = decoded;

    // Vérifier les rôles si nécessaire
    if (roles.length === 0) return true;
    // TODO: Implémenter la vérification des rôles

    return true;
  } catch {
    return false;
  }
}; 