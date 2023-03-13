import * as React from "react";

import _ from "lodash";

import { defaultThemeConfig, Theme } from "@tiller-ds/theme";

export function getObjectDiff(obj1, obj2) {
  return Object.keys(obj1).reduce((result, key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj2.hasOwnProperty(key)) {
      result.push(key);
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(obj2));
}

type TokensConfig = {
  [K in keyof Theme["component"]]?: string;
};
export function getChangedTokensFromSource(source: string, tokensConfig: TokensConfig | keyof Theme["component"]) {
  const componentDefaultTokens: Record<string, unknown>[] = [];

  let finalTokensConfig = tokensConfig;
  if (typeof tokensConfig === "string") {
    finalTokensConfig = { [tokensConfig]: "tokens" };
  }
  Object.keys(finalTokensConfig).forEach((key) => {
    componentDefaultTokens.push(defaultThemeConfig.component[key]);
  });

  let correctSource = source;
  Object.values(finalTokensConfig).forEach((tokenVariable, index) => {
    const findTokens = new RegExp(`${tokenVariable}=\{\{([\\s\\S]*?)\}\}`);
    const [, output] = source.match(findTokens) ?? [];
    if (output) {
      // eslint-disable-next-line no-eval
      const tokens = eval("({" + output + "})");
      const reduced = getObjectDiff(componentDefaultTokens[index], tokens);
      correctSource = _.replace(
        correctSource,
        findTokens,
        `${tokenVariable}={${JSON.stringify(_.pick(tokens, reduced)).replace(/"([^"]+)":/g, "$1:")}}`,
      );
    }
  });
  return correctSource;
}

export function showFactoryDecorator(flex = false) {
  return [
    (storyFn, { viewMode }) => {
      if (viewMode === "story") {
        return (
          <div className="flex flex-col space-y-10">
            <div className={flex ? "flex" : undefined}>{storyFn()}</div>
            <hr />
            <div className="text-gray-800 text-sm">
              <span className="font-semibold">
                Note for changing the <b>Class Name</b> or <b>Tokens</b> values:
              </span>
              <li>not all styles will have live preview due to limited CSS support</li>
              <li>these styles will be visible when you copy the component's code output into your project</li>
              <br />
            </div>
          </div>
        );
      }
      return storyFn();
    },
  ];
}

export function beautifySource(source) {
  const correctedSource = source
    .replace(/{name}/g, '"test"')
    .replace(/{<Intl name="label" \/>}/g, '"Test label"')
    .replace(/{<Intl name="help" \/>}/g, '"Test help content"')
    .replace(/{<Intl name="tooltip" \/>}/g, '"Test tooltip content"')
    .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
  if (correctedSource.indexOf("incl-code") === -1) {
    return correctedSource.substring(correctedSource.indexOf("<"), correctedSource.lastIndexOf(">") + 1);
  }
  return correctedSource.substring(
    correctedSource.indexOf("incl-code") + "incl-code".length,
    correctedSource.lastIndexOf(";") + 1,
  );
}
