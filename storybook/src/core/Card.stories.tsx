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
import { action } from "@storybook/addon-actions";

import { Pagination, Button, Card } from "@tiller-ds/core";
import { Intl } from "@tiller-ds/intl";
import { PageResizer } from "@tiller-ds/selectors";

import mdx from "./Card.mdx";

export default {
  title: "Component Library/Core/Card",
  component: Card,
  parameters: {
    docs: {
      page: mdx,
    },
    playroom: {
      code: "<Card>Test Card</Card>",
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A38182",
    },
    decorators: [withDesign],
  },
  argTypes: {
    title: {
      name: "Title",
      control: "text",
    },
    subtitle: {
      name: "Subtitle",
      control: "text",
    },
    header: {
      name: "Header Type",
      options: ["Default", "Actions", "None"],
      control: { type: "radio" },
    },
    isExpanded: {
      name: "Expander",
      control: { type: "boolean" },
    },
    spacing: {
      name: "Body Spacing",
      control: { type: "boolean" },
    },
    footer: {
      name: "Footer Type",
      options: ["Actions", "Pagination", "None"],
      control: { type: "radio" },
    },
    status: {
      options: ["Idle", "Waiting"],
    },
    tokens: { control: false },
  },
};

const onPageChange = action("pagination-onPageChange");
const onPageSizeChange = action("pagination-onPageSizeChange");

const Placeholder = ({ className }: { className: string }, args) => (
  <svg
    className={`border-2 border-dashed border-gray-300 rounded bg-white w-full ${className} text-gray-200`}
    preserveAspectRatio="none"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 200 200"
  >
    <path vectorEffect="non-scaling-stroke" strokeWidth="2" d="M0 0l200 200M0 200L200 0" />
  </svg>
);

export const CardFactory = ({ header, footer, title, subtitle, status, spacing, isExpanded }) => (
  <Card isExpanded={isExpanded === true ? true : undefined} status={status === "Waiting" ? "waiting" : "idle"}>
    {header === "Default" && (
      <Card.Header>
        <Card.Header.Title>{title}</Card.Header.Title>
        <Card.Header.Subtitle>{subtitle}</Card.Header.Subtitle>
      </Card.Header>
    )}
    {header === "Actions" && (
      <Card.Header>
        <Card.Header.Title>{title}</Card.Header.Title>
        <Card.Header.Subtitle>{subtitle}</Card.Header.Subtitle>
        <Card.Header.Actions>
          <Button>Create</Button>
          <Button>Delete</Button>
        </Card.Header.Actions>
      </Card.Header>
    )}
    <Card.Body removeSpacing={!spacing}>
      <Placeholder className="h-48" />
    </Card.Body>
    {footer === "Actions" && (
      <Card.Footer>
        <div className="flex justify-end">
          <Button variant="outlined" type="reset">
            Cancel
          </Button>
          <Button className="ml-3" type="submit">
            Submit
          </Button>
        </div>
      </Card.Footer>
    )}
    {footer === "Pagination" && (
      <Card.Footer>
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-between">
          <PageResizer pageSize={10} pageSizes={[5, 10, 15]} totalElements={20} onPageSizeChange={onPageSizeChange} />
          <Pagination pageNumber={0} pageSize={10} totalElements={20} onPageChange={onPageChange} />
        </div>
      </Card.Footer>
    )}
  </Card>
);

CardFactory.args = {
  title: "Title",
  subtitle: "Subtitle",
  header: "Default",
  footer: "Actions",
  status: "Idle",
  spacing: true,
  isExpanded: false,
};

export const Basic = () => (
  <Card>
    <Card.Body>
      <Placeholder className="h-48" />
    </Card.Body>
  </Card>
);

export const WithHeader = () => (
  <Card>
    <Card.Header>
      <Card.Header.Title>
        <Intl name="title" />
      </Card.Header.Title>
      <Card.Header.Subtitle>
        <Intl name="subtitle" />
      </Card.Header.Subtitle>
      <Card.Header.Actions>
        <Button>
          <Intl name="create" />
        </Button>
        <Button variant="outlined">
          <Intl name="delete" />
        </Button>
      </Card.Header.Actions>
    </Card.Header>
    <Card.Body>
      <Placeholder className="h-48" />
    </Card.Body>
  </Card>
);

export const WithFooter = () => (
  <Card>
    <Card.Body>
      <Placeholder className="h-48" />
    </Card.Body>
    <Card.Footer>
      <div className="flex justify-end">
        <Button className="mr-3" variant="outlined" type="reset">
          <Intl name="cancel" />
        </Button>
        <Button type="submit">
          <Intl name="submit" />
        </Button>
      </div>
    </Card.Footer>
  </Card>
);

export const WithHeaderAndFooter = () => (
  <Card>
    <Card.Header>
      <Card.Header.Title>
        <Intl name="title" />
      </Card.Header.Title>
      <Card.Header.Subtitle>
        <Intl name="subtitle" />
      </Card.Header.Subtitle>
      <Card.Header.Actions>
        <Button>
          <Intl name="create" />
        </Button>
        <Button>
          <Intl name="delete" />
        </Button>
      </Card.Header.Actions>
    </Card.Header>
    <Card.Body>
      <Placeholder className="h-48" />
    </Card.Body>
    <Card.Footer>
      <div className="flex justify-end">
        <Button className="mr-3" variant="outlined" type="reset">
          <Intl name="cancel" />
        </Button>
        <Button type="submit">
          <Intl name="submit" />
        </Button>
      </div>
    </Card.Footer>
  </Card>
);

export const Loading = () => (
  <Card status="waiting">
    <Card.Header>
      <Placeholder className="h-8" />
    </Card.Header>
    <Card.Body>
      <Placeholder className="h-48" />
    </Card.Body>
    <Card.Footer>
      <Placeholder className="h-8" />
    </Card.Footer>
  </Card>
);

Loading.story = {
  parameters: {
    skipTest: true,
  },
};

CardFactory.parameters = {
  controls: {
    expanded: false,
  },
};

const HideControls = {
  title: { control: { disable: true } },
  subtitle: { control: { disable: true } },
  header: { control: { disable: true } },
  footer: { control: { disable: true } },
  status: { control: { disable: true } },
  spacing: { control: { disable: true } },
  isExpanded: { control: { disable: true } },
};

Basic.argTypes = HideControls;
WithHeader.argTypes = HideControls;
WithFooter.argTypes = HideControls;
WithHeaderAndFooter.argTypes = HideControls;
Loading.argTypes = HideControls;
