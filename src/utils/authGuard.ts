import { headers } from 'next/headers';
import { AuthRepository } from '@/repositories';
import { db } from '@/server/db/connection';

export interface AuthUser {
  id: string;
}

export interface RequireAuthOptions {
  requiredPermissions?: string[];
}

/**
 * Validates the current request has an authenticated session.
 * Extracts the Bearer token from the Authorization header.
 * Throws if not authenticated.
 */
export async function requireAuth(
  _options: RequireAuthOptions = {}
): Promise<{ user: AuthUser }> {
  const headersList = await headers();
  const authHeader = headersList.get('authorization');
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader ?? null;

  if (!token) {
    throw new Error('Not authenticated');
  }

  const repository = new AuthRepository(db);
  const session = await repository.findByToken(token);

  if (!session) {
    throw new Error('Not authenticated');
  }

  return {
    user: {
      id: session.userId,
    },
  };
}
