import React from "react";

import { Button, Card, Container, PageHeading } from "@tiller-ds/core";
import { DescriptionList } from "@tiller-ds/data-display";
import { CheckboxGroup, Input, RadioGroup, Textarea } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

function App() {
  const value = "test";
  const valuesNone = {
    comments: false,
    candidates: false,
    offers: false,
  };

  const onChange = () => {};
  const onBlur = () => {};
  const onClick = () => {};

  return (
    <Container variant="constrainedPadded">
      <PageHeading>
        <PageHeading.Title>Test Tiller App</PageHeading.Title>
        <PageHeading.Subtitle>
          This is a test app. Experiment with the Tiller components according to your use case.
        </PageHeading.Subtitle>
      </PageHeading>
      <div className="flex mt-8">
        <div className="w-1/2">
          <Card className="p-8 mr-8">
            <CheckboxGroup
              name={name}
              label={<Intl name="emailLabel" />}
              help={<Intl name="emailHelp" />}
              value={valuesNone}
              onChange={() => {}}
            >
              <CheckboxGroup.Item
                label={<Intl name="commentsLabel" />}
                value={value}
                help={<Intl name="commentsHelp" />}
              />
              <CheckboxGroup.Item
                label={<Intl name="candidatesLabel" />}
                value={value}
                help={<Intl name="candidatesHelp" />}
              />
              <CheckboxGroup.Item label={<Intl name="offersLabel" />} value={value} help={<Intl name="offersHelp" />} />
            </CheckboxGroup>
            <Input
              name={name}
              value={value}
              label={<Intl name="label" />}
              placeholder={"placeholder"}
              onChange={onChange}
              onBlur={onBlur}
              className="my-4"
            />
            <Input
              name={name}
              value={value}
              label={<Intl name="label" />}
              inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" onClick={onClick} />}
              onChange={onChange}
              onBlur={onBlur}
              className="mb-4"
            />
            <RadioGroup
              name="name"
              label={<Intl name="name" />}
              help={<Intl name="label" />}
              onChange={onChange}
              value=""
            >
              <RadioGroup.Item
                label={<Intl name="commentsLabel" />}
                value={value}
                help={<Intl name="commentsHelp" />}
              />
              <RadioGroup.Item
                label={<Intl name="candidatesLabel" />}
                value={value}
                help={<Intl name="candidatesHelp" />}
                disabled={true}
              />
              <RadioGroup.Item
                label={<Intl name="offersLabel" />}
                value={value}
                help={<Intl name="offersHelp" />}
                disabled={true}
              />
            </RadioGroup>
            <Textarea
              name={name}
              value={value}
              label={<Intl name="label" />}
              onChange={onChange}
              onBlur={onBlur}
              className="mt-4"
            />
            <div className="flex justify-between mt-4">
              <Button variant="outlined" color="tertiary">
                Button
              </Button>
              <Button color="tertiary">Button</Button>
            </div>
          </Card>
        </div>
        <div className="w-1/2">
          <DescriptionList>
            <DescriptionList.Item label="Full name">Margot Foster</DescriptionList.Item>
            <DescriptionList.Item label="Application for">Backend Developer</DescriptionList.Item>
            <DescriptionList.Item label="Email address">margotfoster@example</DescriptionList.Item>
            <DescriptionList.Item label="Salary expectation">$120,000</DescriptionList.Item>
            <DescriptionList.Item label="About">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </DescriptionList.Item>
            <DescriptionList.Item label="Crimes">Triple homicide in Reno, Nevada.</DescriptionList.Item>
            <DescriptionList.Item label="Guns used">.357 Magnum, Tactical knife, flashbang</DescriptionList.Item>
          </DescriptionList>
        </div>
      </div>
    </Container>
  );
}

export default App;
