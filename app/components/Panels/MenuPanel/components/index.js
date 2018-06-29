import React from "react";
import { Scrollable, Title } from "~/components/UI";

const MenuPage = ({ title, children, className }) => {
  return (
    <Scrollable className={"MenuPage " + className}>
      <Title size={3} align="center" weight="bold">
        {title}
      </Title>
      {children}
    </Scrollable>
  );
};

export default MenuPage;
