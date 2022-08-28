import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { GlobalState, GlobalStateProvider } from "./GlobalState";
import Header from "./Header/Header";
import Board from "./Board/Board";
import Thread from "./Thread/Thread";
import Spinner, { AbsoluteCenteredSpinner } from "./components/Spinner";
import useIsAppInitialising from "./api/hooks/useIsAppInitialising";
import { LurkaQueryProvider } from "./api/client";
import { withProviders } from "./utils/withProviders";
import { FadeInAnimation } from "./components/Animations";

const initialGlobalState: GlobalState = {
  currentBoardId: null,
  currentThreadId: null,
  currentTheme: "dark",
  clearStateOnNextStart: false,
};

const App = () => {
  const { isLoading, statusText } = useIsAppInitialising();

  if (isLoading) {
    return (
      <>
        <AbsoluteCenteredSpinner>
          <h4>{statusText}</h4>
        </AbsoluteCenteredSpinner>
      </>
    );
  }

  return (
    <FadeInAnimation delay={500}>
      <Header />
      <Board />
      <Thread />
    </FadeInAnimation>
  );
};

const Providers = ({ children }) => (
  <>
    <LurkaQueryProvider>
      <GlobalStateProvider initialState={initialGlobalState}>
        <PageContainer>{children}</PageContainer>
      </GlobalStateProvider>
    </LurkaQueryProvider>
  </>
);

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
`;

export default withProviders(App, Providers);
