<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->required();
            $table->string('prenom')->required();
            $table->string('email')->unique()->required();
            $table->string('password')->required();
            $table->string('telephone')->nullable();
            $table->string('sexe')->nullable();
            $table->string('nationalite')->required();
            $table->string('photo')->default('default_photo.jpg');  // Ajout de la valeur par défaut
            $table->string('role')->default('user');
            $table->string('adresse')->nullable();
            $table->string('ville')->nullable();
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('utilisateurs');
    }
};
