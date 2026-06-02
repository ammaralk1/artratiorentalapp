<?php
declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../services/ProjectReservationPackageRepairService.php';

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "This tool must be run from the command line.\n");
    exit(1);
}

$apply = in_array('--apply', $argv, true);

try {
    $service = new ProjectReservationPackageRepairService(getDatabaseConnection());
    $summary = $service->repair($apply);
} catch (Throwable $exception) {
    fwrite(STDERR, "Project reservation package repair failed: {$exception->getMessage()}\n");
    exit(1);
}

echo $apply
    ? "Applied project reservation package repair.\n"
    : "Dry run only. Re-run with --apply to write changes.\n";

foreach ($summary as $key => $value) {
    echo str_pad($key, 36) . $value . "\n";
}

exit(0);
