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

import { Button, PageHeading, Typography } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { getTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./PageHeading.mdx";

export default {
  title: "Component Library/Core/PageHeading",
  component: PageHeading,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source
          .replace(/<PageHeadingTitle/g, "<PageHeading.Title")
          .replace(/<\/PageHeadingTitle>/g, "</PageHeading.Title>")
          .replace(/<PageHeadingSubtitle/g, "<PageHeading.Subtitle")
          .replace(/<\/PageHeadingSubtitle>/g, "</PageHeading.Subtitle>")
          .replace(/<PageHeadingMeta/g, "<PageHeading.Meta")
          .replace(/<\/PageHeadingMeta>/g, "</PageHeading.Meta>")
          .replace(/<PageHeadingBreadcrumbs/g, "<PageHeading.Breadcrumbs")
          .replace(/<\/PageHeadingBreadcrumbs>/g, "</PageHeading.Breadcrumbs>")
          .replace(/<PageHeadingBreadcrumb/g, "<PageHeading.Breadcrumb")
          .replace(/<\/PageHeadingBreadcrumb>/g, "</PageHeading.Breadcrumb>")
          .replace(/<PageHeadingActions/g, "<PageHeading.Actions")
          .replace(/<\/PageHeadingActions>/g, "</PageHeading.Actions>")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getTokensFromSource(correctedSource, "PageHeading");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9115%3A11989",
    },
    decorators: [withDesign],
  },
  argTypes: {
    title: { name: "Title", control: "text" },
    subtitle: { name: "Subtitle", control: "text" },
    actions: { name: "Actions", control: "boolean" },
    breadcrumbs: { name: "Breadcrumbs", control: "boolean" },
    meta: { name: "Meta", control: "boolean" },
    children: { control: false },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { name: "Tokens", control: "object" },
  },
};

export const PageHeadingFactory = ({ title, subtitle, actions, breadcrumbs, meta, className, useTokens, tokens }) => (
  <PageHeading tokens={useTokens && tokens} className={className}>
    {breadcrumbs && (
      <PageHeading.Breadcrumbs>
        <PageHeading.Breadcrumb>Applications</PageHeading.Breadcrumb>
        <PageHeading.Breadcrumb>Title</PageHeading.Breadcrumb>
      </PageHeading.Breadcrumbs>
    )}
    {title && <PageHeading.Title>{title}</PageHeading.Title>}
    {subtitle && <PageHeading.Subtitle>{subtitle}</PageHeading.Subtitle>}
    {meta && (
      <PageHeading.Meta>
        <Typography icon={<Icon type="info" />}>Meta</Typography>
      </PageHeading.Meta>
    )}
    {actions && (
      <PageHeading.Actions>
        <Button variant="outlined" color="white">
          Edit
        </Button>
        <Button variant="filled">Publish</Button>
      </PageHeading.Actions>
    )}
  </PageHeading>
);

PageHeadingFactory.args = {
  title: "Title",
  subtitle: "Subtitle",
  actions: true,
  breadcrumbs: false,
  meta: false,
  className: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["PageHeading"],
};

PageHeadingFactory.parameters = {
  controls: {
    expanded: false,
  },
};

PageHeadingFactory.decorators = showFactoryDecorator();

export const Simple = () => (
  <PageHeading>
    <PageHeading.Title>Title</PageHeading.Title>
  </PageHeading>
);

export const WithActions = () => (
  <PageHeading>
    <PageHeading.Title>Title</PageHeading.Title>
    <PageHeading.Actions>
      <Button variant="outlined" color="white">
        Edit
      </Button>
      <Button variant="filled">Publish</Button>
    </PageHeading.Actions>
  </PageHeading>
);

export const WithSubtitle = () => (
  <PageHeading>
    <PageHeading.Title>Title</PageHeading.Title>
    <PageHeading.Subtitle>Subtitle</PageHeading.Subtitle>
  </PageHeading>
);

export const WithSubtitleAndActions = () => (
  <PageHeading>
    <PageHeading.Title>Title</PageHeading.Title>
    <PageHeading.Subtitle>Subtitle</PageHeading.Subtitle>
    <PageHeading.Actions>
      <Button variant="outlined" color="white">
        Edit
      </Button>
      <Button variant="filled">Publish</Button>
    </PageHeading.Actions>
  </PageHeading>
);

export const WithBreadcrumbs = () => (
  <PageHeading>
    <PageHeading.Breadcrumbs>
      <PageHeading.Breadcrumb>Applications</PageHeading.Breadcrumb>
      <PageHeading.Breadcrumb>Title</PageHeading.Breadcrumb>
    </PageHeading.Breadcrumbs>
    <PageHeading.Title>Title</PageHeading.Title>
  </PageHeading>
);

export const WithBreadcrumbsAndActions = () => (
  <PageHeading>
    <PageHeading.Breadcrumbs>
      <PageHeading.Breadcrumb>Applications</PageHeading.Breadcrumb>
      <PageHeading.Breadcrumb>Title</PageHeading.Breadcrumb>
    </PageHeading.Breadcrumbs>
    <PageHeading.Title>Title</PageHeading.Title>
    <PageHeading.Actions>
      <Button variant="outlined" color="white">
        Edit
      </Button>
      <Button variant="filled">Publish</Button>
    </PageHeading.Actions>
  </PageHeading>
);

export const WithMeta = () => (
  <PageHeading>
    <PageHeading.Title>Title</PageHeading.Title>
    <PageHeading.Meta>
      <Typography icon={<Icon type="envelope-simple" variant="fill" />}>Text</Typography>
      <Typography icon={<Icon type="envelope-simple" variant="fill" />}>Text</Typography>
      <Typography icon={<Icon type="envelope-simple" variant="fill" />}>Text</Typography>
    </PageHeading.Meta>
  </PageHeading>
);

export const WithMetaAndActions = () => (
  <PageHeading>
    <PageHeading.Title>Title</PageHeading.Title>
    <PageHeading.Meta>
      <Typography icon={<Icon type="envelope-simple" variant="fill" />}>Text</Typography>
      <Typography icon={<Icon type="envelope-simple" variant="fill" />}>Text</Typography>
      <Typography icon={<Icon type="envelope-simple" variant="fill" />}>Text</Typography>
    </PageHeading.Meta>
    <PageHeading.Actions>
      <Button variant="outlined" color="white">
        Edit
      </Button>
      <Button variant="filled">Publish</Button>
    </PageHeading.Actions>
  </PageHeading>
);

const HideControls = {
  title: { control: { disable: true } },
  subtitle: { control: { disable: true } },
  actions: { control: { disable: true } },
  breadcrumbs: { control: { disable: true } },
  meta: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  tokens: { control: { disable: true } },
};

Simple.argTypes = HideControls;
WithActions.argTypes = HideControls;
WithSubtitle.argTypes = HideControls;
WithSubtitleAndActions.argTypes = HideControls;
WithBreadcrumbs.argTypes = HideControls;
WithBreadcrumbsAndActions.argTypes = HideControls;
WithMeta.argTypes = HideControls;
WithMetaAndActions.argTypes = HideControls;
