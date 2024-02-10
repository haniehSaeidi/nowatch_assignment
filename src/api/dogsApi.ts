import { getRandomDog, getDogBreedImages } from "services/apiServices";

export const fetchRandomDog = async () => {
  return getRandomDog()
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      console.error("Error fetching random dog:", error);
      throw error;
    });
};

export const fetchDogBreedImages = async (breedName: string) => {
  return getDogBreedImages(breedName)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      console.error("Error fetching random dog:", error);
      throw error;
    });
};
