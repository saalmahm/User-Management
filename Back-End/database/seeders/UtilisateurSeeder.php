<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UtilisateurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('fr_FR');
        
        for ($i = 0; $i < 20; $i++) {
            DB::table('utilisateurs')->insert([
                'nom' => $faker->firstName,
                'prenom' => $faker->lastName,
                'email' => $faker->email,
                'password' => Hash::make('password'),
                'telephone' => $faker->e164PhoneNumber,
                'sexe' => $faker->randomElement(['male', 'female']),
                'nationalite' => $faker->country,
                'photo' => 'https://via.placeholder.com/360x360.png',
                'role' => 'user',
                'adresse' => $faker->address,
                'ville' => $faker->city,
            ]);
        }
    }
}
