import React from "react";
import cx from "classnames";

import { DynamicHeader } from "~/components/Header/containers";

const HeaderView = ({ className }) => {
  return (
    <section className={cx("View HeaderView", className)}>
      {/*<Dashboard />*/}
      <DynamicHeader/>
    </section>
  );
};

HeaderView.displayName = "HeaderView";

export default HeaderView;
