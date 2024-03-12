import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UserProfilePage from './components/UsersProfile';;

jest.mock('axios');"vincent39@yahoo.fr

describe('UserProfilePage', () => {
  test('affiche les informations utilisateur', async () => {
    const mockUser = {
      id: 1,
      nom: 'John',
      prenom: 'Doe',
      telephone: '123456789',
      sexe: 'Male',
      nationalite: 'French',
      role: 'User',
      adresse: '123 Main St',
      ville: 'City',
      photo: 'path/to/photo.jpg',
    };

    axios.get.mockResolvedValue({ data: mockUser });

    render(<UserProfilePage />);

    // Attendez que les informations utilisateur soient chargées
    await waitFor(() => {
      expect(screen.getByText('Nom: John')).toBeInTheDocument();
      expect(screen.getByText('Prénom: Doe')).toBeInTheDocument();
      expect(screen.getByText('Telephone: 123456789')).toBeInTheDocument();
      expect(screen.getByText('Sexe: Male')).toBeInTheDocument();
      expect(screen.getByText('Nationalité: French')).toBeInTheDocument();
      expect(screen.getByText('Role: User')).toBeInTheDocument();
      expect(screen.getByText('Adresse: 123 Main St')).toBeInTheDocument();
      expect(screen.getByText('Ville: City')).toBeInTheDocument();
          });
  });

  test('permet à l\'utilisateur de modifier les informations', async () => {
    const mockUser = {
      id: 1,
      nom: 'John',
      prenom: 'Doe',
      telephone: '123456789',
      sexe: 'Male',
      nationalite: 'French',
      role: 'User',
      adresse: '123 Main St',
      ville: 'City',
      photo: 'path/to/photo.jpg',
    };

    axios.get.mockResolvedValue({ data: mockUser });

    render(<UserProfilePage />);

    // Attendez que les informations utilisateur soient chargées
    await waitFor(() => {
      expect(screen.getByText('Nom: John')).toBeInTheDocument();
    });

    // Cliquez sur le bouton "Modifier"
    fireEvent.click(screen.getByText('Modifier'));

    // Modifiez les informations utilisateur
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'NewName' } });

    // Cliquez sur le bouton "Enregistrer les modifications"
    fireEvent.click(screen.getByText('Enregistrer les modifications'));

    // Attendez que la requête axios.put soit appelée
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(`http://127.0.0.1:8000/api/utilisateurs/${mockUser.id}`, {
        ...mockUser,
        nom: 'NewName', 
        prenom: 'NewFirstName',
        telephone: '987654321',
        sexe: 'Female',
        nationalite: 'NewNationality',
        role: 'Admin',
        adresse: 'NewAddress',
        ville: 'NewCity',
      });
    });

    // Vérifiez que les modifications sont reflétées dans le rendu
    expect(screen.getByText('Nom: NewName')).toBeInTheDocument();
  });
});
