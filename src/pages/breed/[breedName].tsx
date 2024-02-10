import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { fetchDogBreedImages } from "api/dogsApi";
import Link from "next/link";
import { ImageEffect } from "components/ImageEffect";

const BreedPage = () => {
  const router = useRouter();
  const breedName =
    typeof router.query.breedName === "string"
      ? router.query.breedName
      : router.query.breedName?.[0] ?? "";
  const [breedImages, setBreedImages] = useState<string[]>([]);
  const [displayCount, setDisplayCount] = useState(3);

  const handleFetchDogBreedImages = useCallback((breedName: string) => {
    /**
     * Fetches dog breed images by breedName. On error "Breed not found", retries with the first part of the breed name.
     */
    fetchDogBreedImages(breedName)
      .then((data) => {
        setBreedImages(data.message);
      })
      .catch((error) => {
        if (
          error.response.data.message ===
          "Breed not found (master breed does not exist)"
        ) {
          const firstPartOfBreedName = breedName.split("-")[0];
          handleFetchDogBreedImages(firstPartOfBreedName);
          setBreedImages([]);
        } else {
          console.error("Failed to fetch breed images:", error);
          setBreedImages([]);
        }
      });
  }, []);

  useEffect(() => {
    /**
     * Invokes handleFetchDogBreedImages with the breedName from the URL query.
     * Ensures breedName is a string and non-empty before fetching images.
     */
    if (breedName) {
      handleFetchDogBreedImages(breedName);
    }
  }, [breedName, handleFetchDogBreedImages]);

  const showMoreAvailable = displayCount < breedImages.length;

  const handleShowMore = () => {
    /**
     * Increases the display count by 3, up to the total number of breed images, to show more images.
     */
    setDisplayCount((prevCount) => Math.min(prevCount + 3, breedImages.length));
  };

  return (
    <div className="p-6 min-h-screen text-center dark:bg-gray-800 dark:text-white ">
      <div className="flex items-center justify- w-full p-5 font-medium border rounded-t-xl dark:bg-gray-700 dark:border-gray-700">
        <Link
          href="/"
          className="text-sm px-5 py-2.5 focus:outline-none border dark:border-gray-500 rounded-lg dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:border-white"
        >
          Back
        </Link>
        <h1 className="text-transparent w-full text-3xl font-large bg-clip-text dark:text-white">
          {breedName}
        </h1>{" "}
      </div>
      <div className="border border-t-none dark:border-gray-700 dark:border-b-gray-700 rounded-b-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 border-t-0">
          {breedImages.slice(0, displayCount).map((breedImage, index) => (
            <div key={index}>
              <ImageEffect src={breedImage} width={300} height={300} />
            </div>
          ))}
        </div>
      </div>

      {showMoreAvailable && (
        <button
          className="relative inline-flex items-center mt-5 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:outline-none dark:focus:ring-red-400"
          onClick={handleShowMore}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
            Show more
          </span>
        </button>
      )}
    </div>
  );
};

export default BreedPage;
