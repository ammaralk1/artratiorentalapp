<?php

declare(strict_types=1);

/**
 * Authentication and authorisation middleware.
 *
 * Wraps the existing session-based helpers (requireAuthenticated, requireRole)
 * so routes can express auth requirements declaratively:
 *
 *   AuthMiddleware::authenticated();
 *   AuthMiddleware::role(['admin', 'manager']);
 *
 * Both methods halt execution with a JSON error response when the check fails.
 * They delegate to the existing procedural helpers in bootstrap/auth.php.
 */
class AuthMiddleware
{
    /**
     * Ensure the request comes from an authenticated session.
     * Exits with 401 JSON response if not authenticated.
     */
    public static function authenticated(): void
    {
        requireAuthenticated();
    }

    /**
     * Ensure the authenticated user has one of the allowed roles.
     * Exits with 401 (not authenticated) or 403 (wrong role).
     *
     * @param string|string[] $roles
     */
    public static function role(string|array $roles): void
    {
        requireRole($roles);
    }

    /**
     * Optionally authenticate — returns the authenticated user array or null.
     * Does not halt execution.
     */
    public static function user(): ?array
    {
        return getAuthenticatedUser();
    }

    /**
     * Return true when the current session is authenticated.
     */
    public static function check(): bool
    {
        return isAuthenticated();
    }
}
