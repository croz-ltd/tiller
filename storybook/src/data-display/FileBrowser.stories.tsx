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

import { DataTable, FileBrowser } from "@tiller-ds/data-display";

import mdx from "./Amount.mdx";
import { beautifySource } from "../utils";
import { Breadcrumbs, Button, IconButton, Typography } from "@tiller-ds/core";
import { Icon, IconType, LoadingIcon } from "@tiller-ds/icons";

export default {
  title: "Component Library/Data-display/FileBrowser",
  component: FileBrowser,
  parameters: {
    docs: {
      page: mdx,
      transformSource: (source) => beautifySource(source, "FileBrowser"),
    },
    decorators: [withDesign],
  },
};

type File = {
  name: string;
  type: "directory" | "txt" | "docx" | "pdf" | "mp3" | "jpg";
};

const rootDirectory: File = { name: "Root", type: "directory" };

async function onDirectoryClick(directory: File): Promise<File[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result: File[];

      switch (directory.name) {
        case "Root":
          result = [
            { name: "Folder of Secrets", type: "directory" },
            { name: "Dragon", type: "txt" },
            { name: "Magic Potion", type: "docx" },
          ];
          break;
        case "Folder of Secrets":
          result = [
            { name: "Mystic Forest", type: "directory" },
            { name: "Wizard Scroll", type: "pdf" },
            { name: "Enchanted Amulet", type: "jpg" },
          ];
          break;
        case "Mystic Forest":
          result = [
            { name: "Spellbook", type: "docx" },
            { name: "Unicorn Song", type: "mp3" },
          ];
          break;
        default:
          result = [
            { name: "Ancient Tome", type: "txt" },
            { name: "Legendary Sword", type: "jpg" },
          ];
          break;
      }

      resolve(result);
    }, 1000);
  });
}

export const FileBrowserWithDataTable = () => (
  <FileBrowser rootDirectory={rootDirectory} fetchDirectory={onDirectoryClick}>
    {(currentFiles, currentPath, handleItemClick, goBack, pending) => (
      <>
        <DataTable data={currentFiles} onClick={(file) => file.type === "directory" && handleItemClick(file)}>
          <DataTable.Column header="Name" id="name" canSort={false}>
            {(file: File) => <DisplayFileIconAndName file={file} />}
          </DataTable.Column>
          <DataTable.Column header="Type" accessor="type" canSort={false} />
        </DataTable>
      </>
    )}
  </FileBrowser>
);

export const FileBrowserWithDataTableAndBreadCrumbs = () => (
  <FileBrowser rootDirectory={rootDirectory} fetchDirectory={onDirectoryClick}>
    {(currentFiles, currentPath, handleItemClick, goBack, pending) => (
      <>
        <Breadcrumbs icon={<Icon type="caret-right" />}>
          {currentPath.map((file) => (
            <Breadcrumbs.Breadcrumb>{file.name}</Breadcrumbs.Breadcrumb>
          ))}
        </Breadcrumbs>
        <DataTable data={currentFiles} onClick={(file) => file.type === "directory" && handleItemClick(file)}>
          <DataTable.Column header="Name" id="name" canSort={false}>
            {(file: File) => <DisplayFileIconAndName file={file} />}
          </DataTable.Column>
          <DataTable.Column header="Type" accessor="type" canSort={false} />
        </DataTable>
      </>
    )}
  </FileBrowser>
);

export const FileBrowserWithDataTableAndBreadCrumbsAndBack = () => (
  <FileBrowser rootDirectory={rootDirectory} fetchDirectory={onDirectoryClick}>
    {(currentFiles, currentPath, handleItemClick, goBack, pending) => (
      <>
        <div className="flex flex-row">
          <Breadcrumbs icon={<Icon type="caret-right" />}>
            {currentPath.map((file) => (
              <Breadcrumbs.Breadcrumb>{file.name}</Breadcrumbs.Breadcrumb>
            ))}
          </Breadcrumbs>
          {currentPath.length > 1 && !pending && <IconButton icon={<Icon type="caret-up" />} onClick={goBack} />}
        </div>
        <DataTable data={currentFiles} onClick={(file) => file.type === "directory" && handleItemClick(file)}>
          <DataTable.Column header="Name" id="name" canSort={false}>
            {(file: File) => <DisplayFileIconAndName file={file} />}
          </DataTable.Column>
          <DataTable.Column header="Type" accessor="type" canSort={false} />
        </DataTable>
      </>
    )}
  </FileBrowser>
);

export const FileBrowserWithDataTableAndBreadCrumbsAndBackAndLoading = () => (
  <FileBrowser rootDirectory={rootDirectory} fetchDirectory={onDirectoryClick}>
    {(currentFiles, currentPath, handleItemClick, goBack, pending) => (
      <>
        <div className="flex flex-row">
          <Breadcrumbs icon={<Icon type="caret-right" />}>
            {currentPath.map((file) => (
              <Breadcrumbs.Breadcrumb>{file.name}</Breadcrumbs.Breadcrumb>
            ))}
          </Breadcrumbs>
          {currentPath.length > 1 && !pending && <IconButton icon={<Icon type="caret-up" />} onClick={goBack} />}
        </div>
        <DataTable
          data={pending ? [] : currentFiles}
          onClick={(file) => file.type === "directory" && handleItemClick(file)}
          emptyState={
            <div className="flex items-center justify-center my-10">
              <LoadingIcon />
            </div>
          }
        >
          <DataTable.Column header="Name" id="name" canSort={false}>
            {(file: File) => <DisplayFileIconAndName file={file} />}
          </DataTable.Column>
          <DataTable.Column header="Type" accessor="type" canSort={false} />
        </DataTable>
      </>
    )}
  </FileBrowser>
);

type DisplayFileIconAndNameProps = {
  file: File;
};

const fileIconMappings: Record<string, IconType> = {
  txt: "file-text",
  docx: "microsoft-word-logo",
  pdf: "file-pdf",
  mp3: "file-audio",
  jpg: "file-jpg",
};

function DisplayFileIconAndName({ file }: DisplayFileIconAndNameProps) {
  const fileType = file.type.toLowerCase();
  const iconType = fileIconMappings[fileType] || "folder-notch";

  return (
    <div className="flex items-center space-x-1">
      <Icon type={iconType} />
      <Typography>{file.name}</Typography>
    </div>
  );
}
