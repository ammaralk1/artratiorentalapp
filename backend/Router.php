<?php

declare(strict_types=1);

/**
 * Lightweight regex router for the Art Ratio backend.
 *
 * Usage:
 *
 *   $router = new Router($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
 *   $router->get('/api/customers',        fn() => handleGetCustomers($pdo));
 *   $router->post('/api/customers',       fn() => handleCreateCustomer($pdo));
 *   $router->get('/api/customers/{id}',   fn(array $p) => handleGetCustomer((int)$p['id'], $pdo));
 *   $router->dispatch();
 *
 * Route parameters are captured with {name} placeholders and passed as an
 * associative array to the handler callable.
 */
class Router
{
    /** @var array<int, array{method: string, pattern: string, handler: callable}> */
    private array $routes = [];

    public function __construct(
        private readonly string $method,
        private readonly string $uri
    ) {}

    // -------------------------------------------------------------------------
    // Route registration helpers
    // -------------------------------------------------------------------------

    public function get(string $path, callable $handler): self
    {
        return $this->addRoute('GET', $path, $handler);
    }

    public function post(string $path, callable $handler): self
    {
        return $this->addRoute('POST', $path, $handler);
    }

    public function put(string $path, callable $handler): self
    {
        return $this->addRoute('PUT', $path, $handler);
    }

    public function patch(string $path, callable $handler): self
    {
        return $this->addRoute('PATCH', $path, $handler);
    }

    public function delete(string $path, callable $handler): self
    {
        return $this->addRoute('DELETE', $path, $handler);
    }

    private function addRoute(string $method, string $path, callable $handler): self
    {
        $this->routes[] = [
            'method'  => strtoupper($method),
            'pattern' => $this->pathToRegex($path),
            'keys'    => $this->extractKeys($path),
            'handler' => $handler,
        ];
        return $this;
    }

    // -------------------------------------------------------------------------
    // Dispatch
    // -------------------------------------------------------------------------

    /**
     * Match the current request against registered routes and invoke the handler.
     * Responds with 405 or 404 if no route matches.
     */
    public function dispatch(): void
    {
        $method    = strtoupper($this->method);
        $path      = strtok($this->cleanUri(), '?');

        $methodMatched = false;

        foreach ($this->routes as $route) {
            if (!preg_match($route['pattern'], $path, $matches)) {
                continue;
            }

            if ($route['method'] !== $method) {
                $methodMatched = true;
                continue;
            }

            // Build named param map
            $params = [];
            foreach ($route['keys'] as $i => $key) {
                $params[$key] = $matches[$i + 1] ?? null;
            }

            ($route['handler'])($params);
            return;
        }

        if ($methodMatched) {
            respondError('Method not allowed', 405);
        } else {
            respondError('Not found', 404);
        }
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    /**
     * Convert a path like /api/customers/{id} to a regex pattern.
     */
    private function pathToRegex(string $path): string
    {
        $escaped = preg_quote($path, '#');
        $pattern = preg_replace('/\\\{(\w+)\\\}/', '([^/]+)', $escaped);
        return '#^' . rtrim($pattern, '/') . '/?$#';
    }

    /**
     * Extract parameter names from a path like /api/customers/{id}.
     *
     * @return string[]
     */
    private function extractKeys(string $path): array
    {
        preg_match_all('/\{(\w+)\}/', $path, $matches);
        return $matches[1];
    }

    /**
     * Strip the script prefix from the URI so the router works in subdirectories.
     */
    private function cleanUri(): string
    {
        $path = '/' . ltrim(parse_url($this->uri, PHP_URL_PATH) ?? '/', '/');

        if (str_starts_with($path, '/backend/api/')) {
            return '/api/' . substr($path, strlen('/backend/api/'));
        }

        if ($path === '/backend/api') {
            return '/api';
        }

        return $path;
    }
}
