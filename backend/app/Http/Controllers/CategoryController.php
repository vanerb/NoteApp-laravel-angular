<?php

namespace App\Http\Controllers;

use App\Models\Category;
use DateTime;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);
        $category = new Category();
        $category->name = $request->name;
        $category->user_id = $request->user_id;
        $category->created_at = new DateTime();
        $category->updated_at = new DateTime();
        $category->save();
        // $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['error' => 'Categoria no encontrada'], 404);
        }
        return response()->json($category);
    }

    public function byUserId(string $id)
    {
        $category = Category::where('user_id', $id)->get();
        if (!$category) {
            return response()->json(['error' => 'Categoria no encontrada'], 404);
        }
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['error' => 'Categoria no encontrada'], 404);
        }
        $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);

        $category->name = $request->name;
        $category->user_id = $request->user_id;
        $category->updated_at = new DateTime();
        $category->save();
        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['error' => 'Categoria no encontrada'], 404);
        }
        $category->delete();
        return response()->json(null, 204);
    }
}
