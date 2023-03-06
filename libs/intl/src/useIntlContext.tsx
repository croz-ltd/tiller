import * as React from "react";

import { IntlContext } from "./IntlProvider";

export function useIntlContext() {
  const context = React.useContext(IntlContext);

  if (!context) {
    return undefined;
  }

  return context;
}
