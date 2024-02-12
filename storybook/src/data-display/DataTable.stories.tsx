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
import { useState } from "react";

import { range, slice } from "lodash";

import { withDesign } from "storybook-addon-designs";

import { Button, Card, IconButton, Link, Pagination, Typography, useLocalPagination } from "@tiller-ds/core";
import { DataTable, useDataTable, useLocalSummary, useSortableDataTable } from "@tiller-ds/data-display";
import { Icon } from "@tiller-ds/icons";
import { DropdownMenu } from "@tiller-ds/menu";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { beautifySource, getChangedTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./DataTable.mdx";

export default {
  title: "Component Library/Data-display/DataTable",
  component: DataTable,
  parameters: {
    docs: {
      page: mdx,
      transformSource: (source) => {
        const correctedSource = source
          .replace(/DataTableCardHeaderTitle/g, "DataTable.CardHeader.Title")
          .replace(/DataTableCardHeaderActions/g, "DataTable.CardHeader.Actions")
          .replace(/DataTableCardHeader/g, "DataTable.CardHeader")
          .replace(/CardBody/g, "Card.Body")
          .replace(/CardFooter/g, "Card.Footer")
          .replace(/CardHeaderTitle/g, "Card.Header.Title")
          .replace(/CardHeaderActions/g, "Card.Header.Actions")
          .replace(/DataTableColumn/g, "DataTable.Column")
          .replace(/DataTableExpander/g, "DataTable.Expander")
          .replace(/DataTableSelector/g, "DataTable.Selector")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return beautifySource(getChangedTokensFromSource(correctedSource, "DataTable"), "DataTable");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9679%3A13444",
    },
    decorators: [withDesign],
  },
  argTypes: {
    alignHeader: { name: "Align Header", control: "radio" },
    showHeader: { name: "Show Header", control: "boolean" },
    withExpander: { name: "Show Expander", control: "boolean" },
    withSelector: { name: "Show Selector", control: "boolean" },
    withActions: { name: "Show Actions", control: "boolean" },
    withIconButtons: { name: "Show Icon Buttons", control: "boolean" },
    withHorizontalScroll: { name: "Toggle Horizontal Scroll", control: "boolean" },
    firstColumnFixed: { name: "Fix First Column", control: "boolean" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { name: "Tokens", control: "object" },
    children: { control: false },
    data: { control: false },
    defaultSortBy: { control: false },
    hook: { control: false },
    rowEditingIndex: { control: false },
    saveEnabled: { control: false },
    lastColumnFixed: { control: false },
    className: { control: false },
  },
};

type Item = {
  id: number;
  name: string;
  age: number;
  surname: string;
  appliedFor: string;
  jobDescription: string;
  salary: {
    annual: number;
    bonus: number;
  };
};

const names = ["Emily", "Michael", "Sarah", "Matthew"];
const surname = ["Moore", "Williams", "Brown", "Davis", "Aron"];
const jobs = ["Nurse", "Teacher", "Software developer", "Lawyer"];
const jobDescription = [
  "You will be tasked with caring for pediatric patients with a variety of health conditions and challenges as well as collaborating with physicians to provide the highest-quality care possible to each individual. As a registered nurse on staff, you will communicate orders to medical assistants and other team members and coordinate with staff and families to ensure the adherence to the attending physician’s instructions as well as proper care and disease control practices.",
  "The teaching profession is exciting and challenging. Teachers act as role models, mentors, caregivers and advisers. They can have a profound effect on the lives of their students.",
  "The job of a software developer depends on the needs of the company, organization or team they are on. Some build and maintain systems that run devices and networks. Others develop applications that make it possible for people to perform specific tasks on computers, cellphones or other devices.",
  "A lawyer provides counsel and represents businesses, individuals, and government agencies in legal matters and disputes. A lawyer'ss main duties are to uphold the law while protecting a client's rights. Lawyers advise, research, and collect evidence or information, draft legal documents such as contracts, divorces, or real estate transactions, and defend or prosecute in court",
];
const allData: Item[] = range(0, 152).map((value) => ({
  id: value + 1,
  name: names[value % names.length],
  surname: surname[value % surname.length],
  age: (12 + value * 13) % 50,
  appliedFor: jobs[value % jobs.length],
  jobDescription: jobDescription[value % jobs.length],
  salary: {
    annual: (value + 5) * 12000,
    bonus: (value + 5) * 200,
  },
}));

const smallData = slice(allData, 0, 4);

const ExpandedItem = (item: Item) => {
  return (
    <span>
      <b>Age: </b>
      {item.age}
    </span>
  );
};

export const DataTableFactory = ({
  alignHeader,
  showFooter,
  showHeader,
  firstColumnFixed,
  onDoubleClick,
  withExpander,
  withSelector,
  withActions,
  withHorizontalScroll,
  withIconButtons,
  useTokens,
  tokens,
}) => {
  const [dataTableState, dataTableHook] = useDataTable();
  const [paginationState, paginationHook] = useLocalPagination(allData);

  return (
    <>
      <div className="p-8 bg-gray-100">
        <Card className={firstColumnFixed || withHorizontalScroll ? "hidden" : ""}>
          <DataTable.CardHeader {...dataTableState} {...paginationState}>
            <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
            {withActions && (
              <DataTable.CardHeader.Actions>
                <Button onClick={dataTableHook.toggleSelectAll}>Toggle all</Button>
                <Button onClick={() => dataTableHook.setSelected({}, false)}>Reset selection</Button>
              </DataTable.CardHeader.Actions>
            )}
          </DataTable.CardHeader>
          <Card.Body removeSpacing={true}>
            <DataTable
              data={smallData}
              getItemId={(item: Item) => item.id}
              hook={dataTableHook}
              showHeader={showHeader}
              showFooter={showFooter}
              onDoubleClick={onDoubleClick}
              alignHeader={alignHeader}
              tokens={useTokens && tokens}
            >
              {withSelector && <DataTable.Selector />}
              <DataTable.Column header="ID" accessor="id" />
              <DataTable.Column header="Name" accessor="name" title="name" footer={showFooter && "This is a footer"} />
              {withIconButtons && (
                <DataTable.Column header="Edit" id="edit" canSort={false}>
                  {(item: Item) => (
                    <div className="flex justify-start items-center space-x-1">
                      <IconButton
                        icon={<Icon type="pencil-simple" variant="fill" className="text-gray-500" />}
                        label="Edit"
                      />
                      <IconButton
                        icon={<Icon type="trash" variant="fill" className="text-gray-500" />}
                        label="Delete"
                      />
                    </div>
                  )}
                </DataTable.Column>
              )}
              {withExpander && <DataTable.Expander>{ExpandedItem}</DataTable.Expander>}
            </DataTable>
          </Card.Body>
          <Card.Footer>
            <Pagination {...paginationState} {...paginationHook} />
          </Card.Footer>
        </Card>
        {(firstColumnFixed || withHorizontalScroll) && (
          <DataTable data={smallData} firstColumnFixed={firstColumnFixed}>
            <DataTable.Column header="Name-01" id="name-01" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-02" id="name-02" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-03" id="name-03" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-04" id="name-04" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-05" id="name-05" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-06" id="name-06" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-07" id="name-07" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-08" id="name-08" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-09" id="name-09" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-10" id="name-10" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-11" id="name-11" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-12" id="name-12" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-13" id="name-13" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-14" id="name-14" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-15" id="name-15" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-16" id="name-16" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-17" id="name-17" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-18" id="name-18" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-19" id="name-19" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
            <DataTable.Column header="Name-20" id="name-20" className="max-w-md">
              {(item: Item) => <>{item.name}</>}
            </DataTable.Column>
          </DataTable>
        )}
      </div>
    </>
  );
};

DataTableFactory.args = {
  alignHeader: "left",
  showHeader: true,
  showFooter: false,
  withExpander: false,
  withSelector: true,
  withActions: true,
  withIconButtons: false,
  withHorizontalScroll: false,
  firstColumnFixed: false,
  useTokens: false,
  tokens: defaultThemeConfig.component["DataTable"],
};

DataTableFactory.parameters = {
  controls: {
    expanded: false,
  },
};

DataTableFactory.decorators = showFactoryDecorator();

export const KitchenSink = () => {
  // incl-code
  const [dataTableState, dataTableHook] = useDataTable();
  const [paginationState, paginationHook] = useLocalPagination(allData);

  return (
    <div className="p-8 bg-gray-100 h-screen">
      <Card>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
          <DataTable.CardHeader.Actions>
            <Button onClick={dataTableHook.toggleSelectAll}>Toggle all</Button>
            <Button onClick={() => dataTableHook.setSelected({}, false)}>Reset selection</Button>
          </DataTable.CardHeader.Actions>
        </DataTable.CardHeader>
        <Card.Body removeSpacing={true}>
          <DataTable data={paginationState.pageData} getItemId={(item: Item) => item.id} hook={dataTableHook}>
            <DataTable.Selector />
            <DataTable.Column header="ID" accessor="id" />
            <DataTable.Column header="Name" accessor="name" title="name" />
            <DataTable.Expander>{ExpandedItem}</DataTable.Expander>
          </DataTable>
        </Card.Body>
        <Card.Footer>
          <Pagination {...paginationState} {...paginationHook} />
        </Card.Footer>
      </Card>
    </div>
  );
};

export const EmptyKitchenSink = () => {
  // incl-code
  const [dataTableState, dataTableHook] = useDataTable();
  const [paginationState, paginationHook] = useLocalPagination([]);

  return (
    <div className="p-8 bg-gray-100 h-screen">
      <Card>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
        </DataTable.CardHeader>
        <Card.Body removeSpacing={true}>
          <DataTable
            data={paginationState.pageData}
            hook={dataTableHook}
            emptyState={
              <div className="my-10 flex justify-center items-center flex-col gap-3">
                <Icon type="warning" variant="regular" className="text-3xl" />
                <Typography variant="h6">No results found.</Typography>
                <Typography variant="subtext" className="text-center">
                  Try adjusting your search or filter to find
                  <br /> what you are looking for.
                </Typography>
              </div>
            }
          >
            <DataTable.Column header="ID" accessor="id" />
            <DataTable.Column header="Name" accessor="name" title="name" />
          </DataTable>
        </Card.Body>
        <Card.Footer>
          <Pagination {...paginationState} {...paginationHook} />
        </Card.Footer>
      </Card>
    </div>
  );
};

export const Simple = (args) => (
  <DataTable data={smallData}>
    <DataTable.Column header="ID" accessor="id" />
    <DataTable.Column header="Name" accessor="name" />
  </DataTable>
);

export const WithEmptyState = (args) => (
  <DataTable
    data={[]}
    emptyState={
      <div className="my-10 flex justify-center items-center flex-col gap-3">
        <Icon type="warning" variant="regular" className="text-3xl" />
        <Typography variant="h6">No results found.</Typography>
        <Typography variant="subtext" className="text-center">
          Try adjusting your search or filter to find
          <br /> what you are looking for.
        </Typography>
      </div>
    }
  >
    <DataTable.Column header="ID" accessor="id" />
    <DataTable.Column header="Name" accessor="name" title="name" />
  </DataTable>
);

export const WithFooter = (args) => (
  <DataTable data={smallData} showFooter={true}>
    <DataTable.Column header="ID" accessor="id" />
    <DataTable.Column header="Name" footer="This is a footer" accessor="name" />
  </DataTable>
);

export const WithFooterUsingLocalSummary = () => {
  // incl-code
  const data = [
    { id: 1, name: "John", age: 15 },
    { id: 2, name: "Mark", age: 25 },
    { id: 1, name: "Bill", age: 20 },
  ];

  // using the provided "useLocalSummary" hook...
  // ...select 'age' column by accessor value and average all the values from that column
  const summary = useLocalSummary(data, [
    { key: "age", operation: "average" },
    { key: "age", operation: "sum" },
  ]);

  return (
    <DataTable data={data} showFooter={true}>
      <DataTable.Column header="ID" accessor="id" />
      <DataTable.Column header="Name" accessor="name" />
      <DataTable.Column
        header="Age"
        footer={`Average: ${summary.age.average}, Sum: ${summary.age.sum}`}
        accessor="age"
        align="right"
      />
    </DataTable>
  );
};

export const WithClickableRows = () => {
  // incl-code
  const [selectedRow, setSelectedRow] = useState<Item>();

  return (
    <>
      <DataTable
        data={[
          {
            id: 1,
            name: "Emily",
            surname: "Moore",
            age: 12,
            appliedFor: "Nurse",
            jobDescription:
              "You will be tasked with caring for pediatric patients with a variety of health conditions and challenges as well as collaborating with physicians to provide the highest-quality care possible to each individual. As a registered nurse on staff, you will communicate orders to medical assistants and other team members and coordinate with staff and families to ensure the adherence to the attending physician’s instructions as well as proper care and disease control practices.",
            salary: {
              annual: 60000,
              bonus: 1000,
            },
          },
          {
            id: 2,
            name: "Michael",
            surname: "Williams",
            age: 25,
            appliedFor: "Teacher",
            jobDescription:
              "The teaching profession is exciting and challenging. Teachers act as role models, mentors, caregivers and advisers. They can have a profound effect on the lives of their students.",
            salary: {
              annual: 72000,
              bonus: 1200,
            },
          },
          {
            id: 3,
            name: "Sarah",
            surname: "Brown",
            age: 38,
            appliedFor: "Software developer",
            jobDescription:
              "The job of a software developer depends on the needs of the company, organization or team they are on. Some build and maintain systems that run devices and networks. Others develop applications that make it possible for people to perform specific tasks on computers, cellphones or other devices.",
            salary: {
              annual: 84000,
              bonus: 1400,
            },
          },
          {
            id: 4,
            name: "Matthew",
            surname: "Davis",
            age: 1,
            appliedFor: "Lawyer",
            jobDescription:
              "A lawyer provides counsel and represents businesses, individuals, and government agencies in legal matters and disputes. A lawyer'ss main duties are to uphold the law while protecting a client's rights. Lawyers advise, research, and collect evidence or information, draft legal documents such as contracts, divorces, or real estate transactions, and defend or prosecute in court",
            salary: {
              annual: 96000,
              bonus: 1600,
            },
          },
        ]}
        onClick={setSelectedRow}
      >
        <DataTable.Column header="ID" accessor="id" />
        <DataTable.Column header="Name" accessor="name" />
      </DataTable>
      <Typography>
        Clicked: <b>{selectedRow?.name || "-"}</b>
      </Typography>
    </>
  );
};

export const WithDoubleClickableRows = () => {
  // incl-code
  const [selectedRow, setSelectedRow] = useState<Item>();

  return (
    <>
      <DataTable
        data={[
          {
            id: 1,
            name: "Emily",
            surname: "Moore",
            age: 12,
            appliedFor: "Nurse",
            jobDescription:
              "You will be tasked with caring for pediatric patients with a variety of health conditions and challenges as well as collaborating with physicians to provide the highest-quality care possible to each individual. As a registered nurse on staff, you will communicate orders to medical assistants and other team members and coordinate with staff and families to ensure the adherence to the attending physician’s instructions as well as proper care and disease control practices.",
            salary: {
              annual: 60000,
              bonus: 1000,
            },
          },
          {
            id: 2,
            name: "Michael",
            surname: "Williams",
            age: 25,
            appliedFor: "Teacher",
            jobDescription:
              "The teaching profession is exciting and challenging. Teachers act as role models, mentors, caregivers and advisers. They can have a profound effect on the lives of their students.",
            salary: {
              annual: 72000,
              bonus: 1200,
            },
          },
          {
            id: 3,
            name: "Sarah",
            surname: "Brown",
            age: 38,
            appliedFor: "Software developer",
            jobDescription:
              "The job of a software developer depends on the needs of the company, organization or team they are on. Some build and maintain systems that run devices and networks. Others develop applications that make it possible for people to perform specific tasks on computers, cellphones or other devices.",
            salary: {
              annual: 84000,
              bonus: 1400,
            },
          },
          {
            id: 4,
            name: "Matthew",
            surname: "Davis",
            age: 1,
            appliedFor: "Lawyer",
            jobDescription:
              "A lawyer provides counsel and represents businesses, individuals, and government agencies in legal matters and disputes. A lawyer'ss main duties are to uphold the law while protecting a client's rights. Lawyers advise, research, and collect evidence or information, draft legal documents such as contracts, divorces, or real estate transactions, and defend or prosecute in court",
            salary: {
              annual: 96000,
              bonus: 1600,
            },
          },
        ]}
        onDoubleClick={setSelectedRow}
      >
        <DataTable.Column header="ID" accessor="id" />
        <DataTable.Column header="Name" accessor="name" />
      </DataTable>
      <Typography>
        Double-clicked: <b>{selectedRow?.name || "-"}</b>
      </Typography>
    </>
  );
};

export const WithoutHeader = (args) => (
  <DataTable data={smallData} showHeader={false}>
    <DataTable.Column header="ID" accessor="id" />
    <DataTable.Column header="Name" accessor="name" />
  </DataTable>
);

export const WithExpanderAtBeginning = (args) => (
  <DataTable data={smallData}>
    <DataTable.Expander>
      {(item: Item) => (
        <span>
          <b>Age: </b>
          {item.age}
        </span>
      )}
    </DataTable.Expander>
    <DataTable.Column header="ID" accessor="id" />
    <DataTable.Column header="Name" accessor="name" />
  </DataTable>
);

export const WithExpanderAtEnd = (args) => (
  <DataTable data={smallData}>
    <DataTable.Column header="ID" accessor="id" />
    <DataTable.Column header="Name" accessor="name" />
    <DataTable.Expander>
      {(item: Item) => (
        <span>
          <b>Age: </b>
          {item.age}
        </span>
      )}
    </DataTable.Expander>
  </DataTable>
);

export const WithCustomExpander = (args) => (
  <DataTable data={smallData}>
    <DataTable.Column header="ID" id="id">
      {(item: Item, index, row) => <Link onClick={() => row.toggleRowExpanded(!row.isExpanded)}>{item.id}</Link>}
    </DataTable.Column>
    <DataTable.Column header="Name" accessor="name" />
    <DataTable.Expander>
      {(item: Item) => (
        <span>
          <b>Age: </b>
          {item.age}
        </span>
      )}
    </DataTable.Expander>
  </DataTable>
);

export const WithSelectorAtBeginning = () => {
  // incl-code
  const [, dataTableHook] = useDataTable();

  return (
    <DataTable
      data={[
        {
          id: 1,
          name: "Emily",
          surname: "Moore",
          age: 12,
          appliedFor: "Nurse",
          jobDescription:
            "You will be tasked with caring for pediatric patients with a variety of health conditions and challenges as well as collaborating with physicians to provide the highest-quality care possible to each individual. As a registered nurse on staff, you will communicate orders to medical assistants and other team members and coordinate with staff and families to ensure the adherence to the attending physician’s instructions as well as proper care and disease control practices.",
          salary: {
            annual: 60000,
            bonus: 1000,
          },
        },
        {
          id: 2,
          name: "Michael",
          surname: "Williams",
          age: 25,
          appliedFor: "Teacher",
          jobDescription:
            "The teaching profession is exciting and challenging. Teachers act as role models, mentors, caregivers and advisers. They can have a profound effect on the lives of their students.",
          salary: {
            annual: 72000,
            bonus: 1200,
          },
        },
        {
          id: 3,
          name: "Sarah",
          surname: "Brown",
          age: 38,
          appliedFor: "Software developer",
          jobDescription:
            "The job of a software developer depends on the needs of the company, organization or team they are on. Some build and maintain systems that run devices and networks. Others develop applications that make it possible for people to perform specific tasks on computers, cellphones or other devices.",
          salary: {
            annual: 84000,
            bonus: 1400,
          },
        },
        {
          id: 4,
          name: "Matthew",
          surname: "Davis",
          age: 1,
          appliedFor: "Lawyer",
          jobDescription:
            "A lawyer provides counsel and represents businesses, individuals, and government agencies in legal matters and disputes. A lawyer'ss main duties are to uphold the law while protecting a client's rights. Lawyers advise, research, and collect evidence or information, draft legal documents such as contracts, divorces, or real estate transactions, and defend or prosecute in court",
          salary: {
            annual: 96000,
            bonus: 1600,
          },
        },
      ]}
      hook={dataTableHook}
    >
      <DataTable.Selector />
      <DataTable.Column header="ID" accessor="id" />
      <DataTable.Column header="Name" accessor="name" />
    </DataTable>
  );
};

export const WithSelectorAtEnd = () => {
  // incl-code
  const [, dataTableHook] = useDataTable();

  return (
    <DataTable
      data={[
        {
          id: 1,
          name: "Emily",
          surname: "Moore",
          age: 12,
          appliedFor: "Nurse",
          jobDescription:
            "You will be tasked with caring for pediatric patients with a variety of health conditions and challenges as well as collaborating with physicians to provide the highest-quality care possible to each individual. As a registered nurse on staff, you will communicate orders to medical assistants and other team members and coordinate with staff and families to ensure the adherence to the attending physician’s instructions as well as proper care and disease control practices.",
          salary: {
            annual: 60000,
            bonus: 1000,
          },
        },
        {
          id: 2,
          name: "Michael",
          surname: "Williams",
          age: 25,
          appliedFor: "Teacher",
          jobDescription:
            "The teaching profession is exciting and challenging. Teachers act as role models, mentors, caregivers and advisers. They can have a profound effect on the lives of their students.",
          salary: {
            annual: 72000,
            bonus: 1200,
          },
        },
        {
          id: 3,
          name: "Sarah",
          surname: "Brown",
          age: 38,
          appliedFor: "Software developer",
          jobDescription:
            "The job of a software developer depends on the needs of the company, organization or team they are on. Some build and maintain systems that run devices and networks. Others develop applications that make it possible for people to perform specific tasks on computers, cellphones or other devices.",
          salary: {
            annual: 84000,
            bonus: 1400,
          },
        },
        {
          id: 4,
          name: "Matthew",
          surname: "Davis",
          age: 1,
          appliedFor: "Lawyer",
          jobDescription:
            "A lawyer provides counsel and represents businesses, individuals, and government agencies in legal matters and disputes. A lawyer'ss main duties are to uphold the law while protecting a client's rights. Lawyers advise, research, and collect evidence or information, draft legal documents such as contracts, divorces, or real estate transactions, and defend or prosecute in court",
          salary: {
            annual: 96000,
            bonus: 1600,
          },
        },
      ]}
      hook={dataTableHook}
    >
      <DataTable.Column header="ID" accessor="id" />
      <DataTable.Column header="Name" accessor="name" />
      <DataTable.Selector />
    </DataTable>
  );
};

export const WithConditionalSelectorAtEnd = () => {
  // incl-code
  const [dataTableState, dataTableHook] = useDataTable();

  return (
    <>
      <DataTable.CardHeader {...dataTableState} totalElements={5}>
        <DataTable.CardHeader.Title>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Items</h3>
        </DataTable.CardHeader.Title>
        <DataTable.CardHeader.Actions>
          <Button>Execute</Button>
        </DataTable.CardHeader.Actions>
      </DataTable.CardHeader>
      <DataTable
        data={[
          {
            id: 1,
            name: "Emily",
            surname: "Moore",
            age: 12,
            appliedFor: "Nurse",
            jobDescription:
              "You will be tasked with caring for pediatric patients with a variety of health conditions and challenges as well as collaborating with physicians to provide the highest-quality care possible to each individual. As a registered nurse on staff, you will communicate orders to medical assistants and other team members and coordinate with staff and families to ensure the adherence to the attending physician’s instructions as well as proper care and disease control practices.",
            salary: {
              annual: 60000,
              bonus: 1000,
            },
          },
          {
            id: 2,
            name: "Michael",
            surname: "Williams",
            age: 25,
            appliedFor: "Teacher",
            jobDescription:
              "The teaching profession is exciting and challenging. Teachers act as role models, mentors, caregivers and advisers. They can have a profound effect on the lives of their students.",
            salary: {
              annual: 72000,
              bonus: 1200,
            },
          },
          {
            id: 3,
            name: "Sarah",
            surname: "Brown",
            age: 38,
            appliedFor: "Software developer",
            jobDescription:
              "The job of a software developer depends on the needs of the company, organization or team they are on. Some build and maintain systems that run devices and networks. Others develop applications that make it possible for people to perform specific tasks on computers, cellphones or other devices.",
            salary: {
              annual: 84000,
              bonus: 1400,
            },
          },
          {
            id: 4,
            name: "Matthew",
            surname: "Davis",
            age: 1,
            appliedFor: "Lawyer",
            jobDescription:
              "A lawyer provides counsel and represents businesses, individuals, and government agencies in legal matters and disputes. A lawyer'ss main duties are to uphold the law while protecting a client's rights. Lawyers advise, research, and collect evidence or information, draft legal documents such as contracts, divorces, or real estate transactions, and defend or prosecute in court",
            salary: {
              annual: 96000,
              bonus: 1600,
            },
          },
        ]}
        hook={dataTableHook}
      >
        <DataTable.Column header="ID" accessor="id" />
        <DataTable.Column header="Name" accessor="name" />
        <DataTable.Selector predicate={(item: Item, index: number) => index % 2 === 1}>
          {(item, index, row, predicate) =>
            predicate ? <p>Custom Component</p> : <DataTable.SelectorCell row={row} />
          }
        </DataTable.Selector>
      </DataTable>
    </>
  );
};

export const WithSelectorAndActions = () => {
  // incl-code
  const [dataTableState, dataTableHook] = useDataTable();
  const [paginationState, paginationHook] = useLocalPagination(smallData);

  const onExecute = () => {
    dataTableHook.setSelected({}, false);
  };

  return (
    <Card>
      <Card.Body removeSpacing={true}>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
          <DataTable.CardHeader.Actions>
            <Button onClick={onExecute}>Execute</Button>
            <Button>Delete</Button>
          </DataTable.CardHeader.Actions>
        </DataTable.CardHeader>
        <DataTable
          data={[
            {
              id: 1,
              name: "Emily",
              surname: "Moore",
              age: 12,
              appliedFor: "Nurse",
              jobDescription:
                "You will be tasked with caring for pediatric patients with a variety of health conditions and challenges as well as collaborating with physicians to provide the highest-quality care possible to each individual. As a registered nurse on staff, you will communicate orders to medical assistants and other team members and coordinate with staff and families to ensure the adherence to the attending physician’s instructions as well as proper care and disease control practices.",
              salary: {
                annual: 60000,
                bonus: 1000,
              },
            },
            {
              id: 2,
              name: "Michael",
              surname: "Williams",
              age: 25,
              appliedFor: "Teacher",
              jobDescription:
                "The teaching profession is exciting and challenging. Teachers act as role models, mentors, caregivers and advisers. They can have a profound effect on the lives of their students.",
              salary: {
                annual: 72000,
                bonus: 1200,
              },
            },
            {
              id: 3,
              name: "Sarah",
              surname: "Brown",
              age: 38,
              appliedFor: "Software developer",
              jobDescription:
                "The job of a software developer depends on the needs of the company, organization or team they are on. Some build and maintain systems that run devices and networks. Others develop applications that make it possible for people to perform specific tasks on computers, cellphones or other devices.",
              salary: {
                annual: 84000,
                bonus: 1400,
              },
            },
            {
              id: 4,
              name: "Matthew",
              surname: "Davis",
              age: 1,
              appliedFor: "Lawyer",
              jobDescription:
                "A lawyer provides counsel and represents businesses, individuals, and government agencies in legal matters and disputes. A lawyer'ss main duties are to uphold the law while protecting a client's rights. Lawyers advise, research, and collect evidence or information, draft legal documents such as contracts, divorces, or real estate transactions, and defend or prosecute in court",
              salary: {
                annual: 96000,
                bonus: 1600,
              },
            },
          ]}
          hook={dataTableHook}
        >
          <DataTable.Column header="ID" accessor="id" />
          <DataTable.Column header="Name" accessor="name" />
          <DataTable.Selector />
        </DataTable>
      </Card.Body>
      <Card.Footer>
        <Pagination {...paginationState} {...paginationHook} />
      </Card.Footer>
    </Card>
  );
};

export const WithSelectorAndDropdownActions = () => {
  // incl-code
  const [dataTableState, dataTableHook] = useDataTable();
  const [paginationState, paginationHook] = useLocalPagination(smallData);

  return (
    <Card>
      <Card.Body removeSpacing={true}>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
          <DataTable.CardHeader.Actions>
            <DropdownMenu title="test">
              <DropdownMenu.Item onSelect={() => {}}>Execute</DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => {}}>Delete</DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => {}}>Report</DropdownMenu.Item>
            </DropdownMenu>
          </DataTable.CardHeader.Actions>
        </DataTable.CardHeader>
        <DataTable
          data={[
            {
              id: 1,
              name: "Emily",
              surname: "Moore",
              age: 12,
              appliedFor: "Nurse",
              jobDescription:
                "You will be tasked with caring for pediatric patients with a variety of health conditions and challenges as well as collaborating with physicians to provide the highest-quality care possible to each individual. As a registered nurse on staff, you will communicate orders to medical assistants and other team members and coordinate with staff and families to ensure the adherence to the attending physician’s instructions as well as proper care and disease control practices.",
              salary: {
                annual: 60000,
                bonus: 1000,
              },
            },
            {
              id: 2,
              name: "Michael",
              surname: "Williams",
              age: 25,
              appliedFor: "Teacher",
              jobDescription:
                "The teaching profession is exciting and challenging. Teachers act as role models, mentors, caregivers and advisers. They can have a profound effect on the lives of their students.",
              salary: {
                annual: 72000,
                bonus: 1200,
              },
            },
            {
              id: 3,
              name: "Sarah",
              surname: "Brown",
              age: 38,
              appliedFor: "Software developer",
              jobDescription:
                "The job of a software developer depends on the needs of the company, organization or team they are on. Some build and maintain systems that run devices and networks. Others develop applications that make it possible for people to perform specific tasks on computers, cellphones or other devices.",
              salary: {
                annual: 84000,
                bonus: 1400,
              },
            },
            {
              id: 4,
              name: "Matthew",
              surname: "Davis",
              age: 1,
              appliedFor: "Lawyer",
              jobDescription:
                "A lawyer provides counsel and represents businesses, individuals, and government agencies in legal matters and disputes. A lawyer'ss main duties are to uphold the law while protecting a client's rights. Lawyers advise, research, and collect evidence or information, draft legal documents such as contracts, divorces, or real estate transactions, and defend or prosecute in court",
              salary: {
                annual: 96000,
                bonus: 1600,
              },
            },
          ]}
          hook={dataTableHook}
        >
          <DataTable.Column header="ID" accessor="id" />
          <DataTable.Column header="Name" accessor="name" />
          <DataTable.Selector />
        </DataTable>
      </Card.Body>
      <Card.Footer>
        <Pagination {...paginationState} {...paginationHook} />
      </Card.Footer>
    </Card>
  );
};

export const WithSelectorAndActionsHidden = () => {
  // incl-code
  const [dataTableState, dataTableHook] = useDataTable();
  const [paginationState, paginationHook] = useLocalPagination(smallData);
  const hidden = dataTableState.selectedCount === 0;

  const onExecute = () => {
    dataTableHook.setSelected({}, false);
  };

  return (
    <Card>
      <Card.Body removeSpacing={true}>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
          <DataTable.CardHeader.Actions>
            <Button onClick={onExecute}>Execute</Button>
            <Button hidden={hidden}>Delete</Button>
          </DataTable.CardHeader.Actions>
        </DataTable.CardHeader>
        <DataTable
          data={[
            {
              id: 1,
              name: "Emily",
              surname: "Moore",
              age: 12,
              appliedFor: "Nurse",
              jobDescription:
                "You will be tasked with caring for pediatric patients with a variety of health conditions and challenges as well as collaborating with physicians to provide the highest-quality care possible to each individual. As a registered nurse on staff, you will communicate orders to medical assistants and other team members and coordinate with staff and families to ensure the adherence to the attending physician’s instructions as well as proper care and disease control practices.",
              salary: {
                annual: 60000,
                bonus: 1000,
              },
            },
            {
              id: 2,
              name: "Michael",
              surname: "Williams",
              age: 25,
              appliedFor: "Teacher",
              jobDescription:
                "The teaching profession is exciting and challenging. Teachers act as role models, mentors, caregivers and advisers. They can have a profound effect on the lives of their students.",
              salary: {
                annual: 72000,
                bonus: 1200,
              },
            },
            {
              id: 3,
              name: "Sarah",
              surname: "Brown",
              age: 38,
              appliedFor: "Software developer",
              jobDescription:
                "The job of a software developer depends on the needs of the company, organization or team they are on. Some build and maintain systems that run devices and networks. Others develop applications that make it possible for people to perform specific tasks on computers, cellphones or other devices.",
              salary: {
                annual: 84000,
                bonus: 1400,
              },
            },
            {
              id: 4,
              name: "Matthew",
              surname: "Davis",
              age: 1,
              appliedFor: "Lawyer",
              jobDescription:
                "A lawyer provides counsel and represents businesses, individuals, and government agencies in legal matters and disputes. A lawyer'ss main duties are to uphold the law while protecting a client's rights. Lawyers advise, research, and collect evidence or information, draft legal documents such as contracts, divorces, or real estate transactions, and defend or prosecute in court",
              salary: {
                annual: 96000,
                bonus: 1600,
              },
            },
          ]}
          hook={dataTableHook}
        >
          <DataTable.Column header="ID" accessor="id" />
          <DataTable.Column header="Name" accessor="name" />
          <DataTable.Selector />
        </DataTable>
      </Card.Body>
      <Card.Footer>
        <Pagination {...paginationState} {...paginationHook} />
      </Card.Footer>
    </Card>
  );
};

export const WithCustomComponent = (args) => (
  <DataTable data={smallData}>
    <DataTable.Column header="Index" id="index">
      {(_, index) => <>{index}.</>}
    </DataTable.Column>
    <DataTable.Column header="ID" accessor="id" />
    <DataTable.Column header="Name" accessor="name" />
    <DataTable.Column header="Age" id="age">
      {(item: Item) => <>{item.age} years</>}
    </DataTable.Column>
  </DataTable>
);

export const WithTextWrapping = (args) => (
  <DataTable data={smallData}>
    <DataTable.Column header="Name-01" id="name-01" className="whitespace-normal">
      {(item: Item) => (
        <>
          {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name}
          {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name}
          {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name}
        </>
      )}
    </DataTable.Column>
    <DataTable.Column header="Name-02" id="name-02" className="whitespace-normal">
      {(item: Item) => (
        <>
          {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name}
          {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name}
          {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name}
        </>
      )}
    </DataTable.Column>
    <DataTable.Column header="Name-03" id="name-03" className="whitespace-normal">
      {(item: Item) => (
        <>
          {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name}
          {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name}
          {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name} {item.name}
        </>
      )}
    </DataTable.Column>
  </DataTable>
);

export const WithHorizontalScroll = (args) => (
  <DataTable data={smallData}>
    <DataTable.Column header="Name-01" id="name-01" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-02" id="name-02" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-03" id="name-03" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-04" id="name-04" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-05" id="name-05" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-06" id="name-06" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-07" id="name-07" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-08" id="name-08" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-09" id="name-09" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-10" id="name-10" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-11" id="name-11" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-12" id="name-12" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-13" id="name-13" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-14" id="name-14" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-15" id="name-15" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-16" id="name-16" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-17" id="name-17" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-18" id="name-18" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-19" id="name-19" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-20" id="name-20" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
  </DataTable>
);

export const WithHorizontalScrollAndFirstColumnFixed = (args) => (
  <DataTable data={smallData} firstColumnFixed>
    <DataTable.Column header="Name-01" id="name-01" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-02" id="name-02" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-03" id="name-03" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-04" id="name-04" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-05" id="name-05" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-06" id="name-06" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-07" id="name-07" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-08" id="name-08" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-09" id="name-09" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-10" id="name-10" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-11" id="name-11" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-12" id="name-12" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-13" id="name-13" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-14" id="name-14" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-15" id="name-15" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-16" id="name-16" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-17" id="name-17" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-18" id="name-18" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-19" id="name-19" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-20" id="name-20" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
  </DataTable>
);

export const WithHorizontalScrollAndLastColumnFixed = (args) => (
  <DataTable data={smallData} lastColumnFixed>
    <DataTable.Column header="Name-01" id="name-01" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-02" id="name-02" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-03" id="name-03" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-04" id="name-04" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-05" id="name-05" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-06" id="name-06" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-07" id="name-07" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-08" id="name-08" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-09" id="name-09" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-10" id="name-10" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-11" id="name-11" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-12" id="name-12" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-13" id="name-13" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-14" id="name-14" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-15" id="name-15" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-16" id="name-16" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-17" id="name-17" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-18" id="name-18" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-19" id="name-19" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
    <DataTable.Column header="Name-20" id="name-20" className="max-w-md">
      {(item: Item) => <>{item.name}</>}
    </DataTable.Column>
  </DataTable>
);

export const WithDefaultAscendingSortByName = (args) => {
  // incl-code
  const [dataTableState, dataTableHook] = useDataTable({
    defaultSortBy: [
      {
        column: "name",
        sortDirection: "ASCENDING",
      },
    ],
  });

  // custom sorting logic triggered when changing the sorting (asc/desc/none)
  const sortedData = React.useMemo(() => {
    return [...smallData].sort((a, b) => {
      const sortInfo = dataTableState.sortBy[0] ?? { column: "", sortDirection: "ASCENDING" };

      if (a[sortInfo.column] !== undefined && b[sortInfo.column] !== undefined) {
        const result = a[sortInfo.column].localeCompare(b[sortInfo.column]);
        return sortInfo.sortDirection === "DESCENDING" ? -result : result;
      }

      return 0;
    });
  }, [dataTableState.sortBy]);

  return (
    <DataTable data={sortedData} hook={dataTableHook} defaultSortBy={dataTableState.sortBy}>
      <DataTable.Column header="ID" accessor="id" canSort={false} />
      <DataTable.Column header="Name" accessor="name" canSort={true} />
    </DataTable>
  );
};

export const WithDefaultAscendingSortUsingHook = () => {
  // incl-code
  const columnMapping = {
    name: "name",
    surname: "surname",
  };

  const { dataTableHook, sortedData } = useSortableDataTable(allData || [], columnMapping);

  return (
    <DataTable
      data={sortedData}
      hook={dataTableHook}
      defaultSortBy={[
        {
          column: "name",
          sortDirection: "ASCENDING",
        },
        {
          column: "surname",
          sortDirection: "ASCENDING",
        },
      ]}
    >
      <DataTable.Column header="ID" accessor="id" canSort={false} />
      <DataTable.Column header="Name" accessor="name" canSort={true} />
      <DataTable.Column header="Surname" accessor="surname" canSort={true} />
    </DataTable>
  );
};

export const WithDefaultAscendingMultiSort = () => {
  const [dataTableState, dataTableHook] = useDataTable({
    defaultSortBy: [
      {
        column: "name",
        sortDirection: "ASCENDING",
      },
      {
        column: "surname",
        sortDirection: "ASCENDING",
      },
    ],
  });

  const columnMapping = {
    name: "name",
    surname: "surname",
  };

  const sortedData = React.useMemo(() => {
    const sortInstructions = dataTableState.sortBy;

    if (!sortInstructions || sortInstructions.length === 0) {
      return [...allData];
    }

    return [...allData].sort((a, b) =>
      sortInstructions.reduce((result, sortInfo) => {
        const columnKey = columnMapping[sortInfo.column];

        if (result === 0 && a[columnKey] !== undefined && b[columnKey] !== undefined) {
          const result = a[columnKey].localeCompare(b[columnKey]);
          return sortInfo.sortDirection === "DESCENDING" ? -result : result;
        }

        return result;
      }, 0),
    );
  }, [dataTableState.sortBy]);

  return (
    <DataTable data={sortedData} hook={dataTableHook} defaultSortBy={dataTableState.sortBy} multiSort>
      <DataTable.Column header="ID" accessor="id" canSort={false} />
      <DataTable.Column header="Name" accessor="name" canSort={true} />
      <DataTable.Column header="Surname" accessor="surname" canSort={true} />
    </DataTable>
  );
};

export const WithIconButtons = (args) => (
  <DataTable data={smallData}>
    <DataTable.Column header="ID" accessor="id" />
    <DataTable.Column header="Name" accessor="name" />
    <DataTable.Column header="Edit" id="edit" canSort={false}>
      {(item: Item) => (
        <div className="flex justify-start items-center space-x-1">
          <IconButton icon={<Icon type="pencil-simple" variant="fill" className="text-gray-500" />} label="Edit" />
          <IconButton icon={<Icon type="trash" variant="fill" className="text-gray-500" />} label="Delete" />
        </div>
      )}
    </DataTable.Column>
    <DataTable.Column header="View" id="view" canSort={false}>
      {(item: Item) => <IconButton icon={<Icon type="eye" variant="fill" className="text-gray-500" />} label="View" />}
    </DataTable.Column>
  </DataTable>
);

export const WithPrimaryAndSecondaryRows = (args) => (
  <DataTable data={smallData}>
    <DataTable.PrimaryRow>
      <DataTable.Column header="ID" accessor="id" />
      <DataTable.Column header="Name" accessor="name" />
      <DataTable.Column header="Surname" accessor="surname" />
    </DataTable.PrimaryRow>
    <DataTable.SecondaryRow>
      <DataTable.Column header="Age" accessor="age" />
      <DataTable.Column header="Applied for" accessor="appliedFor" />
      <DataTable.Column header="Expected salary:" accessor="salary.annual" />
    </DataTable.SecondaryRow>
  </DataTable>
);

export const WithPrimaryAndSecondaryRowsAndComplexValues = (args) => (
  <DataTable data={smallData}>
    <DataTable.PrimaryRow>
      <DataTable.Column header="Index" id="index">
        {(_, index) => <>{index}.</>}
      </DataTable.Column>
      <DataTable.Column header="ID" accessor="id" />
      <DataTable.Column header="Name" accessor="name" />
      <DataTable.Column header="Surname" accessor="surname" />
      <DataTable.Column header="Age" accessor="age" />
      <DataTable.Column header="Applied for:" accessor="appliedFor" />
    </DataTable.PrimaryRow>
    <DataTable.SecondaryRow>
      <DataTable.Column id="dummyId">{() => <></>}</DataTable.Column>
      <DataTable.Column header="Job description:" accessor="jobDescription" colSpan={3} />
      <DataTable.Column header="Expected salary:" accessor="salary.annual" />
      <DataTable.Column header="Salary bonus:" id="salary.bonus" className="max-w-md">
        {(item: Item) => <>{item.salary.bonus}</>}
      </DataTable.Column>
    </DataTable.SecondaryRow>
  </DataTable>
);

export const WithPrimaryAndSecondaryRowsAndColSpan = (args) => (
  <DataTable data={smallData}>
    <DataTable.PrimaryRow>
      <DataTable.Column header="ID" accessor="id" />
      <DataTable.Column header="Name" accessor="name" />
      <DataTable.Column header="Surname" accessor="surname" />
      <DataTable.Column header="Age" accessor="age" />
      <DataTable.Column header="Applied for:" accessor="appliedFor" />
    </DataTable.PrimaryRow>
    <DataTable.SecondaryRow>
      <DataTable.Column id="dummyId">{() => <></>}</DataTable.Column>
      <DataTable.Column header="Job description:" accessor="jobDescription" colSpan={3} />
      <DataTable.Column header="Expected salary:" accessor="salary.annual" />
    </DataTable.SecondaryRow>
  </DataTable>
);

export const WithContentAlignedRight = (args) => (
  <DataTable data={smallData} alignHeader="right">
    <DataTable.Column header="ID" accessor="id" align="right" />
    <DataTable.Column header="Name" accessor="name" align="right" />
  </DataTable>
);

export const WithContentCentered = (args) => (
  <DataTable data={smallData} alignHeader="center">
    <DataTable.Column header="ID" accessor="id" align="center" />
    <DataTable.Column header="Name" accessor="name" align="center" />
  </DataTable>
);

export const WithRowClassName = () => {
  // incl-code
  const getRowClassName = (item: Item) => {
    if (item.id % 2 === 0) {
      return "bg-pink-200";
    } else {
      return "bg-purple-200";
    }
  };

  return (
    <DataTable
      data={[
        {
          id: 1,
          name: "Emily",
          surname: "Moore",
          age: 12,
          appliedFor: "Nurse",
          jobDescription:
            "You will be tasked with caring for pediatric patients with a variety of health conditions and challenges as well as collaborating with physicians to provide the highest-quality care possible to each individual. As a registered nurse on staff, you will communicate orders to medical assistants and other team members and coordinate with staff and families to ensure the adherence to the attending physician’s instructions as well as proper care and disease control practices.",
          salary: {
            annual: 60000,
            bonus: 1000,
          },
        },
        {
          id: 2,
          name: "Michael",
          surname: "Williams",
          age: 25,
          appliedFor: "Teacher",
          jobDescription:
            "The teaching profession is exciting and challenging. Teachers act as role models, mentors, caregivers and advisers. They can have a profound effect on the lives of their students.",
          salary: {
            annual: 72000,
            bonus: 1200,
          },
        },
        {
          id: 3,
          name: "Sarah",
          surname: "Brown",
          age: 38,
          appliedFor: "Software developer",
          jobDescription:
            "The job of a software developer depends on the needs of the company, organization or team they are on. Some build and maintain systems that run devices and networks. Others develop applications that make it possible for people to perform specific tasks on computers, cellphones or other devices.",
          salary: {
            annual: 84000,
            bonus: 1400,
          },
        },
        {
          id: 4,
          name: "Matthew",
          surname: "Davis",
          age: 1,
          appliedFor: "Lawyer",
          jobDescription:
            "A lawyer provides counsel and represents businesses, individuals, and government agencies in legal matters and disputes. A lawyer'ss main duties are to uphold the law while protecting a client's rights. Lawyers advise, research, and collect evidence or information, draft legal documents such as contracts, divorces, or real estate transactions, and defend or prosecute in court",
          salary: {
            annual: 96000,
            bonus: 1600,
          },
        },
      ]}
      getRowClassName={getRowClassName}
    >
      <DataTable.Column header="ID" accessor="id" />
      <DataTable.Column header="Name" accessor="name" />
    </DataTable>
  );
};

const HideControls = {
  children: { control: { disable: true } },
  data: { control: { disable: true } },
  defaultSortBy: { control: { disable: true } },
  hook: { control: { disable: true } },
  rowEditingIndex: { control: { disable: true } },
  saveEnabled: { control: { disable: true } },
  lastColumnFixed: { control: { disable: true } },
  className: { control: { disable: true } },
  alignHeader: { control: { disable: true } },
  showHeader: { control: { disable: true } },
  withExpander: { control: { disable: true } },
  withSelector: { control: { disable: true } },
  withActions: { control: { disable: true } },
  withIconButtons: { control: { disable: true } },
  withHorizontalScroll: { control: { disable: true } },
  firstColumnFixed: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  tokens: { control: { disable: true } },
};

KitchenSink.argTypes = HideControls;
EmptyKitchenSink.argTypes = HideControls;
Simple.argTypes = HideControls;
WithEmptyState.argTypes = HideControls;
WithFooter.argTypes = HideControls;
WithFooterUsingLocalSummary.argTypes = HideControls;
WithClickableRows.argTypes = HideControls;
WithDoubleClickableRows.argTypes = HideControls;
WithoutHeader.argTypes = HideControls;
WithExpanderAtBeginning.argTypes = HideControls;
WithExpanderAtEnd.argTypes = HideControls;
WithCustomExpander.argTypes = HideControls;
WithSelectorAtBeginning.argTypes = HideControls;
WithSelectorAtEnd.argTypes = HideControls;
WithConditionalSelectorAtEnd.argTypes = HideControls;
WithSelectorAndActions.argTypes = HideControls;
WithSelectorAndDropdownActions.argTypes = HideControls;
WithSelectorAndActionsHidden.argTypes = HideControls;
WithCustomExpander.argTypes = HideControls;
WithTextWrapping.argTypes = HideControls;
WithHorizontalScroll.argTypes = HideControls;
WithHorizontalScrollAndFirstColumnFixed.argTypes = HideControls;
WithHorizontalScrollAndLastColumnFixed.argTypes = HideControls;
WithDefaultAscendingSortByName.argTypes = HideControls;
WithDefaultAscendingSortUsingHook.argTypes = HideControls;
WithDefaultAscendingMultiSort.argTypes = HideControls;
WithIconButtons.argTypes = HideControls;
WithPrimaryAndSecondaryRows.argTypes = HideControls;
WithPrimaryAndSecondaryRowsAndComplexValues.argTypes = HideControls;
WithPrimaryAndSecondaryRowsAndColSpan.argTypes = HideControls;
WithContentAlignedRight.argTypes = HideControls;
WithContentCentered.argTypes = HideControls;
WithRowClassName.argTypes = HideControls;
