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

import { Modal, useModal } from "@tiller-ds/alert";
import { Button } from "@tiller-ds/core";
import { DescriptionList } from "@tiller-ds/data-display";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import mdx from "./Modal.mdx";

export default {
  title: "Component Library/Alert/Modal",
  component: Modal,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9750%3A17433",
    },
    decorators: [withDesign],
  },
};

export const Simple = () => {
  const modal = useModal();

  return (
    <>
      <Button id="open-button" onClick={modal.onOpen}>
        <Intl name="open" />
      </Button>
      <Modal {...modal} icon={<Modal.Icon icon={<Icon type="check" variant="bold" />} className="text-white" />}>
        <Modal.Content title={<Intl name="modalTitle" />}>
          <Intl name="modalContent" />
        </Modal.Content>

        <Modal.Footer>
          <Button variant="filled" onClick={modal.onClose}>
            <Intl name="submit" />
          </Button>
          <Button variant="text" onClick={modal.onClose}>
            <Intl name="cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const WithState = () => {
  const modal = useModal<number>();

  const onOpen = () => {
    modal.onOpen((modal.state || 0) + 1);
  };

  return (
    <>
      <Button id="open-button" onClick={onOpen}>
        <Intl name="open" />
      </Button>
      <Modal {...modal} icon={<Modal.Icon icon={<Icon type="check" variant="bold" />} className="text-white" />}>
        <Modal.Content title={<Intl name="modalTitle" />}>
          <Intl name="modalCounter" />
          {modal.state}
        </Modal.Content>
        <Modal.Footer>
          <Button variant="filled" onClick={modal.onClose}>
            <Intl name="submit" />
          </Button>
          <Button variant="text" onClick={modal.onClose}>
            <Intl name="cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const WithStateRenderProp = () => {
  const modal = useModal<number>();

  const onOpen = () => {
    modal.onOpen((modal.state || 0) + 1);
  };

  return (
    <>
      <Button id="open-button" onClick={onOpen}>
        <Intl name="open" />
      </Button>
      <Modal {...modal} icon={<Modal.Icon icon={<Icon type="check" variant="bold" />} className="text-white" />}>
        {(state) => (
          <>
            <Modal.Content title={<Intl name="modalTitle" />}>
              <Intl name="modalCounter" />
              {state}
            </Modal.Content>

            <Modal.Footer>
              <Button variant="filled" onClick={modal.onClose}>
                <Intl name="submit" />
              </Button>
              <Button variant="text" onClick={modal.onClose}>
                <Intl name="cancel" />
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export const WithoutIcon = () => {
  const modal = useModal();

  return (
    <>
      <Button id="open-button" onClick={modal.onOpen}>
        Open
      </Button>
      <Modal {...modal}>
        <Modal.Content title={<Intl name="modalTitle" />}>
          <Intl name="modalContent" />
        </Modal.Content>

        <Modal.Footer>
          <Button variant="filled" color="danger" onClick={modal.onClose}>
            <Intl name="submit" />
          </Button>
          <Button variant="text" color="white" onClick={modal.onClose}>
            <Intl name="cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const WithScrollbar = () => {
  const modal = useModal();

  return (
    <>
      <Button id="open-button" onClick={modal.onOpen}>
        <Intl name="open" />
      </Button>
      <Modal {...modal}>
        <Modal.Content title="Information" />
        <DescriptionList>
          <DescriptionList.Item label="Full name">Margot Foster</DescriptionList.Item>
          <DescriptionList.Item label="Application for">Backend Developer</DescriptionList.Item>
          <DescriptionList.Item label="Email address">margotfoster@example</DescriptionList.Item>
          <DescriptionList.Item label="City">Chicago</DescriptionList.Item>
          <DescriptionList.Item label="Born">March 4, 1895 </DescriptionList.Item>
          <DescriptionList.Item label="Salary expectation">$120,000</DescriptionList.Item>
          <DescriptionList.Item label="About">
            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui
            ipsum
          </DescriptionList.Item>
        </DescriptionList>
        <Modal.Footer>
          <Button variant="filled" onClick={modal.onClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
