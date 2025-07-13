<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TaskList;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 public function index()
{
    $lists = TaskList::where('user_id', auth()->id())->get();
                    //  ->with('tasks')
                     

    return Inertia::render('Lists/Index', [
        'lists' => $lists,
        'flash' => [
            'success' => session('success'),
            'error' => session('error'),
        ]
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia::render('Lists/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
  public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
    ]);

    $list = TaskList::create([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'user_id' => auth()->id(),
    ]);

    // Return JSON for frontend
    return response()->json(['message' => 'List created successfully', 'list' => $list], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskList $list)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $list->update($validated);

        return response()->json(['message' => 'List updated successfully', 'list' => $list]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskList $list)
    {
        $list->delete();
        return response()->json(['message' => 'List deleted successfully']);
    }

}
