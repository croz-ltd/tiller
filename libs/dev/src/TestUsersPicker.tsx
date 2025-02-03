/*
 *    Copyright 2025 CROZ d.o.o, the original author or authors.
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

import { cx, useTokens } from "@tiller-ds/theme";

import WidgetContainer from "./WidgetContainer";

type User = {
  username: string;
};

type OnChoose = (username: string) => void;

type TestUsersPickerProps = {
  users: User[];
  chosenUsername?: string;
  onChoose: OnChoose;
};

type TestUserChoiceProps = {
  user: User;
  chosenUsername?: string;
  onChoose: OnChoose;
};

function TestUsersPicker(props: TestUsersPickerProps) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <WidgetContainer letter="U">
      <TestUsersPickerContent {...props} />
    </WidgetContainer>
  );
}

export function TestUsersPickerContent({ users, ...rest }: TestUsersPickerProps) {
  return (
    <div>
      {users.map((user, index) => (
        <TestUserChoice key={index} {...rest} user={user} />
      ))}
    </div>
  );
}

function TestUserChoice({ user, chosenUsername, onChoose }: TestUserChoiceProps) {
  const tokens = useTokens("TestUsersPicker");

  const onClick = () => {
    onChoose(user.username);
  };

  const className = cx({ [tokens.backgroundColor]: chosenUsername === user.username }, "cursor-pointer select-none");

  return (
    <div className={className} onClick={onClick}>
      {user.username}
    </div>
  );
}

export default TestUsersPicker;
