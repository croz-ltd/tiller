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

import { withDesign } from "storybook-addon-designs";

import { Pagination, useLocalPagination } from "@tiller-ds/core";
import { items } from "../utils";

import mdx from "./Pagination.mdx";

export default {
  title: "Component Library/Core/Pagination",
  component: Pagination,
  parameters: {
    docs: {
      source: { type: "code" },
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9679%3A13302",
    },
    decorators: [withDesign],
  },
  decorators: [
    // eslint-disable-next-line react/display-name
    (Story) => (
      <div className="flex flex-col m-4 items-start w-fit">
        <Story />
      </div>
    ),
  ],
};

export const Simple = () => <Pagination pageSize={5} pageNumber={0} totalElements={20} onPageChange={() => {}} />;

export const WithItems = () => {
  const [paginationState, paginationHook] = useLocalPagination(items, 5);

  return (
    <>
      <div className={`flex space-x-2 p-2 rounded-md w-fit`}>
        {paginationState.pageData.map((item) => `${item.name} ${item.surname}`).join(", ")}
      </div>
      <div className="flex mt-4 w-fit">
        <Pagination {...paginationState} {...paginationHook} />
      </div>
    </>
  );
};

export const Custom = () => {
  const [paginationState, paginationHook] = useLocalPagination(items, 5);

  return (
    <>
      <div className={`flex space-x-2 p-2 rounded-md w-fit`}>
        {paginationState.pageData.map((item) => `${item.name} ${item.surname}`).join(", ")}
      </div>
      <div className="flex mt-4 w-fit">
        <Pagination {...paginationState} {...paginationHook}>
          {(pageInfo) => (
            <span>
              <span className="font-medium">{pageInfo.from}</span>-<span className="font-medium">{pageInfo.to}</span>{" "}
              from <span className="font-medium">{pageInfo.totalElements}</span>
            </span>
          )}
        </Pagination>
      </div>
    </>
  );
};

export const TotalSameAsPageSize = () => {
  const [paginationState, paginationHook] = useLocalPagination(items.slice(0, 5), 5);

  return (
    <>
      <div className={`flex space-x-2 p-2 rounded-md w-fit`}>
        {paginationState.pageData.map((item) => `${item.name} ${item.surname}`).join(", ")}
      </div>
      <div className="flex mt-4 w-fit">
        <Pagination {...paginationState} {...paginationHook} />
      </div>
    </>
  );
};

export const TwoPages = () => {
  const [paginationState, paginationHook] = useLocalPagination(items.slice(0, 10), 5);

  return (
    <>
      <div className={`flex space-x-2 p-2 rounded-md w-fit`}>
        {paginationState.pageData.map((item) => `${item.name} ${item.surname}`).join(", ")}
      </div>
      <div className="flex mt-4 w-fit">
        <Pagination {...paginationState} {...paginationHook} />
      </div>
    </>
  );
};

export const MoreThanSixPages = () => {
  const [paginationState, paginationHook] = useLocalPagination(items.concat(items).concat(items), 5);

  return (
    <>
      <div className={`flex space-x-2 p-2 rounded-md w-fit`}>
        {paginationState.pageData.map((item) => `${item.name} ${item.surname}`).join(", ")}
      </div>
      <div className="flex mt-4 w-fit">
        <Pagination {...paginationState} {...paginationHook} />
      </div>
    </>
  );
};

export const WithCustomPagerCalculator = () => {
  const [paginationState, paginationHook] = useLocalPagination(items, 5);

  const customPagerCalculator = (pageNumber, pageCount) => {
    return ["dots", pageNumber, "dots"];
  };

  return (
    <>
      <div className={`flex space-x-2 p-2 rounded-md w-fit`}>
        {paginationState.pageData.map((item) => `${item.name} ${item.surname}`).join(", ")}
      </div>
      <div className="flex mt-4 w-fit">
        <Pagination {...paginationState} {...paginationHook} pagerCalculator={customPagerCalculator} />
      </div>
    </>
  );
};
