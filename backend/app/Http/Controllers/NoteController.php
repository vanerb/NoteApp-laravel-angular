<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Note::with('images')->get();
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
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
        ]);



        $note = Note::create($request->all());

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('notes', 'public');
                $note->images()->create(['path' => $path]);
            }
        }

        return response()->json(['note' => $note->load('images')], 201);
    }

    public function byUserId(string $id)
    {
        $category = Note::where('user_id', $id)->with('images')->get();
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
        $note = Note::where('id', $id)->with('images')->first();
        if (!$note) {
            return response()->json(['error' => 'Nota no encontrada'], 404);
        }
        return response()->json($note);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateNote(string $id, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
            'deleted_images' => 'nullable|array', // IDs de las imágenes a eliminar
            'deleted_images.*' => 'integer',
        ]);

        $note = Note::where('id', $id)->with('images')->first();

        if (!$note) {
            return response()->json(['error' => 'Nota no encontrada'], 404);
        }

        if (!empty($validated['deleted_images'])) {
            $imagesToDelete = Image::whereIn('id', $validated['deleted_images'])->get();
            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('notes', 'public');
                $note->images()->create(['path' => $path]);
            }
        }

        $note->update($validated);

        return response()->json(['note' => $note->load('images')], 200);
    }

   
    public function destroy(string $id)
    {
        $note = Note::find($id);
        if (!$note) {
            return response()->json(['error' => 'Nota no encontrada'], 404);
        }

        foreach ($note->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $note->delete();

        return response()->json(['message' => 'Nota eliminada con éxito.']);
    }
}
