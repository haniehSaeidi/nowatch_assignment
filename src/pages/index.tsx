import { useState } from "react";
import { fetchRandomDog } from "api/dogsApi";
import { IconSpinner, IconRightArrow } from "assets/svg";
import { useDog } from "store/useDog";
import { ImageEffect } from "components/ImageEffect";

const styles = {
  imageWrapper: {
    height: "445px",
  },
};

const HomePage = () => {
  const {
    selectedDogImage: randomDogImage,
    setSelectedDogImage: setRandomDogImage,
    selectedDogBreed: randomDogName,
    setSelectedDogBreed: setRandomDogName,
  } = useDog();
  const [dogImage, setDogImage] = useState(randomDogImage);
  const [dogBreed, setDogBreed] = useState(randomDogName);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateDog = () => {
    /**
     * Fetches a random dog image and breed information. Sets loading state, updates dog image and breed on success.
     */
    setIsLoading(true);
    fetchRandomDog()
      .then((data) => {
        const breed = getBreed(data.message);
        setIsLoading(false);
        setDogImage(data.message);
        setDogBreed(breed);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching random dog:", error);
      });
  };

  const handleRedirectToDogImages = () => {
    /**
     * Prepares data for redirection to the home page by storing the current dog image and breed.
     */
    setRandomDogImage(dogImage);
    setRandomDogName(dogBreed);
  };

  const getBreed = (url: string) => {
    const parts = url.split("/");
    return parts[parts.indexOf("breeds") + 1];
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen dark:bg-gray-800 dark:text-white ">
      <div className="block max-w-lg p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h6 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Discover a new furry friend with just a click!
        </h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Discover a new furry friend with just a click! Press the button below
          to generate a random dog picture.
        </p>
        {!!dogImage && (
          <div
            style={styles.imageWrapper}
            className="flex-col items-center my-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <ImageEffect src={dogImage} width={300} height={300} />
            <div className="w-full p-3">
              <h5 className="mb-5 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {dogBreed}
              </h5>
              <a
                href={`/breed/${dogBreed}`}
                onClick={() => handleRedirectToDogImages()}
                className="inline-flex w-full items-center justify-center p-5 text-base rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700"
              >
                <span>Get more images</span>
                <IconRightArrow />
              </a>
            </div>
          </div>
        )}
        <button
          type="button"
          className="w-full flex justify-center items-center gap-1 bg-gradient-to-br text-center from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg py-2.5 mt-2"
          onClick={handleGenerateDog}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <IconSpinner /> Loading...
            </>
          ) : (
            "Generate new dog"
          )}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
