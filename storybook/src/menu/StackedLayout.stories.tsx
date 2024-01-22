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

import { BrowserRouter as Router } from "react-router-dom";

import { withDesign } from "storybook-addon-designs";

import { Modal, useModal } from "@tiller-ds/alert";
import { Button, PageHeading, Placeholder } from "@tiller-ds/core";
import { FormContainer } from "@tiller-ds/formik-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { StackedLayout, TopNavigation } from "@tiller-ds/menu";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { Simple } from "../data-display/DataTable.stories";
import { Default } from "../data-display/DescriptionList.stories";
import { SimpleType } from "../form-elements/FormLayout.stories";

import { beautifySource, getChangedTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./StackedLayout.mdx";

export default {
  title: "Component Library/Menu/StackedLayout",
  component: StackedLayout,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source
          .replace(/StackedLayoutHeading/g, "StackedLayout.Heading")
          .replace(/StackedLayoutContent/g, "StackedLayout.Content")
          .replace(/TopNavigationNavigation/g, "TopNavigation.Navigation")
          .replace(/TopNavigation.NavigationItem/g, "TopNavigation.Navigation.Item")
          .replace(/TopNavigationDropdown/g, "TopNavigation.Dropdown")
          .replace(/TopNavigationDropdownItem/g, "TopNavigation.Dropdown.Item")
          .replace(/SidebarNavigation.DropdownItem/g, "SidebarNavigation.Dropdown.Item")
          .replace(/SidebarNavigationBottomAction/g, "SidebarNavigation.BottomAction")
          .replace(/SidebarNavigationSubItem/g, "SidebarNavigation.SubItem")
          .replace(/PageHeadingTitle/g, "PageHeading.Title")
          .replace(/PageHeadingSubtitle/g, "PageHeading.Subtitle")
          .replace(/PageHeadingActions/g, "PageHeading.Actions")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getChangedTokensFromSource(beautifySource(correctedSource), "StackedLayout");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9901%3A23656",
    },
    decorators: [withDesign],
  },
  argTypes: {
    isFixed: { name: "Fixed Heading", control: "boolean" },
    containerVariant: { name: "Container Variant", control: "select" },
    background: { name: "Background Color" },
    pageTitle: { name: "Page Title", control: "text" },
    pageSubtitle: { name: "Page Subtitle", control: "text" },
    pageContent: {
      name: "Page Content",
      control: { type: "select", options: ["Data Table", "Description List", "Form Layout", "Placeholder"] },
    },
    pageContent2: {
      name: "Page Content 2",
      control: { type: "select", options: ["Data Table", "Description List", "Form Layout", "Placeholder"] },
    },
    className: { name: "Class Name", control: "text" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { name: "Tokens", control: "object" },
    children: { control: false },
    navigation: { control: false },
  },
};

function getPageContent(pageContent: string) {
  if (pageContent === "Data Table") {
    return (
      <>
        <Simple />
        <a
          className="flex w-full text-sm justify-center text-primary-dark hover:text-primary p-2"
          href="https://croz-ltd.github.io/tiller/?path=/docs/component-library-data-display-datatable--simple#simple"
          target="_blank"
        >
          See Data Table Story Code
        </a>
      </>
    );
  }
  if (pageContent === "Description List") {
    return (
      <>
        <Default />
        <a
          className="flex w-full text-sm justify-center text-primary-dark hover:text-primary p-2"
          href="https://croz-ltd.github.io/tiller/?path=/docs/component-library-data-display-descriptionlist--default#default"
          target="_blank"
        >
          See Description List Story Code
        </a>
      </>
    );
  }
  if (pageContent === "Form Layout") {
    return (
      <FormContainer initialValues={{}} onSubmit={() => {}}>
        <div>
          <SimpleType />
          <a
            className="flex w-full text-sm justify-center text-primary-dark hover:text-primary p-2"
            href="https://croz-ltd.github.io/tiller/?path=/docs/component-library-core-formlayout--simple-type#simple-type"
            target="_blank"
          >
            See Form Layout Story Code
          </a>
        </div>
      </FormContainer>
    );
  }
  return <Placeholder className="h-48" />;
}

export const StackedLayoutFactory = ({
  pageTitle,
  pageSubtitle,
  pageContent,
  pageContent2,
  className,
  useTokens,
  tokens,
  background,
  containerVariant,
  isFixed,
}) => {
  // incl-code
  const topNavigationContainer = (
    <TopNavigation variant="contained">
      <TopNavigation.Navigation>
        <TopNavigation.Navigation.Item to="/dashboard">
          <Intl name="dashboard" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/team">
          <Intl name="team" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/projects">
          <Intl name="projects" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/calendar">
          <Intl name="calendar" />
        </TopNavigation.Navigation.Item>
      </TopNavigation.Navigation>
      <TopNavigation.Dropdown
        title="User"
        menuType="icon"
        icon={<Icon type="user" className="text-white" />}
        iconColor="default"
        buttonColor="primary"
        popupBackgroundColor="light"
        buttonVariant="text"
      >
        <TopNavigation.Dropdown.Item to="/account" color="light">
          <Intl name="account" />
        </TopNavigation.Dropdown.Item>
        <TopNavigation.Dropdown.Item to="/support" color="light">
          <Intl name="support" />
        </TopNavigation.Dropdown.Item>
        <TopNavigation.Dropdown.Item to="/logout" color="light">
          <Intl name="signOut" />
        </TopNavigation.Dropdown.Item>
      </TopNavigation.Dropdown>
    </TopNavigation>
  );

  return (
    <Router>
      <StackedLayout
        navigation={topNavigationContainer}
        background={background}
        containerVariant={containerVariant}
        tokens={useTokens && tokens}
        className={className}
        isFixed={isFixed}
      >
        <StackedLayout.Heading>
          <PageHeading>
            <PageHeading.Title>{pageTitle}</PageHeading.Title>
            <PageHeading.Subtitle>{pageSubtitle}</PageHeading.Subtitle>
            <PageHeading.Actions>
              <Button variant="outlined">
                <Intl name="edit" />
              </Button>
              <Button id="open-button" variant="filled" onClick={() => {}}>
                <Intl name="publish" />
              </Button>
            </PageHeading.Actions>
          </PageHeading>
        </StackedLayout.Heading>
        <StackedLayout.Content>
          <div className="flex flex-col space-y-4">
            {getPageContent(pageContent)}
            {getPageContent(pageContent2)}
          </div>
        </StackedLayout.Content>
      </StackedLayout>
    </Router>
  );
};

StackedLayoutFactory.args = {
  pageTitle: "Title",
  pageSubtitle: "Subtitle",
  pageContent: "Placeholder",
  pageContent2: "Placeholder",
  background: "gray",
  containerVariant: "fullWidth",
  isFixed: false,
  className: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["StackedLayout"],
};

StackedLayoutFactory.parameters = {
  controls: {
    expanded: false,
  },
};

StackedLayoutFactory.decorators = showFactoryDecorator();

export const SimpleWithModal = () => {
  // incl-code
  const topNavigationContainer = (
    <TopNavigation variant="contained">
      <TopNavigation.Navigation>
        <TopNavigation.Navigation.Item to="/dashboard">
          <Intl name="dashboard" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/team">
          <Intl name="team" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/projects">
          <Intl name="projects" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/calendar">
          <Intl name="calendar" />
        </TopNavigation.Navigation.Item>
      </TopNavigation.Navigation>
      <TopNavigation.Dropdown
        title="User"
        menuType="icon"
        icon={<Icon type="user" className="text-white" />}
        iconColor="default"
        buttonColor="primary"
        popupBackgroundColor="light"
        buttonVariant="text"
      >
        <TopNavigation.Dropdown.Item to="/account" color="light">
          <Intl name="account" />
        </TopNavigation.Dropdown.Item>
        <TopNavigation.Dropdown.Item to="/support" color="light">
          <Intl name="support" />
        </TopNavigation.Dropdown.Item>
        <TopNavigation.Dropdown.Item to="/logout" color="light">
          <Intl name="signOut" />
        </TopNavigation.Dropdown.Item>
      </TopNavigation.Dropdown>
    </TopNavigation>
  );
  const modal = useModal();

  return (
    <Router>
      <StackedLayout navigation={topNavigationContainer} containerVariant="constrainedPadded">
        <StackedLayout.Heading>
          <PageHeading>
            <PageHeading.Title>Project Nero</PageHeading.Title>
            <PageHeading.Actions>
              <Button variant="outlined">
                <Intl name="edit" />
              </Button>
              <Button id="open-button" variant="filled" onClick={modal.onOpen}>
                <Intl name="publish" />
              </Button>
              <Modal {...modal} icon={<Modal.Icon icon={<Icon type="check" className="text-white" />} />}>
                <Modal.Content title={<Intl name="publish" />}>
                  <Intl name="publishConfirmation" />
                </Modal.Content>

                <Modal.Footer>
                  <Button variant="filled" onClick={modal.onClose}>
                    <Intl name="publish" />
                  </Button>
                  <Button variant="outlined" onClick={modal.onClose}>
                    <Intl name="cancel" />
                  </Button>
                </Modal.Footer>
              </Modal>
            </PageHeading.Actions>
          </PageHeading>
        </StackedLayout.Heading>
        <StackedLayout.Content>
          <Placeholder className="h-48" />
        </StackedLayout.Content>
      </StackedLayout>
    </Router>
  );
};

export const WithContainerConfigWithModal = () => {
  // incl-code
  const topNavigationContainer = (
    <TopNavigation variant="contained">
      <TopNavigation.Navigation>
        <TopNavigation.Navigation.Item to="/dashboard">
          <Intl name="dashboard" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/team">
          <Intl name="team" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/projects">
          <Intl name="projects" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/calendar">
          <Intl name="calendar" />
        </TopNavigation.Navigation.Item>
      </TopNavigation.Navigation>
      <TopNavigation.Dropdown
        title="User"
        menuType="icon"
        icon={<Icon type="user" className="text-white" />}
        iconColor="default"
        buttonColor="primary"
        popupBackgroundColor="light"
        buttonVariant="text"
      >
        <TopNavigation.Dropdown.Item to="/account" color="light">
          <Intl name="account" />
        </TopNavigation.Dropdown.Item>
        <TopNavigation.Dropdown.Item to="/support" color="light">
          <Intl name="support" />
        </TopNavigation.Dropdown.Item>
        <TopNavigation.Dropdown.Item to="/logout" color="light">
          <Intl name="signOut" />
        </TopNavigation.Dropdown.Item>
      </TopNavigation.Dropdown>
    </TopNavigation>
  );
  const modal = useModal();

  return (
    <Router>
      <StackedLayout navigation={topNavigationContainer} containerVariant="max">
        <StackedLayout.Heading>
          <PageHeading>
            <PageHeading.Title>Project Nero</PageHeading.Title>
            <PageHeading.Actions>
              <Button variant="outlined">
                <Intl name="edit" />
              </Button>
              <Button id="open-button" variant="filled" onClick={modal.onOpen}>
                <Intl name="publish" />
              </Button>
              <Modal {...modal} icon={<Modal.Icon icon={<Icon type="check" className="text-white" />} />}>
                <Modal.Content title={<Intl name="publish" />}>
                  <Intl name="publishConfirmation" />
                </Modal.Content>

                <Modal.Footer>
                  <Button variant="filled" onClick={modal.onClose}>
                    <Intl name="publish" />
                  </Button>
                  <Button variant="outlined" onClick={modal.onClose}>
                    <Intl name="cancel" />
                  </Button>
                </Modal.Footer>
              </Modal>
            </PageHeading.Actions>
          </PageHeading>
        </StackedLayout.Heading>
        <StackedLayout.Content containerVariant="max">
          <Placeholder className="h-48" />
        </StackedLayout.Content>
      </StackedLayout>
    </Router>
  );
};

export const WithFixedHeadingWithModal = () => {
  // incl-code
  const topNavigationContainer = (
    <TopNavigation variant="contained">
      <TopNavigation.Navigation>
        <TopNavigation.Navigation.Item to="/dashboard">
          <Intl name="dashboard" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/team">
          <Intl name="team" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/projects">
          <Intl name="projects" />
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to="/calendar">
          <Intl name="calendar" />
        </TopNavigation.Navigation.Item>
      </TopNavigation.Navigation>
      <TopNavigation.Dropdown
        title="User"
        menuType="icon"
        icon={<Icon type="user" className="text-white" />}
        iconColor="default"
        buttonColor="primary"
        popupBackgroundColor="light"
        buttonVariant="text"
      >
        <TopNavigation.Dropdown.Item to="/account" color="light">
          <Intl name="account" />
        </TopNavigation.Dropdown.Item>
        <TopNavigation.Dropdown.Item to="/support" color="light">
          <Intl name="support" />
        </TopNavigation.Dropdown.Item>
        <TopNavigation.Dropdown.Item to="/logout" color="light">
          <Intl name="signOut" />
        </TopNavigation.Dropdown.Item>
      </TopNavigation.Dropdown>
    </TopNavigation>
  );
  const modal = useModal();

  return (
    <Router>
      <StackedLayout navigation={topNavigationContainer} containerVariant="constrainedPadded" isFixed={true}>
        <StackedLayout.Heading>
          <PageHeading>
            <PageHeading.Title>Project Nero</PageHeading.Title>
            <PageHeading.Actions>
              <Button variant="outlined">
                <Intl name="edit" />
              </Button>
              <Button id="open-button" variant="filled" onClick={modal.onOpen}>
                <Intl name="publish" />
              </Button>
              <Modal {...modal} icon={<Modal.Icon icon={<Icon type="check" className="text-white" />} />}>
                <Modal.Content title={<Intl name="publish" />}>
                  <Intl name="publishConfirmation" />
                </Modal.Content>

                <Modal.Footer>
                  <Button variant="filled" onClick={modal.onClose}>
                    <Intl name="publish" />
                  </Button>
                  <Button variant="outlined" onClick={modal.onClose}>
                    <Intl name="cancel" />
                  </Button>
                </Modal.Footer>
              </Modal>
            </PageHeading.Actions>
          </PageHeading>
        </StackedLayout.Heading>
        <StackedLayout.Content>
          <Placeholder className="h-full w-full" />
        </StackedLayout.Content>
      </StackedLayout>
    </Router>
  );
};
const HideControls = {
  className: { control: { disable: true } },
  pageTitle: { control: { disable: true } },
  pageSubtitle: { control: { disable: true } },
  pageContent: { control: { disable: true } },
  pageContent2: { control: { disable: true } },
  isFixed: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  tokens: { control: { disable: true } },
};

SimpleWithModal.argTypes = HideControls;
WithContainerConfigWithModal.argTypes = HideControls;
WithFixedHeadingWithModal.argTypes = HideControls;
