import { AuthChecker } from "type-graphql";
import { AuthContext, AuthenticatedUser } from "../types/auth-checker";
import jwt from 'jsonwebtoken';

export const authChecker: AuthChecker<AuthContext> = async (
  { context },
  roles,
) => {
  try {
    const token = context.cookies.get('token');
    if (!token) {
      context.user = null;
      return true;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as AuthenticatedUser;

    context.user = decoded;

    if (roles.length > 0 && !decoded) {
      return false;
    }

    return true;
  } catch {
    context.user = null;
    return true;
  }
}; 