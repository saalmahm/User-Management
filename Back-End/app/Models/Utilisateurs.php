<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateurs extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'telephone',
        'sexe',
        'nationalite',
        'photo',
        'role',
        'adresse',
        'ville',
    ];
}
