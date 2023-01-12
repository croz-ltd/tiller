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

import { Card, CardBodyProps } from "@tiller-ds/core";
import { createNamedContext } from "@tiller-ds/util";

import { FieldLabel } from "./Field";

type FormLayoutProps = {
  /**
   * Content wrapped in a form layout component.
   */
  children: React.ReactNode;

  /**
   * Defines how the Form Layout is displayed.
   * Each type defines the placement of the title, content and/or Card component.
   */
  type?: "simple" | "card" | "full-width";
};

type FormLayoutSectionProps = {
  /**
   * Title of the section (not exclusively text).
   */
  title?: React.ReactNode;

  /**
   * Subtitle of the section (not exclusively text).
   */
  subtitle?: React.ReactNode;

  /**
   * Content displayed inside the section.
   */
  children: React.ReactNode;
};

type FormLayoutSectionContentProps = {
  children: React.ReactNode;
} & CardBodyProps;

type FormLayoutSectionActionsProps = {
  children: React.ReactNode;
};

type FormLayoutFieldProps = {
  /**
   * Form layout field content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Form layout field label (not exclusively text).
   */
  label: React.ReactNode;

  /**
   * The accessor value for the field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * Text to display when hovering over a required symbol (*).
   * Useful for bilingual purposes.
   */
  requiredLabel?: string;
};

type FormLayoutContext = {
  type: "simple" | "card" | "full-width";
};

type FormLayoutSectionContext = {
  title: React.ReactNode;

  subtitle?: React.ReactNode;
};

const FormLayoutContext = createNamedContext<FormLayoutContext>("FormLayoutContext");
const FormLayoutSectionContext = createNamedContext<FormLayoutSectionContext>("FormLayoutSectionContext");

function FormLayout({ children, type = "simple" }: FormLayoutProps) {
  const formLayoutContext = React.useMemo(() => ({ type }), [type]);

  const childrenArray = React.Children.toArray(children);
  const result: React.ReactNode[] = [];

  for (let i = 0; i < childrenArray.length; i++) {
    if (i > 0) {
      if (type === "card") {
        result.push(
          <div key={i * 2} className="hidden sm:block">
            <div className="py-5">
              <div className="border-t border-gray-200">&nbsp;</div>
            </div>
          </div>
        );
      }

      const className =
        type === "simple" ? "mt-8 border-t border-gray-200 pt-8" : type === "card" ? "mt-10 sm:mt-0" : "mt-6";

      result.push(
        <div key={i * 2 + 1} className={className}>
          {childrenArray[i]}
        </div>
      );
    } else {
      result.push(<React.Fragment key={i * 2}>{childrenArray[i]}</React.Fragment>);
    }
  }

  return <FormLayoutContext.Provider value={formLayoutContext}>{result}</FormLayoutContext.Provider>;
}

export function FormLayoutSection({ title, subtitle, children }: FormLayoutSectionProps) {
  const context = React.useContext(FormLayoutContext);

  const sectionContext = React.useMemo(() => ({ title, subtitle }), [title, subtitle]);

  switch (context?.type ?? "") {
    case "simple":
      return (
        <div>
          <div>
            <h2 className="text-lg text-gray-900 font-medium leading-6">{title}</h2>
            <h6 className="text-sm text-gray-500 mt-1 leading-5">{subtitle}</h6>
          </div>
          {children}
        </div>
      );
    case "card":
      if (!sectionContext.title && !sectionContext.subtitle) {
        return (
          <div>
            <Card>{children}</Card>
          </div>
        );
      }
      return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-lg text-gray-900 font-medium leading-6">{title}</h2>
              <h6 className="text-sm text-gray-500 mt-1 leading-5">{subtitle}</h6>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <Card>{children}</Card>
          </div>
        </div>
      );

    case "full-width":
      return (
        <FormLayoutSectionContext.Provider value={sectionContext}>
          <Card>{children}</Card>
        </FormLayoutSectionContext.Provider>
      );
    default:
      return <>{children}</>;
  }
}

export function FormLayoutSectionContent({ children, ...props }: FormLayoutSectionContentProps) {
  const context = React.useContext(FormLayoutContext);
  const sectionContext = React.useContext(FormLayoutSectionContext);

  if (context?.type === "card") {
    return (
      <Card.Body {...props}>
        <div className="space-y-5">{children}</div>
      </Card.Body>
    );
  }

  if (context?.type === "full-width" && sectionContext) {
    return (
      <Card.Body {...props}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h2 className="text-lg text-gray-900 font-medium leading-6">{sectionContext.title}</h2>
            <h6 className="text-sm text-gray-500 mt-1 leading-5">{sectionContext.subtitle}</h6>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 space-y-10">{children}</div>
        </div>
      </Card.Body>
    );
  }

  return (
    <>
      {React.Children.map(children, (child, key) => (
        <div key={key} className="mt-6">
          {child}
        </div>
      ))}
    </>
  );
}

export function FormLayoutSectionActions({ children }: FormLayoutSectionActionsProps) {
  const context = React.useContext(FormLayoutContext);

  const result = <div className="flex justify-end">{children}</div>;

  if (context?.type === "card" || context?.type === "full-width") {
    return <Card.Footer>{result}</Card.Footer>;
  }

  return <div className="mt-8 border-t border-gray-200 pt-5">{result}</div>;
}

function FormLayoutField({ name, label, children, required, ...props }: FormLayoutFieldProps) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
      <FieldLabel label={label} required={required} {...props} />
      <div className="mt-1 sm:mt-0 sm:col-span-2">{children}</div>
    </div>
  );
}

FormLayout.Section = FormLayoutSection;
FormLayout.Field = FormLayoutField;
FormLayout.Section.Content = FormLayoutSectionContent;

FormLayoutSection.Content = FormLayoutSectionContent;
FormLayoutSection.Actions = FormLayoutSectionActions;

export default FormLayout;
