<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
        'view posts',
        'create posts',
        'edit posts',
        'delete posts',
        'manage users',
        'manage settings'
    ];
    }
}
