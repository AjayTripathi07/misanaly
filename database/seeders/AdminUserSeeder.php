<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@misanaly.in'],
            [
                'name'              => 'Admin',
                'email'             => 'admin@misanaly.in',
                'password'          => Hash::make('Admin@123'),
                'email_verified_at' => now(),
            ],
        );
    }
}
