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

import { Breadcrumbs, IconButton, Typography } from "@tiller-ds/core";
import { DataTable, FileBrowser } from "@tiller-ds/data-display";
import { Icon, LoadingIcon } from "@tiller-ds/icons";

import { beautifySource } from "../utils";

import mdx from "./FileBrowser.mdx";

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
  id: string | number;
  name?: string;
  type?: "directory" | "txt" | "docx" | "pdf" | "mp3" | "jpg";
};

const rootDirectory: File = { id: 1, name: "Root", type: "directory" };

async function onDirectoryClick(directory: File): Promise<File[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result: File[];

      switch (directory.name) {
        case "Root":
          result = [
            { id: 1, name: "Folder of Secrets", type: "directory" },
            { id: 2, name: "Dragon", type: "txt" },
            { id: 3, name: "Magic Potion", type: "docx" },
          ];
          break;
        case "Folder of Secrets":
          result = [
            { id: 1, name: "Mystic Forest", type: "directory" },
            { id: 2, name: "Wizard Scroll", type: "pdf" },
            { id: 3, name: "Enchanted Amulet", type: "jpg" },
          ];
          break;
        case "Mystic Forest":
          result = [
            { id: 1, name: "Spellbook", type: "docx" },
            { id: 2, name: "Unicorn Song", type: "mp3" },
          ];
          break;
        default:
          result = [
            { id: 1, name: "Ancient Tome", type: "txt" },
            { id: 2, name: "Legendary Sword", type: "jpg" },
          ];
          break;
      }

      resolve(result);
    }, 1000);
  });
}

export const Default = () => <FileBrowser rootDirectory={rootDirectory} fetchDirectory={onDirectoryClick} />;

export const WithoutIcons = () => (
  <FileBrowser rootDirectory={rootDirectory} fetchDirectory={onDirectoryClick}>
    {(props) => <FileBrowser.Table {...props} icons={false} />}
  </FileBrowser>
);

export const WithoutBreadcrumbs = () => (
  <FileBrowser rootDirectory={rootDirectory} fetchDirectory={onDirectoryClick}>
    {(props) => <FileBrowser.Table {...props} breadcrumbs={false} />}
  </FileBrowser>
);

export const WithoutLoading = () => (
  <FileBrowser rootDirectory={rootDirectory} fetchDirectory={onDirectoryClick}>
    {(props) => <FileBrowser.Table {...props} loading={false} />}
  </FileBrowser>
);

export const WithCustomDisplay = () => (
  <FileBrowser rootDirectory={rootDirectory} fetchDirectory={onDirectoryClick}>
    {({ currentFiles, currentPath, handleItemClick, goBack, pending, goToDirectory }) => (
      <>
        <div className="flex flex-row h-10 justify-between">
          <Breadcrumbs icon={<Icon type="caret-right" />} tokens={{ container: { backgroundColor: "bg-transparent" } }}>
            {currentPath.map((folder, index) => (
              <button onClick={index !== currentPath.length - 1 ? () => goToDirectory(index + 1) : undefined}>
                <Breadcrumbs.Breadcrumb>{folder.name}</Breadcrumbs.Breadcrumb>
              </button>
            ))}
          </Breadcrumbs>
          {!pending && (
            <IconButton
              icon={
                <Icon type="caret-up" className="pt-1 px-1 text-body-light hover:text-body duration-150 ease-in-out" />
              }
              onClick={goBack}
              disabled={currentPath.length === 1}
              showTooltip={false}
            />
          )}
        </div>
        <DataTable
          data={pending ? [] : currentFiles}
          onClick={(file) => file.type === "directory" && handleItemClick(file)}
          emptyState={
            <div className="flex items-center justify-center my-10">
              <LoadingIcon />
            </div>
          }
          tokens={{ tableRow: { odd: "bg-white" } }}
        >
          <DataTable.Column header="Name" id="name" canSort={false}>
            {(file: File) =>
              file.type === "directory" ? (
                <div className="flex items-center space-x-1">
                  <Icon type="folder-notch" />
                  <Typography>{file.name}</Typography>
                </div>
              ) : (
                <Typography>{file.name}</Typography>
              )
            }
          </DataTable.Column>
          <DataTable.Column header="Type" id="type" canSort={false}>
            {(file: File) => (file.type ? <Typography>{file.type}</Typography> : <Typography>-</Typography>)}
          </DataTable.Column>
        </DataTable>
      </>
    )}
  </FileBrowser>
);
