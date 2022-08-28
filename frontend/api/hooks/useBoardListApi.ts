import Api from "../Api";
import { useQuery } from "react-query";

export const useBoardListApi = (options = {}) => {
  return useQuery(["boardListApi"], async () => Api.fetchBoardList(), options);
};

export default useBoardListApi;
