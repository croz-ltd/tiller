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

import { useModal, Modal } from "@tiller-ds/alert";
import { Button, PageHeading, Placeholder } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { StackedLayout, TopNavigation } from "@tiller-ds/menu";

import mdx from "./StackedLayout.mdx";

export default {
  title: "Component Library/Menu/StackedLayout",
  component: StackedLayout,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9901%3A23656",
    },
    decorators: [withDesign],
  },
};

const TopNavigationContainer = () => (
  <TopNavigation variant="contained">
    <TopNavigation.Navigation>
      <TopNavigation.Navigation.Item to={dashboardLink}>
        <Intl name="dashboard" />
      </TopNavigation.Navigation.Item>
      <TopNavigation.Navigation.Item to={teamLink}>
        <Intl name="team" />
      </TopNavigation.Navigation.Item>
      <TopNavigation.Navigation.Item to={projectsLink}>
        <Intl name="projects" />
      </TopNavigation.Navigation.Item>
      <TopNavigation.Navigation.Item to={calendarLink}>
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

const dashboardLink = "/dashboard";
const teamLink = "/team";
const projectsLink = "/projects";
const project = "Project Nero";
const calendarLink = "/calendar";

const PageHeadingContainer = () => {
  const modal = useModal();

  return (
    <PageHeading>
      <PageHeading.Title>{project}</PageHeading.Title>
      <PageHeading.Actions>
        <Button variant="outlined">
          <Intl name="edit" />
        </Button>
        <Button id="open-button" variant="filled" onClick={modal.onOpen}>
          <Intl name="publish" />
        </Button>
        <Modal {...modal} icon={<Modal.Icon icon={<Icon type="check" className="text-green-500" />} />}>
          <Modal.Content title={<Intl name="publish" />}>
            <Intl name="publishConfirmation" />
          </Modal.Content>

          <Modal.Footer>
            <Button variant="outlined" onClick={modal.onClose}>
              <Intl name="cancel" />
            </Button>
            <Button variant="filled" onClick={modal.onClose}>
              <Intl name="publish" />
            </Button>
          </Modal.Footer>
        </Modal>
      </PageHeading.Actions>
    </PageHeading>
  );
};

export const SimpleWithModal = () => (
  <Router>
    <StackedLayout navigation={<TopNavigationContainer />}>
      <StackedLayout.Heading>
        <PageHeadingContainer />
      </StackedLayout.Heading>
      <StackedLayout.Content>
        <Placeholder className="h-48" />
      </StackedLayout.Content>
    </StackedLayout>
  </Router>
);

export const WithContainerConfigWithModal = () => (
  <Router>
    <StackedLayout navigation={<TopNavigationContainer />} containerVariant="max">
      <StackedLayout.Heading>
        <PageHeadingContainer />
      </StackedLayout.Heading>
      <StackedLayout.Content containerVariant="max">
        <Placeholder className="h-48" />
      </StackedLayout.Content>
    </StackedLayout>
  </Router>
);

export const WithFixedHeadingWithModal = () => (
  <Router>
    <StackedLayout navigation={<TopNavigationContainer />} isFixed={true}>
      <StackedLayout.Heading>
        <PageHeadingContainer />
      </StackedLayout.Heading>
      <StackedLayout.Content>
        <Placeholder className="h-full w-full" />
      </StackedLayout.Content>
    </StackedLayout>
  </Router>
);
