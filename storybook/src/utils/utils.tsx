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

export function getTokensFromSource(source: string, componentName: keyof Theme["component"]) {
  const tokens = Array.of(defaultThemeConfig.component[componentName]);
  const [, output] = source.match(/tokens=\{\{([\s\S]*?)\}\}/) ?? [];
  if (output) {
    // eslint-disable-next-line no-eval
    const usedTokens = eval("({" + output + "})");
    const reduced = getObjectDiff(tokens[0], usedTokens);
    return _.replace(
      source,
      /tokens=\{\{([\s\S]*?)\}\}/,
      `tokens={${JSON.stringify(_.pick(usedTokens, reduced)).replace(/"([^"]+)":/g, "$1:")}}`
    );
  }
  return source;
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
