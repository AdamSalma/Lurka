import Api from "../Api";
import { useQuery } from "react-query";

export const useThreadApi = (boardId, threadId, options = {}) => {
  return useQuery(
    ["threadApi", boardId, threadId],
    async () => Api.fetchThread(boardId, threadId),
    options
  );
};

export default useThreadApi;
