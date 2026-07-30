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
            ['email' => 'info@nobeliq.in'],
            [
                'name'              => 'Admin',
                'email'             => 'info@nobeliq.in',
                'password'          => Hash::make('Admin@123'),
                'email_verified_at' => now(),
                'is_admin'          => true,
            ],
        );
    }
}
