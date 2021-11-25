import axios from "axios";
import { Chunk, ChunksArray } from "../types/chunk";

const BASE_URL: string = "https://api.chucknorris.io/jokes";

const fetchRandomChunks = async (): Promise<Chunk> => {
  try {
    const result = await axios.get(`${BASE_URL}/random`);

    return result.data;
  } catch (error) {
    console.log(error);
    return {
      categories: [],
      created_at: "",
      icon_url: "",
      id: "",
      updated_at: "",
      url: "",
      value: `Error: ${error}`,
    };
  }
};

const fetchChunksCategories = async (): Promise<Array<string>> => {
  try {
    const result = await axios.get(`${BASE_URL}/categories`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const searchChunks = async (query: string): Promise<ChunksArray> => {
  try {
    const result = await axios.get(`${BASE_URL}/search?query=${query}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return {
      result: [],
      total: 0,
    };
  }
};

const addChunkToFavourite = async (
  url: string,
  value: string,
  icon_url: string,
  id: string
): Promise<boolean> => {
  try {
    const email = localStorage.getItem("email");
    if (email && email !== "") {
      const result = await axios.post("http://localhost:3500/api/chunks", {
        email: email,
        url: url,
        value: value,
        icon_url: icon_url,
        id: id,
      });
      if (result.status === 201)
        alert("chunk added successfully to favourites!");
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const removeChunkFromFavourite = async (id: string): Promise<boolean> => {
  try {
    const email = localStorage.getItem("email");
    if (email && email !== "") {
      const result = await axios.delete(
        `http://localhost:3500/api/chunks?email=${email}&id=${id}`
      );
      if (result.status === 200)
        alert("chunk was removed successfully from favourites!");
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getFavouriteChunks = async (): Promise<Array<Chunk>> => {
  try {
    const email = localStorage.getItem("email");
    if (email && email !== "") {
      const result = await axios.get(
        `http://localhost:3500/api/chunks?email=${email}`
      );

      return result.data.chunks;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const isChunkFavourite = async (id: string): Promise<boolean> => {
  try {
    const email = localStorage.getItem("email");
    if (email && email !== "") {
      const result = await axios.post(
        `http://localhost:3500/api/chunks/isFavourite`,
        {
          email,
          id,
        }
      );
      return result.data;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const chunksServices = {
  fetchRandomChunks,
  fetchChunksCategories,
  searchChunks,
  addChunkToFavourite,
  removeChunkFromFavourite,
  getFavouriteChunks,
  isChunkFavourite,
};

export default chunksServices;
