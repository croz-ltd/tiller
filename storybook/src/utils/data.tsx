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

export type Item = {
  username: string;
  name: string;
  surname: string;
};

export const items: Item[] = [
  {
    username: "emoore",
    name: "Emily",
    surname: "Moore",
  },
  {
    username: "mwilliams",
    name: "Michael",
    surname: "Williams",
  },
  {
    username: "sbrown",
    name: "Sarah",
    surname: "Brown",
  },
  {
    username: "mdavis",
    name: "Matthew",
    surname: "Davis",
  },
  {
    username: "lmiller",
    name: "Laura",
    surname: "Miller",
  },
  {
    username: "dgarcia",
    name: "David",
    surname: "Garcia",
  },
  {
    username: "jrodriguez",
    name: "James",
    surname: "Rodriguez",
  },
  {
    username: "jmartinez",
    name: "Jessica",
    surname: "Martinez",
  },
  {
    username: "jthomas",
    name: "John",
    surname: "Thomas",
  },
  {
    username: "eharris",
    name: "Elizabeth",
    surname: "Harris",
  },
  {
    username: "dparker",
    name: "Daniel",
    surname: "Parker",
  },
];

export const lessItems: Item[] = [
  {
    username: "pperic",
    name: "Pero",
    surname: "Peric",
  },
  {
    username: "iivic",
    name: "Ivo",
    surname: "Ivic",
  },
];

export const simpleItems: string[] = ["#Important", "#Design", "#Secret", "#New"];

export const lessSimpleItems: string[] = ["#Important", "#Secret"];

export const loadOptions = (query: string) => {
  return new Promise<Item[]>((resolve) => {
    const filtered = items.filter(
      (item) =>
        item.username.indexOf(query) !== -1 || item.name.indexOf(query) !== -1 || item.surname.indexOf(query) !== -1
    );

    setTimeout(() => {
      resolve(filtered);
    }, 500);
  });
};

export type TreeItem = {
  name: string;
  code?: string;
  items?: TreeItem[];
};

export const treeItems: TreeItem[] = [
  {
    name: "hardver",
    items: [
      {
        name: "IBM",
        items: [
          {
            name: "ostalo",
            items: [{ name: "ostalo", code: "H010501" }],
          },
        ],
      },
    ],
  },
  {
    name: "usluge IT",
    items: [
      {
        name: "aplikativni razvoj",
        items: [
          {
            name: "razvoj/implementacija",
            items: [
              { name: "TM 1", code: "U010101" },
              { name: "TM 2", code: "U010105" },
              { name: "TM 3", code: "U010106" },
            ],
          },
          {
            name: "održavanje",
            items: [
              { name: "TM 1", code: "U010201" },
              { name: "TM 2", code: "U010205" },
              { name: "TM 3", code: "U010206" },
            ],
          },
        ],
      },
      {
        name: "DevOps&Cloud&Agile",
        items: [
          {
            name: "razvoj/implementacija",
            items: [
              { name: "TM 1", code: "U020101" },
              { name: "TM 2", code: "U020105" },
              { name: "TM 3", code: "U020106" },
            ],
          },
          {
            name: "održavanje",
            items: [
              { name: "TM 1", code: "U020201" },
              { name: "TM 2", code: "U020205" },
              { name: "TM 3", code: "U020206" },
            ],
          },
        ],
      },
    ],
  },
];

export const extendedColors = ["primary", "secondary", "tertiary", "success", "danger", "warning", "info", "white"];
