<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Note::all();
        return response()->json($notes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        $note = Note::create($request->all());
        return response()->json($note, 201);
    }

    public function byUserId(string $id)
    {
        $category = Note::where('user_id', $id)->get();
        if (!$category) {
            return response()->json(['error' => 'Categoria no encontrada'], 404);
        }
        return response()->json($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $note = Note::find($id);
        if (!$note) {
            return response()->json(['error' => 'Nota no encontrada'], 404);
        }
        return response()->json($note);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $note = Note::find($id);
        if (!$note) {
            return response()->json(['error' => 'Nota no encontrada'], 404);
        }
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        $note->update($request->all());
        return response()->json($note);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $note = Note::find($id);
        if (!$note) {
            return response()->json(['error' => 'Nota no encontrada'], 404);
        }
        $note->delete();
        return response()->json(null, 204);
    }
}
