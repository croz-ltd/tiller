import * as React from "react";

import { IntlContext, IntlContextType } from "./IntlProvider";

export function useIntlContext(returnDefault?: boolean) {
  const context = React.useContext(IntlContext);

  if (!context && !returnDefault) {
    return undefined;
  }

  if (!context && returnDefault) {
    return { lang: "en" } as IntlContextType;
  }

  return context;
}
