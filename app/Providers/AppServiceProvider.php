<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        // $this->app->bind('path.public', function() {
        //     return realpath(base_path().'/../');
        // });
        $this->app->bind('path.public', function() {
            return base_path().'/public_html';
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind('path.public', function () {
            return base_path('.././'); // Adjust this path as needed
        });

        // Vite::usePublicPath('../'); // Update to your new public folder location
        Vite::prefetch(concurrency: 3);

        Gate::define('manage-teacher', function (User $user) {
            return in_array($user->role, ['admin', 'superadmin']);
        });

        Gate::define('manage-user', function (User $user) {
            return in_array($user->role, ['superadmin']);
        });

        Gate::define('do-supervision', function (User $user) {
            return in_array($user->role, ['supervisor', 'superadmin']);
        });

        Gate::define('view-supervision', function (User $user) {
            return in_array($user->role, ['guru', 'supervisor', 'superadmin']);
        });
    }
}
