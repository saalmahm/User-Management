<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateurs;
use App\Http\Resources\UtilisateurResource;

class UtilisateurController extends Controller
{
    public function index()
    {
    $utilisateurs = Utilisateurs::all();
    if (is_null($utilisateurs)) {
    return response()->json('Aucun utilisateur trouvé', 404);
    }
    return response()->json($utilisateurs);
    }

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'nom' => 'required',
        'prenom' => 'required',
        'email' => 'required|email|unique:utilisateurs',
        'password' => 'required',
        'telephone' => 'nullable',
        'sexe' => 'nullable',
        'nationalite' => 'required',
        'photo' => 'sometimes|nullable',
        'role' => 'nullable',
        'adresse' => 'nullable',
        'ville' => 'nullable',
    ]);

    try {
        $utilisateur = Utilisateurs::create($validatedData);
        return response()->json($utilisateur);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
public function show($id)
{
$utilisateur = Utilisateurs::find($id);
if (is_null($utilisateur)) {
return response()->json('Utilisateur not found', 404);
}
return response()->json($utilisateur);
}
public function update(Request $request, $id)
{
$utilisateur = Utilisateurs::find($id);
$utilisateur->update($request->all());
return response()->json($utilisateur, 200);
}
public function delete($id)
{
$utilisateur = Utilisateurs::find($id);
$utilisateur->delete();
return response()->json("Utilisateur supprimé avec succé", 204);
}

}
