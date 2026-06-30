<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            SiteSettingsSeeder::class,
            ServicesSeeder::class,
            ProductsSeeder::class,
            TeamSeeder::class,
            TestimonialsSeeder::class,
            BlogSeeder::class,
        ]);
    }
}
