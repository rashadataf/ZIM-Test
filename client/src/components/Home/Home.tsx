import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import chunksServices from "../../services/fetchChunks";
import { Chunk } from "../../types/chunk";
import ChunkFactCard from "../ChunkFactCard/ChunkFactCard";

const Home = () => {
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
    chunksServices.fetchRandomChunks().then((result) => setChunk(result));
  }, []);

  const handleSearchChange = async (
    event: React.FormEvent<HTMLInputElement>
  ): Promise<void> => {
    const searchQuery: string = event.currentTarget.value;
    const MIN_SEARCH_QUERY_LENGTH = 3;
    if (searchQuery.length >= MIN_SEARCH_QUERY_LENGTH) {
      setIsSearch(true);
      const searchResult = await chunksServices.searchChunks(searchQuery);
      const chunks = searchResult.result;
      setChunks(chunks);
    } else {
      setIsSearch(false);
      setChunks([]);
    }
  };

  return (
    <div className={classes.Home}>
      <div className={classes.HomeHeader}>
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
