import React from "react";

import { Button, Card, Container, PageHeading } from "@tiller-ds/core";
import { DescriptionList } from "@tiller-ds/data-display";
import { CheckboxGroup, Input, RadioGroup, Textarea } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import { EXAMPLE_DICTIONARY } from "./exampleDictionary";


function App() {
  const translations = EXAMPLE_DICTIONARY.translations;
  const language = "en";

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
            <CheckboxGroup name={translations[language]["emailName"]} label={translations[language]["emailLabel"]} help={translations[language]["emailHelp"]} value={valuesNone} onChange={() => {}}>
              <CheckboxGroup.Item label={translations[language]["commentsLabel"]} value={translations[language]["commentsValue"]} help={translations[language]["commentsHelp"]} />
              <CheckboxGroup.Item label={translations[language]["candidatesLabel"]} value={translations[language]["candidatesValue"]} help={translations[language]["candidatesHelp"]} />
              <CheckboxGroup.Item label={translations[language]["offersLabel"]} value={translations[language]["offersValue"]} help={translations[language]["offersHelp"]} />
            </CheckboxGroup>
            <Input
              name={name}
              value={translations[language]["value"]}
              label={<Intl name="Label" />}
              placeholder={"placeholder"}
              onChange={onChange}
              onBlur={onBlur}
              className="my-4"
            />
            <Input
              name={name}
              value={translations[language]["value"]}
              label={<Intl name="Label" />}
              inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" onClick={onClick} />}
              onChange={onChange}
              onBlur={onBlur}
              className="mb-4"
            />
            <RadioGroup name={translations[language]["name"]} label={translations[language]["label"]} help={translations[language]["help"]} onChange={onChange} value={""}>
              <RadioGroup.Item label={translations[language]["commentsLabel"]} value={translations[language]["commentsValue"]} help={translations[language]["commentsHelp"]} />
              <RadioGroup.Item label={translations[language]["candidatesLabel"]} value={translations[language]["candidatesValue"]} help={translations[language]["candidatesHelp"]} disabled={true} />
              <RadioGroup.Item label={translations[language]["offersLabel"]} value={translations[language]["offersValue"]} help={translations[language]["offersHelp"]} disabled={true} />
            </RadioGroup>
            <Textarea
              name={name}
              value={translations[language]["value"]}
              label={<Intl name="Label" />}
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
