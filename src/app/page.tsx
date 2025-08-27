"use client";

import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { Random } from "unsplash-js/dist/methods/photos/types";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ?? "",
});

export default function Home() {
  const [photos, setPhotos] = useState<Random[]>([]);
  useEffect(() => {
    unsplash.photos.getRandom({ count: 10 }).then((result) => {
      const photos: Random[] = [];

      if (!result?.response) {
        return;
      }

      if (Array.isArray(result.response)) {
        for (const photo of result?.response) {
          photos.push(photo);
        }
      } else {
        photos.push(result?.response);
      }

      setPhotos(photos);
    });
  }, []);
  return (
    <main className="flex flex-wrap gap-4">
      {photos.map((photo) => (
        <img
          className="object-cover"
          key={photo.id}
          width={100}
          height={100}
          src={photo.urls.small}
          alt={photo.alt_description ?? ""}
        />
      ))}
    </main>
  );
}
