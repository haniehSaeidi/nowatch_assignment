import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DogState {
  selectedDogImage: string;
  selectedDogBreed: string;
  setSelectedDogImage: (selectedDogImage: string) => void;
  setSelectedDogBreed: (selectedDogName: string) => void;
}

export const useDog = create<DogState>()(
  persist(
    (set) => ({
      selectedDogImage: "",
      selectedDogBreed: "",
      setSelectedDogImage: (randomDogImage) =>
        set(() => ({ selectedDogImage: randomDogImage })),
      setSelectedDogBreed: (randomDogName) =>
        set(() => ({ selectedDogBreed: randomDogName })),
    }),
    {
      name: "selected dog",
    }
  )
);
