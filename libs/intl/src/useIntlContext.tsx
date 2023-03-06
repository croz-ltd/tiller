import * as React from "react";

import { IntlContext, IntlContextType } from "./IntlProvider";

export function useIntlContext() {
  const context = React.useContext(IntlContext);

  if (!context) {
    return null as unknown as IntlContextType;
  }

  return context;
}
