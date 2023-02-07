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
import { BrowserRouter } from "react-router-dom";

import { withDesign } from "storybook-addon-designs";

import { Pagination, Button, Card } from "@tiller-ds/core";
import { FormContainer } from "@tiller-ds/formik-elements";
import { defaultThemeConfig } from "@tiller-ds/theme";
import { Intl } from "@tiller-ds/intl";
import { PageResizer } from "@tiller-ds/selectors";

import { Simple } from "../data-display/DataTable.stories";
import { SimpleType } from "../form-elements/FormLayout.stories";
import { Default } from "../data-display/DescriptionList.stories";

import { getTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./Card.mdx";

export default {
  title: "Component Library/Core/Card",
  component: Card,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source
          .replace(/<CardBody/g, "<Card.Body")
          .replace(/<\/CardBody>/g, "</Card.Body>")
          .replace(/<CardFooter/g, "<Card.Footer")
          .replace(/<\/CardFooter>/g, "</Card.Footer>")
          .replace(/<CardHeaderTitle/g, "<Card.Header.Title")
          .replace(/<\/CardHeaderTitle>/g, "</Card.Header.Title>")
          .replace(/<CardHeaderSubtitle/g, "<Card.Header.Subtitle")
          .replace(/<\/CardHeaderSubtitle>/g, "</Card.Header.Subtitle>")
          .replace(/<CardHeaderActions/g, "<Card.Header.Actions")
          .replace(/<\/CardHeaderActions>/g, "</Card.Header.Actions>")
          .replace(/<CardHeader/g, "<Card.Header")
          .replace(/<\/CardHeader>/g, "</Card.Header>")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getTokensFromSource(correctedSource, "Card");
      },
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
    headerSpacing: {
      name: "Header Spacing",
      control: { type: "boolean" },
    },
    bodySpacing: {
      name: "Body Spacing",
      control: { type: "boolean" },
    },
    bodyContent: {
      name: "Body Content",
      control: { type: "select", options: ["Data Table", "Description List", "Form Layout", "Placeholder"] },
    },
    footer: {
      name: "Footer Type",
      options: ["Actions", "Pagination", "None"],
      control: { type: "radio" },
    },
    status: { name: "Status", options: ["Idle", "Waiting"] },
    cardClassName: { name: "Card Class Name", control: "text" },
    cardHeaderClassName: { name: "Card Header Class Name", control: "text" },
    cardBodyClassName: { name: "Card Body Class Name", control: "text" },
    cardFooterClassName: { name: "Card Footer Class Name", control: "text" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { name: "Tokens", control: "object" },
    children: { control: false },
  },
};

const Placeholder = ({ className }: { className: string }) => (
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

const getCardBodyContent = (bodyContent: string) => {
  if (bodyContent === "Data Table") {
    return (
      <BrowserRouter>
        <Simple />
        <a
          className="flex w-full text-sm justify-center text-primary-dark hover:text-primary p-2"
          href="https://croz-ltd.github.io/tiller/?path=/docs/component-library-data-display-datatable--simple#simple"
          target="_blank"
        >
          See Data Table Story Code
        </a>
      </BrowserRouter>
    );
  }
  if (bodyContent === "Description List") {
    return (
      <BrowserRouter>
        <Default />
        <a
          className="flex w-full text-sm justify-center text-primary-dark hover:text-primary p-2"
          href="https://croz-ltd.github.io/tiller/?path=/docs/component-library-data-display-descriptionlist--default#default"
          target="_blank"
        >
          See Description List Story Code
        </a>
      </BrowserRouter>
    );
  }
  if (bodyContent === "Form Layout") {
    return (
      <FormContainer initialValues={{}} onSubmit={() => {}}>
        <BrowserRouter>
          <SimpleType />
          <a
            className="flex w-full text-sm justify-center text-primary-dark hover:text-primary p-2"
            href="https://croz-ltd.github.io/tiller/?path=/docs/component-library-core-formlayout--simple-type#simple-type"
            target="_blank"
          >
            See Form Layout Story Code
          </a>
        </BrowserRouter>
      </FormContainer>
    );
  }
  return <Placeholder className="h-48" />;
};

export const CardFactory = ({
  header,
  footer,
  title,
  subtitle,
  status,
  headerSpacing,
  bodySpacing,
  isExpanded,
  cardClassName,
  cardHeaderClassName,
  cardBodyClassName,
  cardFooterClassName,
  useTokens,
  tokens,
  bodyContent,
}) => (
  <Card
    isExpanded={isExpanded === true ? true : undefined}
    status={status === "Waiting" ? "waiting" : "idle"}
    className={cardClassName}
    tokens={useTokens && tokens}
  >
    {header === "Default" && (
      <Card.Header removeSpacing={!headerSpacing} className={cardHeaderClassName}>
        <Card.Header.Title>{title}</Card.Header.Title>
        <Card.Header.Subtitle>{subtitle}</Card.Header.Subtitle>
      </Card.Header>
    )}
    {header === "Actions" && (
      <Card.Header removeSpacing={!headerSpacing} className={cardHeaderClassName}>
        <Card.Header.Title>{title}</Card.Header.Title>
        <Card.Header.Subtitle>{subtitle}</Card.Header.Subtitle>
        <Card.Header.Actions>
          <Button>Create</Button>
          <Button>Delete</Button>
        </Card.Header.Actions>
      </Card.Header>
    )}
    <Card.Body removeSpacing={!bodySpacing} className={cardBodyClassName}>
      {getCardBodyContent(bodyContent)}
    </Card.Body>
    {footer === "Actions" && (
      <Card.Footer className={cardFooterClassName}>
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
      <Card.Footer className={cardFooterClassName} tokens={useTokens && tokens}>
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-between">
          <PageResizer pageSize={10} pageSizes={[5, 10, 15]} totalElements={20} onPageSizeChange={() => {}} />
          <Pagination pageNumber={0} pageSize={10} totalElements={20} onPageChange={() => {}} />
        </div>
      </Card.Footer>
    )}
  </Card>
);

CardFactory.args = {
  title: "Title",
  subtitle: "Subtitle",
  header: "Default",
  isExpanded: true,
  bodyContent: "Data Table",
  footer: "Actions",
  status: "Idle",
  headerSpacing: true,
  bodySpacing: true,
  cardClassName: "",
  cardHeaderClassName: "",
  cardBodyClassName: "",
  cardFooterClassName: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["Card"],
};

CardFactory.parameters = {
  controls: {
    expanded: false,
  },
};

CardFactory.decorators = showFactoryDecorator();

export const Basic = () => (
  <>
    <Card>
      <Card.Body>
        <Placeholder className="h-48" />
      </Card.Body>
    </Card>
  </>
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

const HideControls = {
  title: { control: { disable: true } },
  subtitle: { control: { disable: true } },
  header: { control: { disable: true } },
  footer: { control: { disable: true } },
  status: { control: { disable: true } },
  isExpanded: { control: { disable: true } },
  bodySpacing: { control: { disable: true } },
  headerSpacing: { control: { disable: true } },
  bodyContent: { control: { disable: true } },
  cardClassName: { control: { disable: true } },
  cardHeaderClassName: { control: { disable: true } },
  cardBodyClassName: { control: { disable: true } },
  cardFooterClassName: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  tokens: { control: { disable: true } },
};

Basic.argTypes = HideControls;
WithHeader.argTypes = HideControls;
WithFooter.argTypes = HideControls;
WithHeaderAndFooter.argTypes = HideControls;
Loading.argTypes = HideControls;
