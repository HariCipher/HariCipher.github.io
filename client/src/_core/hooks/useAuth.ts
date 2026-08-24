/**
 * Authentication state for the template's dashboard scaffolding.
 *
 * Restored after a folder merge dropped `client/src/_core/` while keeping the
 * components that import from it. Nothing is invented here: the shape is read
 * straight off the existing tRPC router in `server/routers.ts`, which already
 * exposes `auth.me` (returns `ctx.user`, or null when the session cookie is
 * absent or rejected) and `auth.logout` (clears that cookie).
 *
 * To begin a login, call `startLogin()` from `@/const` in an event handler —
 * it has side effects and must not run during render.
 */
import { trpc } from "@/lib/trpc";

export function useAuth() {
  const me = trpc.auth.me.useQuery(undefined, { retry: false });
  const utils = trpc.useUtils();
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => utils.auth.me.invalidate(),
  });

  return {
    user: me.data ?? null,
    loading: me.isLoading,
    error: me.error ?? null,
    isAuthenticated: !!me.data,
    logout: () => logoutMutation.mutate(),
  };
}
