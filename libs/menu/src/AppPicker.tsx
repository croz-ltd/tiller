/*
 *    Copyright 2023 CROZ d.o.o, the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import * as React from "react";

import { Menu, MenuButton, MenuList, MenuItem } from "@reach/menu-button";

import { cx, TokenProps, useTokens } from "@tiller-ds/theme";

type Application = {
  name: string;
  path: string;
} & TokenProps<"AppPicker">;

type AppPickerProps = {
  /**
   * Defines an array of applications, each one identified with a name and a
   * path (which determines where the site takes you to on click).
   */
  applications?: Application[];

  /**
   * Default application to be displayed on component render.
   */
  currentApplication?: string;

  /**
   * App Picker content (not exclusively text).
   */
  children: React.ReactNode;
};

type AppPickerButtonProps = {
  children: React.ReactNode;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ApplicationListProps = {
  applications: Application[];
} & TokenProps<"AppPicker">;

type ApplicationProps = Application;

export default function AppPicker({ applications = [], currentApplication = "", children }: AppPickerProps) {
  const filteredApplications = applications.filter((application) => application.path !== currentApplication);

  if (filteredApplications.length === 0) {
    return <>{children}</>;
  }

  return (
    <Menu>
      <MenuButton as={AppPickerButton}>{children}</MenuButton>
      <MenuList portal={true}>
        <ApplicationList applications={filteredApplications} />
      </MenuList>
    </Menu>
  );
}

const AppPickerButton = React.forwardRef(
  ({ children, ...props }: AppPickerButtonProps, ref: React.Ref<HTMLButtonElement>) => (
    <button className="block" ref={ref} {...props}>
      {children}
    </button>
  )
);

function ApplicationList({ applications, ...props }: ApplicationListProps) {
  const tokens = useTokens("AppPicker", props.tokens);

  const outerContainerClassName = cx(
    tokens.ApplicationList.outerContainer.width,
    tokens.ApplicationList.outerContainer.margin,
    tokens.ApplicationList.outerContainer.borderRadius,
    tokens.ApplicationList.outerContainer.boxShadow
  );

  const innerContainerClassName = cx(
    tokens.ApplicationList.innerContainer.borderRadius,
    tokens.ApplicationList.innerContainer.backgroundColor,
    tokens.ApplicationList.innerContainer.boxShadow
  );

  return (
    <div className={outerContainerClassName}>
      <div className={innerContainerClassName}>
        <div className={tokens.ApplicationList.padding}>
          {applications.map((application, key) => (
            <Application key={key} {...application} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Application({ name, path, ...props }: ApplicationProps) {
  const tokens = useTokens("AppPicker", props.tokens);

  const applicationClassName = cx(
    tokens.Application.master,
    tokens.Application.padding,
    tokens.Application.fontSize,
    tokens.Application.lineHeight,
    tokens.Application.color
  );

  const onSelect = () => {
    window.history.pushState({}, name, path);
  };

  return (
    <MenuItem {...props} onSelect={onSelect}>
      <div className={applicationClassName}>{name}</div>
    </MenuItem>
  );
}
