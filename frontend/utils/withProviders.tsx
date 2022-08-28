export const withProviders = (Component, Providers) => (props) => {
  return (
    <Providers>
      <Component {...props} />
    </Providers>
  );
};
