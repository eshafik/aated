export interface GetLists {
  data?: [
    {
      id?: string | number;
      name?: string;
      batch_number?: string;
    }
  ];
}

export type SearchQuery = {
  search?: string;
};
