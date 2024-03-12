import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Modifier from './components/Modifier';;

jest.mock('axios');

describe('Modifier Component', () => {
  it('affiche l\'état de chargement initialement', () => {
    render(<Modifier />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('récupère les données de l\'utilisateur et les affiche correctement', async () => {
    const mockUser = { id: 1, nom: 'John', prenom: 'Doe' };
    axios.get.mockResolvedValueOnce({ data: mockUser });

    render(<MemoryRouter><Modifier match={{ params: { id: 1 } }} /></MemoryRouter>);

    await waitFor(() => {
      expect(screen.getByText('Nom: John')).toBeInTheDocument();
      expect(screen.getByText('Prénom: Doe')).toBeInTheDocument();
    });
  });

  it('gère le clic sur le bouton "Modifier" et bascule en mode édition', async () => {
    const mockUser = { id: 1, nom: 'John', prenom: 'Doe' };
    axios.get.mockResolvedValueOnce({ data: mockUser });

    render(<MemoryRouter><Modifier match={{ params: { id: 1 } }} /></MemoryRouter>);

    await waitFor(() => {
      const editButton = screen.getByText('Modifier');
      fireEvent.click(editButton);

      expect(screen.getByLabelText('Nom').value).toBe('John');
      expect(screen.getByLabelText('Prénom').value).toBe('Doe');
    });
  });

  it('gère le changement d\'entrée en mode édition', async () => {
    const mockUser = { id: 1, nom: 'John', prenom: 'Doe' };
    axios.get.mockResolvedValueOnce({ data: mockUser });

    render(<MemoryRouter><Modifier match={{ params: { id: 1 } }} /></MemoryRouter>);

    await waitFor(() => {
      const editButton = screen.getByText('Modifier');
      fireEvent.click(editButton);

      const nomInput = screen.getByLabelText('Nom');
      fireEvent.change(nomInput, { target: { value: 'NouveauNom' } });

      expect(nomInput.value).toBe('NouveauNom');
    });
  });

  it('gère le clic sur le bouton "Enregistrer" et met à jour les données', async () => {
    const mockUser = { id: 1, nom: 'John', prenom: 'Doe' };
    axios.get.mockResolvedValueOnce({ data: mockUser });
    axios.put.mockResolvedValueOnce({ data: { ...mockUser, nom: 'NouveauNom' } });

    render(<MemoryRouter><Modifier match={{ params: { id: 1 } }} /></MemoryRouter>);

    await waitFor(() => {
      const editButton = screen.getByText('Modifier');
      fireEvent.click(editButton);

      const nomInput = screen.getByLabelText('Nom');
      fireEvent.change(nomInput, { target: { value: 'NouveauNom' } });

      const saveButton = screen.getByText('Enregistrer les modifications');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Nom: NouveauNom')).toBeInTheDocument();
    });
  });
});
