import Repository from "./repository";

export default interface RepositoriesResponse {
  items: Repository[];
  total_count: number;
};
