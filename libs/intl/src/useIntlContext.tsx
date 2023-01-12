import * as React from "react";

import { IntlContext } from "./IntlProvider";

export function useIntlContext() {
  const context = React.useContext(IntlContext);

  if (!context) {
    throw new Error("useIntlContext must be used within a IntlProvider");
  }

  return context;
}
