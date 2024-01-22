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

import { PageResizer } from "@tiller-ds/selectors";
import mdx from "./PageResizer.mdx";
import { Pagination, useLocalPagination } from "@tiller-ds/core";
import { beautifySource, items } from "../utils";

export default {
  title: "Component Library/Selectors/PageResizer",
  component: PageResizer,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "PageResizer"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9750%3A14460",
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

export const Simple = () => (
  <PageResizer pageSize={10} pageSizes={[3, 5, 10]} totalElements={20} onPageSizeChange={() => {}} />
);

export const WithItems = () => {
  // incl-code
  const [pageSize, setPageSize] = React.useState(5);

  return (
    <>
      <div className={`flex space-x-2 p-2 rounded-md w-fit`}>
        {items
          .slice(0, pageSize)
          .map((item) => `${item.name} ${item.surname}`)
          .join(", ")}
      </div>
      <div className="flex flex-col space-y-4 mt-4 w-fit">
        <PageResizer pageSize={pageSize} pageSizes={[3, 5, 10]} totalElements={20} onPageSizeChange={setPageSize} />
      </div>
    </>
  );
};

export const Custom = () => {
  // incl-code
  const [pageSize, setPageSize] = React.useState(5);

  return (
    <>
      <div className={`flex space-x-2 p-2 rounded-md w-fit`}>
        {items
          .slice(0, pageSize)
          .map((item) => `${item.name} ${item.surname}`)
          .join(", ")}
      </div>
      <div className="flex flex-col space-y-4 mt-4 w-fit">
        <PageResizer pageSize={pageSize} pageSizes={[3, 5, 10]} totalElements={20} onPageSizeChange={setPageSize}>
          {(selector) => (
            <p className="text-sm flex items-center leading-5 text-gray-700">Shown results per page: {selector}</p>
          )}
        </PageResizer>
      </div>
    </>
  );
};

export const WithPagination = () => {
  // incl-code
  const [pageSize, setPageSize] = React.useState(5);
  const [paginationState, paginationHook] = useLocalPagination(items, pageSize);

  return (
    <>
      <div className={`flex space-x-2 p-2 rounded-md w-fit`}>
        {paginationState.pageData.map((item) => `${item.name} ${item.surname}`).join(", ")}
      </div>
      <div className="flex flex-col space-y-4 mt-4 w-fit">
        <Pagination {...paginationState} {...paginationHook} />
        <PageResizer {...paginationState} pageSizes={[3, 5, 10]} onPageSizeChange={setPageSize} />
      </div>
    </>
  );
};
