<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Routing\Controllers\Middleware;

class RoleController extends Controller
{

    public static function middleware(): array{

        return [
            new Middleware('permission:view roles',only:['index']),
            new Middleware('permission:edit roles',only:['edit']),
            new Middleware('permission:create roles',only:['create']),
            new Middleware('permission:delete roles',only:['destroy']),
        ] ;
    }
   public function index()
    {
        $roles = Role::with('permissions')->paginate(10); // Adjust per-page as needed

        return Inertia::render('Role/Index', [
            'roles' => $roles,
        ]);
    }

    public function create()
    {
        $permissions = Permission::all(['id', 'name']);

        return Inertia::render('Role/Create', [
            'permissions' => $permissions,
        ]);
    }

    public function store(Request $request){
        $validate = $request->validate([
            'name' => 'required|string|unique:roles,name'
        ]);

        if($validate){

            $role = Role::create([
               'name' => $request->name 
            ]);

            foreach($request->permissions as $name){
                $role->givePermissionTo($name);

            }

        }

        return response()->json(['message' => 'Role Created Successfully'], 201);
    }


    public function edit($id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        $permissions = Permission::all(['id', 'name']);

        return Inertia::render('Role/Edit', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }



    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $id,
        ]);

        $role = Role::findOrFail($id);
        $role->update(['name' => $request->name]);

        $role->syncPermissions($request->permissions);

        return response()->json(['message' => 'Role Updated Successfully']);
    }


    public function destroy(Role $role){

        $role->delete();

        return response()->json(['message' => 'Role Deleted Successfully']);
    }
    
}
