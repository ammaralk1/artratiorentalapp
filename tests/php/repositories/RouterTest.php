<?php

declare(strict_types=1);

namespace ArtRatio\Tests;

use PHPUnit\Framework\TestCase;

/**
 * Unit tests for Router.
 *
 * Router relies only on the request method + URI strings, so no mocking needed.
 * respondError() is stubbed in tests/php/bootstrap.php (global namespace) so
 * these tests work without the full backend bootstrap stack.
 */

final class RouterTest extends TestCase
{
    /** @var array{message: string, status: int}|null */
    public static ?array $lastError = null;

    protected function setUp(): void
    {
        self::$lastError = null;
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    private function makeRouter(string $method, string $uri): \Router
    {
        require_once __DIR__ . '/../../../backend/Router.php';
        return new \Router($method, $uri);
    }

    // -------------------------------------------------------------------------
    // Basic routing
    // -------------------------------------------------------------------------

    public function testGetRouteIsInvoked(): void
    {
        $called = false;
        $router = $this->makeRouter('GET', '/api/customers');
        $router->get('/api/customers', function () use (&$called) {
            $called = true;
        });
        $router->dispatch();

        $this->assertTrue($called);
    }

    public function testPostRouteIsInvoked(): void
    {
        $called = false;
        $router = $this->makeRouter('POST', '/api/customers');
        $router->post('/api/customers', function () use (&$called) {
            $called = true;
        });
        $router->dispatch();

        $this->assertTrue($called);
    }

    public function testPutRouteIsInvoked(): void
    {
        $called = false;
        $router = $this->makeRouter('PUT', '/api/customers');
        $router->put('/api/customers', function () use (&$called) {
            $called = true;
        });
        $router->dispatch();

        $this->assertTrue($called);
    }

    public function testPatchRouteIsInvoked(): void
    {
        $called = false;
        $router = $this->makeRouter('PATCH', '/api/customers');
        $router->patch('/api/customers', function () use (&$called) {
            $called = true;
        });
        $router->dispatch();

        $this->assertTrue($called);
    }

    public function testDeleteRouteIsInvoked(): void
    {
        $called = false;
        $router = $this->makeRouter('DELETE', '/api/customers');
        $router->delete('/api/customers', function () use (&$called) {
            $called = true;
        });
        $router->dispatch();

        $this->assertTrue($called);
    }

    // -------------------------------------------------------------------------
    // Named parameters
    // -------------------------------------------------------------------------

    public function testRouteParameterIsCaptured(): void
    {
        $capturedParams = null;
        $router = $this->makeRouter('GET', '/api/customers/42');
        $router->get('/api/customers/{id}', function (array $p) use (&$capturedParams) {
            $capturedParams = $p;
        });
        $router->dispatch();

        $this->assertSame(['id' => '42'], $capturedParams);
    }

    public function testMultipleParametersAreCaptured(): void
    {
        $capturedParams = null;
        $router = $this->makeRouter('GET', '/api/projects/5/technicians/12');
        $router->get('/api/projects/{projectId}/technicians/{techId}', function (array $p) use (&$capturedParams) {
            $capturedParams = $p;
        });
        $router->dispatch();

        $this->assertSame(['projectId' => '5', 'techId' => '12'], $capturedParams);
    }

    // -------------------------------------------------------------------------
    // 404 / 405
    // -------------------------------------------------------------------------

    public function testUnknownPathReturns404(): void
    {
        $router = $this->makeRouter('GET', '/api/nonexistent');
        $router->get('/api/customers', fn() => null);
        $router->dispatch();

        $this->assertNotNull(self::$lastError);
        $this->assertSame(404, self::$lastError['status']);
    }

    public function testWrongMethodReturns405(): void
    {
        $router = $this->makeRouter('DELETE', '/api/customers');
        $router->get('/api/customers', fn() => null);
        $router->dispatch();

        $this->assertNotNull(self::$lastError);
        $this->assertSame(405, self::$lastError['status']);
    }

    // -------------------------------------------------------------------------
    // Query-string stripping
    // -------------------------------------------------------------------------

    public function testQueryStringIsIgnoredWhenMatching(): void
    {
        $called = false;
        $router = $this->makeRouter('GET', '/api/customers?search=Ahmed&limit=10');
        $router->get('/api/customers', function () use (&$called) {
            $called = true;
        });
        $router->dispatch();

        $this->assertTrue($called);
    }

    public function testTrailingSlashIsIgnoredWhenMatchingCollectionRoute(): void
    {
        $called = false;
        $router = $this->makeRouter('GET', '/api/customers/');
        $router->get('/api/customers', function () use (&$called) {
            $called = true;
        });
        $router->dispatch();

        $this->assertTrue($called);
    }

    public function testTrailingSlashIsIgnoredWhenMatchingParameterizedRoute(): void
    {
        $capturedParams = null;
        $router = $this->makeRouter('GET', '/api/customers/42/');
        $router->get('/api/customers/{id}', function (array $p) use (&$capturedParams) {
            $capturedParams = $p;
        });
        $router->dispatch();

        $this->assertSame(['id' => '42'], $capturedParams);
    }

    // -------------------------------------------------------------------------
    // Method is case-insensitive
    // -------------------------------------------------------------------------

    public function testMethodIsCaseInsensitive(): void
    {
        $called = false;
        $router = $this->makeRouter('get', '/api/customers');
        $router->get('/api/customers', function () use (&$called) {
            $called = true;
        });
        $router->dispatch();

        $this->assertTrue($called);
    }

    // -------------------------------------------------------------------------
    // Fluent chaining
    // -------------------------------------------------------------------------

    public function testFluentChainingRegistersAllRoutes(): void
    {
        $getCalled    = false;
        $deleteCalled = false;

        $router = $this->makeRouter('DELETE', '/api/equipment');
        $router
            ->get('/api/equipment', function () use (&$getCalled) { $getCalled = true; })
            ->delete('/api/equipment', function () use (&$deleteCalled) { $deleteCalled = true; });

        $router->dispatch();

        $this->assertFalse($getCalled);
        $this->assertTrue($deleteCalled);
    }
}
