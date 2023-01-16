import React from "react";

import { Button, Card, Container, PageHeading } from "@tiller-ds/core";
import { DescriptionList } from "@tiller-ds/data-display";
import { CheckboxGroup, Input, RadioGroup, Textarea } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

function App() {
  const candidatesHelp = "Lorem ipsum dolor sit amet. Lorem ipsum.";
  const candidatesLabel = "Candidates";
  const candidatesValue = "candidates";
  const commentsHelp = "Lorem ipsum dolor sit amet. Lorem ipsum.";
  const commentsLabel = "Comments";
  const commentsValue = "comments";
  const emailHelp = "Email notifications";
  const emailLabel = "By Email";
  const emailName = "emailNotifications";
  const offersHelp = "Lorem ipsum dolor sit amet. Lorem ipsum.";
  const offersLabel = "Offers";
  const offersValue = "offers";
  const help = "Email notification";
  const label = "By Email";
  const name = "emailNotifications";

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
            <CheckboxGroup name={emailName} label={emailLabel} help={emailHelp} value={valuesNone} onChange={() => {}}>
              <CheckboxGroup.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
              <CheckboxGroup.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} />
              <CheckboxGroup.Item label={offersLabel} value={offersValue} help={offersHelp} />
            </CheckboxGroup>
            <Input
              name={name}
              value=""
              label={<Intl name="Label" />}
              placeholder={"placeholder"}
              onChange={onChange}
              onBlur={onBlur}
              className="my-4"
            />
            <Input
              name={name}
              value=""
              label={<Intl name="Label" />}
              inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" onClick={onClick} />}
              onChange={onChange}
              onBlur={onBlur}
              className="mb-4"
            />
            <RadioGroup name={name} label={label} help={help} onChange={onChange} value={""}>
              <RadioGroup.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
              <RadioGroup.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} disabled={true} />
              <RadioGroup.Item label={offersLabel} value={offersValue} help={offersHelp} disabled={true} />
            </RadioGroup>
            <Textarea
              name={name}
              value=""
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
