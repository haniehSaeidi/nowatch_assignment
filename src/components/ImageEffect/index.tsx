import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ImageEffect.module.css";

interface ImageProps {
  width: number;
  height: number;
  src: string;
}

export const ImageEffect = ({ width, height, src }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    /** set isLoaded true in initial state */
    setIsLoaded(true);
  }, []);

  return (
    <div className={isLoaded ? styles.fadeInImage : ""}>
      <Image
        className={`rounded-lg max-w-full ${styles.dogImage}`}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        src={src}
        alt="dog"
      />
    </div>
  );
};
