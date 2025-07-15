<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Illuminate\Routing\Controllers\Middleware;

class PermissionController extends Controller
{
    public static function middleware(): array{

        return [
            new Middleware('permission:view permissions',only:['index']),
            new Middleware('permission:edit permissions',only:['edit']),
            new Middleware('permission:create permissions',only:['create']),
            new Middleware('permission:delete permissions',only:['destroy']),
        ] ;
    }

    public function index()
    {
        //  $permissions = Permission::all();
        $permissions = Permission::orderBy('id', 'asc')->paginate(10);

        return Inertia::render('Permissions/List', [
            'permissions' => $permissions,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }


    public function create()
    {
        return Inertia::render('Permissions/Create');
    }


    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:permissions,name',
            ]);

            $permission = \Spatie\Permission\Models\Permission::create([
                'name' => $validated['name'],
            ]);

            return response()->json(['message' => 'Permission Created Successfully.'], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('Permissions/Edit', [
            'permission' => $permission,
        ]);
    }

    public function update(Request $request, Permission $permission)
    {
        try {
            // dd($request->name);
            $request->validate([
                'name' => 'required|string|max:255|unique:permissions,name,' . $permission->name,
            ]);


            $permission->update(['name' => $request->name]);

            return response()->json(['message' => 'Permission Update Sccessfully.'], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }


    public function destroy(Permission $permission)
    {

        $permission->delete();

        return response()->json(['message' => 'Permission deleted successfully']);
    }
}
