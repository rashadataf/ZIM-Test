import React, { useState, useEffect } from "react";
import classes from "./Favourites.module.css";
import chunksServices from "../../services/fetchChunks";
import { Chunk } from "../../types/chunk";
import ChunkFactCard from "../ChunkFactCard/ChunkFactCard";

const Favourites = () => {
  const [chunks, setChunks] = useState<Array<Chunk>>([]);

  useEffect(() => {
    chunksServices.getFavouriteChunks().then((result) => setChunks(result));
  }, []);

  const updateFavouriteChunks = () => {
    chunksServices.getFavouriteChunks().then((result) => setChunks(result));
  };

  return (
    <div className={classes.Favourites}>
      <div className={classes.FavouritesMain}>
        {chunks.length > 0 ? (
          chunks.map((chunkItem) => (
            <ChunkFactCard
              key={chunkItem?.id}
              value={chunkItem?.value}
              icon_url={chunkItem?.icon_url}
              id={chunkItem?.id}
              url={chunkItem.url}
              isFavourite={true}
              updateFavouriteChunks={updateFavouriteChunks}
            />
          ))
        ) : (
          <div className={classes.NoFavorites}>There is no favorites yet!!</div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
