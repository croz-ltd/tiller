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
import { beautifySource, items } from "../utils";

import mdx from "./Pagination.mdx";

export default {
  title: "Component Library/Core/Pagination",
  component: Pagination,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "Pagination"),
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
  // incl-code
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
  // incl-code
  const [paginationState, paginationHook] = useLocalPagination(items, 5);

  return (
    <>
      <div className={`flex space-x-2 p-2 rounded-md w-fit`}>
        {paginationState.pageData.map((item) => `${item.name} ${item.surname}`).join(", ")}
      </div>
      <div className="flex mt-4 w-fit">
        <Pagination {...paginationState} {...paginationHook}>
          {(_pageInfo, components) => (
            <span>
              {components.from}-{components.to} from {components.totalElements}
            </span>
          )}
        </Pagination>
      </div>
    </>
  );
};

export const TotalSameAsPageSize = () => {
  // incl-code
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
  // incl-code
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
  // incl-code
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
  // incl-code
  const [paginationState, paginationHook] = useLocalPagination(items, 5);

  const customPagerCalculator = (pageNumber, pageCount) => {
    return [pageNumber !== 1 && "dots", pageNumber, pageNumber !== pageCount && "dots"].filter(
      (value) => value !== false,
    );
  };

  return (
    <>
      <div className="flex space-x-2 p-2 rounded-md w-fit">
        {paginationState.pageData.map((item) => `${item.name} ${item.surname}`).join(", ")}
      </div>
      <div className="flex mt-4 w-fit">
        <Pagination {...paginationState} {...paginationHook} pagerCalculator={customPagerCalculator} />
      </div>
    </>
  );
};
