import axios from "axios";

const baseUrl = "https://dog.ceo/api";

export const getRandomDog = () => {
  return axios.get(`${baseUrl}/breeds/image/random`);
};

export const getDogBreedImages = (breedName: string) => {
  return axios.get(`${baseUrl}/breed/${breedName}/images`);
};
