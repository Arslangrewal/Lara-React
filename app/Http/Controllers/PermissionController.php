<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Illuminate\Routing\Controllers\Middleware;

class PermissionController extends Controller
{
    // public static function middleware(): array{

    //     return [
    //         new Middleware('permission:view permissions',only:['index']),
    //         new Middleware('permission:edit permissions',only:['edit']),
    //         new Middleware('permission:create permissions',only:['create']),
    //         new Middleware('permission:delete permissions',only:['destroy']),
    //     ] ;
    // }

    public function index(){
         $permissions = Permission::all();
        
         return Inertia::render('Permissions/List', [
        'permissions' => $permissions,
        'flash' => [
            'success' => session('success'),
            'error' => session('error'),
        ]
    ]);

    }

    public function create(){

        return inertia::render('Permissions/Create');
    }


    public function store(){

        
    }
}
