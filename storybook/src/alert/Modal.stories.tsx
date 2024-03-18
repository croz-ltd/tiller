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
import { Button, Typography } from "@tiller-ds/core";
import { DescriptionList } from "@tiller-ds/data-display";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import mdx from "./Modal.mdx";
import { beautifySource } from "../utils";
import { Input } from "@tiller-ds/form-elements";
import { useState } from "react";

export default {
  title: "Component Library/Alert/Modal",
  component: Modal,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "Modal"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9750%3A17433",
    },
    decorators: [withDesign],
  },
};

export const Simple = () => {
  // incl-code
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
          <Button variant="filled" color="success" onClick={modal.onClose}>
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

export const WithState = () => {
  // incl-code
  const modal = useModal<number>();

  const onOpen = () => {
    modal.onOpen((modal.state || 0) + 1);
  };

  return (
    <>
      <Button id="open-button" onClick={onOpen}>
        <Intl name="open" />
      </Button>
      <Modal
        {...modal}
        icon={
          <Modal.Icon
            icon={<Icon type="lock-open" variant="bold" />}
            tokens={{
              Icon: {
                backgroundColor: "bg-primary",
              },
            }}
            className="text-white"
          />
        }
      >
        <Modal.Content title={<Intl name="modalOpenTitle" />}>
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
  // incl-code
  const modal = useModal<number>();

  const onOpen = () => {
    modal.onOpen((modal.state || 0) + 1);
  };

  return (
    <>
      <Button id="open-button" onClick={onOpen}>
        <Intl name="open" />
      </Button>
      <Modal
        {...modal}
        icon={
          <Modal.Icon
            icon={<Icon type="lock-open" variant="bold" />}
            tokens={{
              Icon: {
                backgroundColor: "bg-primary",
              },
            }}
            className="text-white"
          />
        }
      >
        {(state) => (
          <>
            <Modal.Content title={<Intl name="modalOpenTitle" />}>
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
  // incl-code
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
          <Button variant="filled" color="success" onClick={modal.onClose}>
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
  // incl-code
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
            ipsum Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
            Excepteur qui ipsum Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa
            consequat. Excepteur qui ipsum Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum
            culpa consequat. Excepteur qui ipsum Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt
            cillum culpa consequat. Excepteur qui ipsum
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

export const WithDisabledFocusLock = () => {
  // incl-code
  const modal = useModal();
  const modalWithDisabledFocusLock = useModal();
  const [showPopup, setShowPopup] = useState(false);
  const [showDisabledFocusLockPopup, setShowDisabledFocusLockPopup] = useState(false);

  return (
    <>
      <div className="flex space-x-2">
        <Button id="open-button" onClick={modal.onOpen}>
          <Intl name="Normal" />
        </Button>
        <Button id="open-button" onClick={modalWithDisabledFocusLock.onOpen}>
          <Intl name="Disabled focus lock" />
        </Button>
      </div>

      <Modal {...modal} icon={<Modal.Icon icon={<Icon type="check" variant="bold" />} className="text-white" />}>
        <Modal.Content title={<Intl name="modalTitle" />}>
          <Intl name="modalContent" />
        </Modal.Content>

        <Modal.Footer>
          <Button variant="filled" color="success" onClick={() => setShowPopup(true)}>
            <Intl name="Open popup" />
          </Button>
          <Button variant="text" color="white" onClick={modal.onClose}>
            <Intl name="cancel" />
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        {...modalWithDisabledFocusLock}
        icon={<Modal.Icon icon={<Icon type="check" variant="bold" />} className="text-white" />}
        disableFocusLock={true}
      >
        <Modal.Content title={<Intl name="modalTitle" />}>
          <Intl name="modalContent" />
        </Modal.Content>

        <Modal.Footer>
          <Button variant="filled" color="success" onClick={() => setShowDisabledFocusLockPopup(true)}>
            <Intl name="Open popup" />
          </Button>
          <Button variant="text" color="white" onClick={modalWithDisabledFocusLock.onClose}>
            <Intl name="cancel" />
          </Button>
        </Modal.Footer>
      </Modal>

      <Popup
        text="Without this option, focus is locked on 'first' modal."
        isOpen={showPopup}
        setIsOpen={setShowPopup}
      />
      <Popup
        text="With disabled focus lock, input field can get focused."
        isOpen={showDisabledFocusLockPopup}
        setIsOpen={setShowDisabledFocusLockPopup}
      />
    </>
  );
};

type PopupProps = {
  text: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function Popup({ text, isOpen, setIsOpen }: PopupProps) {
  return isOpen ? (
    <div className="flex items-center justify-center z-[10000000000] fixed inset-0">
      <div className="rounded-lg shadow-lg bg-white outline-none focus:outline-none">
        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
          <h3 className="text-2xl font-semibold">Popup with input fields</h3>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-black text-3xl leading-none font-bold outline-none focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <span className="">×</span>
          </button>
        </div>
        <div className="flex flex-col items-start p-5 space-y-4">
          <Typography>{text}</Typography>
          <Input name="test" />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
