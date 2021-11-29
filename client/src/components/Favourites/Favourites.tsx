import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import classes from "./Favourites.module.css";
import chunksServices from "../../services/chunks";
import { Chunk } from "../../types/chunk";
import ChunkFactCard from "../ChunkFactCard/ChunkFactCard";

const Favourites = () => {
  let chunksSubscription = true;
  const [chunks, setChunks] = useState<Array<Chunk>>([]);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      chunksServices.getFavouriteChunks().then((result) => {
        if (chunksSubscription) setChunks(result);
      });
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      chunksSubscription = false;
    };
  }, []);

  const updateFavouriteChunks = () => {
    chunksServices.getFavouriteChunks().then((result) => {
      if (chunksSubscription) setChunks(result);
    });
  };

  if (!localStorage.getItem("email")) {
    return <Navigate to="/" />;
  }

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
