export interface Chunk {
  categories: Array<any>;
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

export interface ChunksArray {
  result: Array<Chunk>;
  total: number;
}
