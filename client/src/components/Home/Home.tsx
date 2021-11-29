/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import chunksServices from "../../services/chunks";
import { Chunk } from "../../types/chunk";
import ChunkFactCard from "../ChunkFactCard/ChunkFactCard";

const Home = () => {
  let chunkSubscription = true;
  let chunksSubscription = true;
  let isSearchSubscription = true;
  const [chunk, setChunk] = useState<Chunk>({
    value: "",
    icon_url: "",
    categories: [],
    created_at: "",
    id: "",
    updated_at: "",
    url: "",
  });
  const [chunks, setChunks] = useState<Array<Chunk>>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  useEffect(() => {
    chunksServices.fetchRandomChunks().then((result) => {
      if (chunkSubscription) setChunk(result);
    });
    return () => {
      chunkSubscription = false;
      chunksSubscription = false;
      isSearchSubscription = false;
    };
  }, []);

  const handleSearchChange = async (
    event: React.FormEvent<HTMLInputElement>
  ): Promise<void> => {
    const searchQuery: string = event.currentTarget.value;
    const MIN_SEARCH_QUERY_LENGTH = 3;
    if (searchQuery.length >= MIN_SEARCH_QUERY_LENGTH) {
      if (isSearchSubscription) setIsSearch(true);
      const searchResult = await chunksServices.searchChunks(searchQuery);
      const chunks = searchResult.result;
      if (chunksSubscription) setChunks(chunks);
    } else {
      if (isSearchSubscription) setIsSearch(false);
      if (chunksSubscription) setChunks([]);
    }
  };

  const newRandomChunk = async () => {
    const chunk = await chunksServices.fetchRandomChunks();
    if (chunkSubscription) setChunk(chunk);
  };

  return (
    <div className={classes.Home}>
      <div className={classes.HomeHeader}>
        {isSearch ? null : (
          <button onClick={newRandomChunk} className={classes.HomeHeaderButton}>
            New One
          </button>
        )}
        <input
          className={classes.HomeHeaderSearchBox}
          type="text"
          placeholder="Type anything to search..."
          onChange={handleSearchChange}
        />
      </div>
      <div className={classes.HomeMain}>
        {isSearch ? (
          chunks.map((chunkItem) => (
            <ChunkFactCard
              key={chunkItem?.id}
              value={chunkItem?.value}
              icon_url={chunkItem?.icon_url}
              id={chunkItem?.id}
              url={chunkItem.url}
            />
          ))
        ) : (
          <ChunkFactCard
            value={chunk?.value}
            icon_url={chunk?.icon_url}
            id={chunk?.id}
            url={chunk?.url}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
