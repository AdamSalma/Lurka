import useBoardListApi from "./useBoardListApi";

export const useIsAppInitialising = () => {
  const boardListQuery = useBoardListApi();

  const isLoading = boardListQuery.isLoading;
  const statusText = "Setting up boards";

  return {
    isLoading,
    statusText,
  } as const;
};

export default useIsAppInitialising;
