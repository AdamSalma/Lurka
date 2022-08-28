import styled from "@emotion/styled";
import theme from "frontend/theme";

const Header = () => {
  return <HeaderContainer>Header</HeaderContainer>;
};

const HeaderContainer = styled.div`
  height: 128px;
  background: ${theme.greyDarkest};
`;

export default Header;
