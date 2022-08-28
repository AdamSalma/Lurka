import Api from "../Api";
import { useQuery } from "react-query";

export const useBoardApi = (boardId, options = {}) => {
  return useQuery(
    ["boardApi", boardId],
    async () => Api.fetchBoard(boardId),
    options
  );
};

export default useBoardApi;
