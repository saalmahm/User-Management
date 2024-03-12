import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Afficher from "./components/Afficher";

jest.mock("axios");

describe("Afficher Component", () => {
  const mockUser = {
    id: 1,
    nom: "John",
    prenom: "Doe",
    telephone: "123456789",
    sexe: "Male",
    nationalite: "French",
    role: "User",
    adresse: "123 Main St",
    ville: "City",
    photo: "user-photo.jpg",
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockUser });
  });

  it("renders user profile data correctly", async () => {
    render(<Afficher />);
    
    await waitFor(() => {
      expect(screen.getByText("Nom: John")).toBeInTheDocument();
      expect(screen.getByText("Prénom: Doe")).toBeInTheDocument();
      expect(screen.getByText("Telephone: 123456789")).toBeInTheDocument();
      expect(screen.getByText("Sexe: Male")).toBeInTheDocument();
      expect(screen.getByText("Nationalité: French")).toBeInTheDocument();
      expect(screen.getByText("Role: User")).toBeInTheDocument();
      expect(screen.getByText("Adresse: 123 Main St")).toBeInTheDocument();
      expect(screen.getByText("Ville: City")).toBeInTheDocument();
    });
  });

  it("displays loading message while fetching data", async () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {}));

    render(<Afficher />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the data to be fetched
    await waitFor(() => {});

    expect(screen.queryByText("Loading...")).toBeNull();
  });

  // Add more test cases as needed
});
