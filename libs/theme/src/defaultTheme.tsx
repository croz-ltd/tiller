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

/* eslint-disable sonarjs/no-duplicate-string */

import React from "react";

import { merge } from "lodash";
import { DeepPartial } from "tsdef";

import cx from "./cx";

const defaultComponentConfig = {
  Alert: {
    borderRadius: "rounded-lg",
    icon: {
      container: "flex items-center gap-3",
    },
    title: {
      fontSize: "text-base",
      fontWeight: "font-bold",
      color: "text-slate-800",
    },
    text: {
      fontSize: "text-base",
      margin: "mt-2",
      color: "text-slate-800",
    },
    variant: {
      info: {
        color: "border-l-4 border-info",
        backgroundColor: "bg-info-light",
        padding: "p-4",
      },
      success: {
        color: "border-l-4 border-success",
        backgroundColor: "bg-success-light",
        padding: "p-4",
      },
      danger: {
        color: "border-l-4 border-danger",
        backgroundColor: "bg-danger-light",
        padding: "p-4",
      },
      warning: {
        color: "border-l-4 border-warning",
        backgroundColor: "bg-warning-light",
        padding: "p-4",
      },
    },
  },
  AppPicker: {
    Application: {
      master:
        "block hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:text-slate-900 focus:bg-slate-100 ",
      padding: "py-2 px-4",
      fontSize: "text-sm",
      lineHeight: "leading-5",
      color: "text-grey-700",
    },
    ApplicationList: {
      outerContainer: {
        width: "w-56",
        margin: "mt-2",
        borderRadius: "rounded-md",
        boxShadow: "shadow-lg",
      },
      innerContainer: {
        borderRadius: "rounded-md",
        backgroundColor: "bg-white",
        boxShadow: "shadow-xs",
      },
      padding: "py-1",
    },
  },
  Autocomplete: {
    Clear: {
      base: {
        padding: "p-2",
        margin: "-m-2 ml-2",
      },
      active: "pointer-events-auto cursor-pointer hover:text-slate-700",
    },
    Item: {
      master: `text-base block py-2 px-4 focus:outline-none`,
      highlight: "text-slate-900 bg-slate-100",
      base: {
        regular:
          "w-full text-sm px-4 py-2 block leading-5 cursor-pointer text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:text-slate-900 focus:bg-slate-100 truncate",
        selected: "flex items-center justify-between bg-primary-50",
        selectedCustom: "flex items-center justify-between bg-secondary-50",
      },
      active: {
        regular:
          "w-full text-sm px-4 py-2 block leading-5 cursor-pointer text-slate-900 bg-slate-100 focus:outline-none truncate",
        selected: "flex justify-between items-center",
        hovered: "bg-primary-light",
        hoveredCustom: "bg-secondary-light",
      },
      accentuated: "font-bold",
      complex: {
        container: "flex items-center w-full justify-between",
        element: "flex-grow mr-3 flex-wrap",
        selected: {
          master: "flex-shrink-0",
          color: "text-primary",
          size: "h-4 w-4",
        },
      },
    },
    Select: {
      base: "-m-2 pl-2 flex flex-col",
      active: "pointer-events-auto cursor-pointer hover:text-slate-700 ",
    },
    Separator: {
      container: "pl-2",
      inner: "border-r border-slate-200",
    },
    List: {
      base: {
        master: "w-full max-h-screen",
        borderRadius: "rounded-md",
        boxShadow: "shadow-lg",
        outline: "outline-none",
      },
      inner: {
        margin: "my-2",
        borderRadius: "rounded-md",
        backgroundColor: "bg-white",
        boxShadow: "shadow-xs",
        outline: "outline-none",
      },
    },
    Loading: {
      container: "flex flex-row items-center",
      inner: {
        padding: "p-2",
        margin: "-m-2 ml-2",
      },
      overlay: {
        master: "absolute top-0 left-0 right-0 bottom-0",
        backgroundColor: "bg-slate-200",
        opacity: "opacity-75",
      },
    },
    Container: {
      outer: "max-h-48 scrollbar overflow-y-auto",
      inner: "relative",
    },
    noResults: {
      master: "block",
      padding: "py-2 px-4",
      fontSize: "text-sm",
      lineHeight: "leading-5",
      color: "text-slate-700",
    },
    tagPlaceholder: {
      master: "h-6 mt-2 ml-2",
      fontSize: "text-base",
      textColor: "text-body",
    },
  },
  Badge: {
    master: "py-1 text-xs font-medium rounded-3xl inline-flex items-center",
    base: {
      padding: "px-3",
      lineHeight: "leading-5",
    },
    small: {
      padding: "py-0.5 px-2",
      lineHeight: "leading-4",
    },
    variant: {
      filled: {
        base: "",
        color: {
          primary: {
            base: "text-primary-dark bg-primary-light",
            dot: "text-primary-dark",
            removeIcon: "text-primary-dark",
          },
          secondary: {
            base: "text-secondary-dark bg-secondary-light",
            dot: "text-secondary-dark",
            removeIcon: "text-secondary-dark",
          },
          tertiary: {
            base: "text-tertiary-dark bg-tertiary-light",
            dot: "text-tertiary-dark",
            removeIcon: "text-tertiary-dark",
          },
          info: {
            base: "text-info-dark bg-info-light",
            dot: "text-info-dark",
            removeIcon: "text-info-dark",
          },
          danger: {
            base: "text-danger-dark bg-danger-light",
            dot: "text-danger-dark",
            removeIcon: "text-danger-dark",
          },
          warning: {
            base: "text-warning-dark bg-warning-light",
            dot: "text-warning-dark",
            removeIcon: "text-warning-dark",
          },
          success: {
            base: "text-success-dark bg-success-light",
            dot: "text-success-dark",
            removeIcon: "text-success-dark",
          },
          white: {
            base: "text-slate-800 bg-white",
            dot: "text-slate-800",
            removeIcon: "text-slate-800",
          },
        },
      },
      outlined: {
        base: "border",
        color: {
          primary: {
            base: "text-primary-dark border-primary-dark",
            dot: "text-primary-dark",
            removeIcon: "text-primary-dark",
          },
          secondary: {
            base: "text-secondary-dark border-secondary-dark",
            dot: "text-secondary-dark",
            removeIcon: "text-secondary-dark",
          },
          tertiary: {
            base: "text-tertiary-dark border-tertiary-dark",
            dot: "text-tertiary-dark",
            removeIcon: "text-tertiary-dark",
          },
          info: {
            base: "text-info-dark border-info-dark",
            dot: "text-info-dark",
            removeIcon: "text-info-dark",
          },
          danger: {
            base: "text-danger-dark border-danger-dark",
            dot: "text-danger-dark",
            removeIcon: "text-danger-dark",
          },
          warning: {
            base: "text-warning-dark border-warning-dark",
            dot: "text-warning-dark",
            removeIcon: "text-warning-dark",
          },
          success: {
            base: "text-success-dark border-success-dark",
            dot: "text-success-dark",
            removeIcon: "text-success-dark",
          },
          white: {
            base: "text-slate-800 border-slate-800",
            dot: "text-slate-800",
            removeIcon: "text-slate-800",
          },
        },
      },
    },
  },
  Breadcrumbs: {
    master: "",
    iconColor: "text-body-light",
    container: {
      backgroundColor: "bg-white",
      borderRadius: "rounded-md",
      padding: "px-1",
      display: "flex",
      spaceBetween: "space-x-4",
    },
    childContainer: {
      display: "flex",
      alignItems: "items-center",
      spaceBetween: "space-x-4",
    },
    breadcrumb: {
      fontSize: "text-base",
      fontWeight: "font-medium",
      color: "text-body-light",
      hover: "hover:text-body",
      transitionDuration: "duration-150",
      transitionTimingFunction: "ease-in-out",
    },
  },
  Button: {
    master: "inline-flex justify-center items-center transition duration-150 ease-in-out",
    base: {
      borderRadius: "rounded",
      focus: "focus:outline-none",
    },
    size: {
      xs: `py-1.5 px-2.5 text-button-xs`,
      sm: "py-2 px-3 text-button-sm",
      md: "py-2 px-4 text-button-md",
      lg: "py-2 px-4 text-button-lg",
      xl: "py-3 px-6 text-button-xl",
    },
    variant: {
      filled: {
        base: {
          master: "",
        },
        color: {
          primary: {
            backgroundColor: `bg-primary active:bg-primary-dark`,
            textColor: "text-primary-contrast",
            hover: `hover:bg-primary-dark hover:border-primary-light`,
            borderColor: `border-primary focus:border-primary hover:border-primary-dark`,
            shadow: `focus:ring focus:ring-primary-light`,
          },
          secondary: {
            backgroundColor: "bg-secondary",
            textColor: "text-secondary-contrast",
            hover: `hover:bg-secondary-dark`,
            borderColor: `border-secondary focus:border-secondary hover:border-secondary-dark`,
            shadow: `focus:ring focus:ring-secondary-light`,
          },
          tertiary: {
            backgroundColor: "bg-tertiary",
            textColor: "text-tertiary-contrast",
            hover: `hover:bg-tertiary-dark`,
            borderColor: `border-tertiary focus:border-tertiary hover:border-tertiary-dark`,
            shadow: `focus:ring focus:ring-tertiary-light`,
          },
          success: {
            backgroundColor: "bg-success",
            textColor: "text-success-contrast",
            hover: `hover:bg-success-dark`,
            borderColor: `border-success focus:border-success hover:border-success-dark`,
            shadow: `focus:ring focus:ring-success-light`,
          },
          danger: {
            backgroundColor: "bg-danger",
            textColor: "text-danger-contrast",
            hover: `hover:bg-danger-dark`,
            borderColor: `border-danger focus:border-danger hover:border-danger-dark`,
            shadow: `focus:ring focus:ring-danger-light`,
          },
          warning: {
            backgroundColor: "bg-warning",
            textColor: "text-warning-contrast",
            hover: `hover:bg-warning-dark`,
            borderColor: `border-warning focus:border-warning hover:border-warning-dark`,
            shadow: `focus:ring focus:ring-warning-light`,
          },
          info: {
            backgroundColor: "bg-info",
            textColor: "text-info-contrast",
            hover: `hover:bg-info-dark`,
            borderColor: `border-info focus:border-info hover:border-info-dark`,
            shadow: `focus:ring focus:ring-info-light`,
          },
          white: {
            backgroundColor: "bg-white active:bg-slate-50",
            textColor: "text-slate-700 active:text-slate-800",
            hover: "hover:bg-slate-50",
            borderColor: "border-slate-300 focus:border-slate-500",
            shadow: "focus:ring focus:ring-slate-100",
          },
          gray: {
            backgroundColor: "bg-gray-600 active:bg-gray-700",
            textColor: "text-white",
            hover: "hover:bg-slate-50",
            borderColor: "focus:border-gray-700",
            shadow: "focus:ring focus:ring-gray-100",
          },
        },
      },
      outlined: {
        base: {
          master: "border",
        },
        color: {
          primary: {
            backgroundColor: "",
            textColor: `text-primary active:text-primary-dark`,
            borderColor: `border-primary focus:border-primary`,
            hover: `hover:bg-primary-light`,
            shadow: `focus:ring focus:ring-primary-light`,
          },
          secondary: {
            backgroundColor: "",
            textColor: `text-secondary-dark active:text-secondary-dark`,
            borderColor: `focus:border-secondary border-secondary`,
            hover: `hover:bg-secondary-light`,
            shadow: `focus:ring focus:ring-secondary-light`,
          },
          tertiary: {
            backgroundColor: "",
            textColor: `text-tertiary active:text-tertiary-dark`,
            borderColor: `focus:border-tertiary border-tertiary`,
            hover: `hover:bg-tertiary-light`,
            shadow: `focus:ring focus:ring-tertiary-light`,
          },
          success: {
            backgroundColor: `active:bg-success-light`,
            textColor: `text-success active:text-success-dark`,
            borderColor: `focus:border-success border-success`,
            hover: `hover:bg-success-light`,
            shadow: `focus:ring focus:ring-success-light`,
          },
          danger: {
            backgroundColor: `active:bg-danger-light`,
            textColor: `text-danger active:text-danger-dark`,
            borderColor: `focus:border-danger border-danger`,
            hover: `hover:bg-danger-light`,
            shadow: `focus:ring focus:ring-danger-light`,
          },
          warning: {
            backgroundColor: `active:bg-warning-light`,
            textColor: `text-warning active:text-warning-dark`,
            borderColor: `focus:border-warning border-warning`,
            hover: `hover:bg-warning-light`,
            shadow: `focus:ring focus:ring-warning-light`,
          },
          info: {
            backgroundColor: `active:bg-info-light`,
            textColor: `text-info active:text-info-dark`,
            borderColor: `focus:border-info border-info`,
            hover: `hover:bg-info-light`,
            shadow: `focus:ring focus:ring-info-light`,
          },
          white: {
            backgroundColor: "bg-transparent active:bg-slate-50",
            textColor: "text-slate-700 active:text-slate-800",
            hover: "hover:bg-slate-50",
            borderColor: "border-slate-300 focus:border-slate-500",
            shadow: "focus:ring focus:ring-slate-100",
          },
        },
      },
      text: {
        base: {
          master: "bg-transparent",
        },
        color: {
          primary: {
            backgroundColor: "",
            textColor: `text-primary active:text-primary-dark`,
            borderColor: "",
            hover: `hover:bg-primary-light text-primary-dark`,
            shadow: "",
          },
          secondary: {
            backgroundColor: "",
            textColor: `text-secondary active:text-secondary-dark`,
            borderColor: "",
            hover: `hover:bg-secondary-light text-secondary-dark`,
            shadow: "",
          },
          tertiary: {
            backgroundColor: "",
            textColor: `text-tertiary active:text-tertiary-dark`,
            borderColor: "",
            hover: `hover:bg-tertiary-light text-tertiary-dark`,
            shadow: "",
          },
          success: {
            backgroundColor: "",
            textColor: `text-success active:text-success-dark`,
            borderColor: "",
            hover: `hover:bg-success-light text-success-dark`,
            shadow: `focus:ring focus:ring-success-light`,
          },
          danger: {
            backgroundColor: "",
            textColor: `text-danger active:text-danger-dark`,
            borderColor: "",
            hover: `hover:bg-danger-light text-danger-dark`,
            shadow: `focus:ring focus:ring-danger-light`,
          },
          warning: {
            backgroundColor: "",
            textColor: `text-warning active:text-warning-dark`,
            borderColor: "",
            hover: `hover:bg-warning-light text-warning-dark`,
            shadow: `focus:ring focus:ring-warning-light`,
          },
          info: {
            backgroundColor: "",
            textColor: `text-info active:text-info-dark`,
            borderColor: "",
            hover: `hover:bg-warning-light text-info-dark`,
            shadow: `focus:ring focus:ring-info-light`,
          },
          white: {
            backgroundColor: "bg-transparent",
            textColor: "text-slate-700 active:text-slate-800",
            hover: "hover:bg-slate-50",
            borderColor: "",
            shadow: "",
          },
        },
      },
    },
    disabled: {
      opacity: "opacity-50",
    },
    leadingIcon: {
      xs: "-ml-0.5 mr-2 w-4 h-4",
      sm: "-ml-0.5 mr-2 w-4 h-4",
      md: "-ml-1 mr-2 w-5 h-5",
      lg: "-ml-1 mr-3 w-5 h-5",
      xl: "-ml-1 mr-3 w-5 h-5",
    },
    trailingIcon: {
      xs: "ml-2 -mr-0.5 w-4 h-4",
      sm: "ml-2 -mr-0.5 w-4 h-4",
      md: "ml-2 -mr-1 w-5 h-5",
      lg: "ml-3 -mr-1 w-5 h-5",
      xl: "ml-3 -mr-1 w-5 h-5",
    },
  },
  ButtonGroups: {
    master: "relative z-0 inline-flex items-center",
    base: "shadow-sm",
  },
  Card: {
    master: "relative",
    container: {
      backgroundColor: "bg-white",
      boxShadow: "shadow",
      borderRadius: "rounded-lg",
      overflow: "overflow-hidden",
    },
    waitingContainer: {
      backgroundColor: "bg-black",
      opacity: "opacity-50",
    },
    loadingIcon: {
      color: "text-white",
      size: 10,
    },
    header: {
      padding: "p-4",
      borderBottomWidth: "border-b",
      borderColor: "border-base",
      title: {
        fontSize: "text-title",
        fontWeight: "font-medium",
        lineHeight: "leading-6",
        color: "text-body",
      },
      subtitle: {
        marginTop: "mt-1",
        fontSize: "text-subtitle",
        lineHeight: "leading-4",
        color: "text-body-light",
      },
    },
    body: {
      padding: "p-4",
    },
    footer: {
      borderTopWidth: "border-t",
      borderColor: "border-base",
      padding: "p-4",
    },
  },
  Checkbox: {
    master: "h-4 w-4 appearance-none ",
    transition: "transition duration-150 ease-in-out",
    border: "border border-slate-200",
    borderRadius: "rounded",
    backgroundColor: "bg-white",
    boxShadow: `focus:ring`,
    container: "flex items-center",
    disabled: "opacity-50",
    label: {
      color: "text-body",
      padding: "pl-2",
      fontSize: "text-label",
    },
    color: {
      primary: `checked:bg-primary focus:border-primary-light focus:ring-primary-light`,
      secondary: `checked:bg-secondary focus:border-secondary-light focus:ring-secondary-light`,
      tertiary: `checked:bg-tertiary focus:border-tertiary-light focus:ring-tertiary-light`,
      info: `checked:bg-info focus:border-info-light focus:ring-info-light`,
      danger: `checked:bg-danger focus:border-danger-light focus:ring-danger-light`,
      warning: `checked:bg-warning focus:border-warning-light focus:ring-warning-light`,
      success: `checked:bg-success focus:border-success-light focus:ring-success-light`,
      white: "checked:bg-white focus:border-slate-light focus:ring-slate-100",
    },
  },
  CheckboxField: {
    base: "inline-flex items-center space-x-4",
  },
  CheckboxGroup: {
    input: "absolute w-0 h-0",
  },
  Container: {
    variant: {
      max: {
        outerContainer: "",
        innerContainer: "max-w-9xl mx-auto sm:px-6 lg:px-8",
      },
      fullWidth: {
        outerContainer: "",
        innerContainer: "max-w-7xl mx-auto sm:px-6 lg:px-8",
      },
      constrainedPadded: {
        outerContainer: "",
        innerContainer: "px-4 max-w-7xl mx-auto sm:px-6 lg:px-8",
      },
      fullWidthContainer: {
        outerContainer: "",
        innerContainer: "px-4 container mx-auto sm:px-6 lg:px-8",
      },
      narrowConstrained: {
        outerContainer: "px-4 max-w-7xl mx-auto sm:px-6 lg:px-8",
        innerContainer: "max-w-3xl mx-auto",
      },
    },
  },
  DataTable: {
    container: {
      master: "min-w-full inline-block align-middle overflow-hidden overflow-x-auto scrollbar",
      borderRadius: "sm:rounded-lg",
    },
    tableHeader: {
      align: {
        left: "text-left justify-start",
        right: "text-right justify-end",
        center: "text-center justify-center",
        justify: "text-justify justify-around",
      },
      master: "border-b leading-4 tracking-wider uppercase",
      borderColor: "border-base",
      backgroundColor: "bg-slate-50",
      color: "text-slate-600",
      fontWeight: "font-medium",
      fontSize: "text-xs",
      padding: "p-4 ",
    },
    tableFooter: {
      master: "text-left border-b leading-4 tracking-wider uppercase",
      borderColor: "border-base",
      backgroundColor: "bg-slate-50",
      color: "text-slate-500",
      fontWeight: "font-medium",
      fontSize: "text-xs",
      padding: "p-4",
    },
    tableRow: {
      odd: "bg-slate-50",
      even: "bg-white",
    },
    align: {
      left: "text-left justify-start",
      right: "text-right justify-end",
      center: "text-center justify-center",
      justify: "text-justify justify-around",
    },
    tableCell: {
      fontSize: "text-base",
      fontWeight: "font-medium",
      color: "text-body",
      gray: "bg-slate-50",
      white: "bg-white",
      backgroundSticky: "bg-inherit",
    },
    primaryRowSpacing: "p-4 align-top",
    secondaryRowSpacing: "p-4",
    rowBorder: "border-b border-base",
    CardHeader: {
      backgroundColor: "bg-primary-light",
    },
    expanderCellIcon: {
      color: "text-slate-400",
    },
  },
  DateInput: {
    DatePicker: {
      base: {
        master: "w-full left-0 shadow",
        backgroundColor: "bg-white",
        padding: "p-4",
      },
      range: {
        master: "w-full left-0 flex items-baseline justify-between shadow",
        backgroundColor: "bg-white",
        margin: "mt-2",
        borderRadius: "rounded-lg",
        padding: "p-4",
        iconColor: "pointer-events-auto cursor-pointer hover:text-slate-700",
      },
      Month: {
        headerContainer: "mb-2 flex justify-between items-center",
        monthLabel: {
          margin: "ml-1 mr-2",
          fontSize: "text-lg",
          fontWeight: "font-bold",
          color: "text-body",
        },
        yearLabel: {
          margin: "mr-2",
          fontSize: "text-lg",
          fontWeight: "font-normal",
          color: "text-body-light",
        },
        button:
          "p-1 rounded-full inline-flex cursor-pointer transition ease-in-out duration-100 " +
          "focus:outline-none hover:bg-slate-200",
        icon: {
          size: 3,
          color: "text-slate-500",
        },
        daysContainer: "-mx-1",
        weekDayLabel: "w-full px-1 text-slate-800 text-xs text-center font-medium",
      },
      EmptyDay: {
        base: "w-full p-1 text-center text-sm border  border-transparent",
      },
      Day: {
        container: "w-full px-1 mb-1",
      },
      Button: {
        base: "w-full h-full cursor-pointer text-center text-sm rounded-full leading-none transition ease-in-out duration-100 leading-loose focus:outline-none ",
        regular: "bg-primary text-primary-contrast",
        firstOrLast: "bg-primary text-primary-contrast",
        selected: "bg-primary-light text-primary-contrast",
        hovered: "bg-primary-light text-primary-contrast",
        currentDate: "ring-2 ring-inset ring-white border border-primary-dark text-primary-dark",
        dateHovered: `hover:bg-primary hover:text-primary-contrast`,
        yearHovered: `hover:bg-primary hover:text-primary-contrast`,
        disabled: "opacity-50 text-slate-700 ",
      },
    },
  },
  DescriptionList: {
    padding: "p-4",
    Type: {
      clean: {
        master: "flex flex-row",
        itemBase: "flex-1",
      },
      striped: {
        evenRowColor: "bg-slate-50",
        oddRowColor: "bg-white",
      },
      default: {
        margin: "mt-8 sm:mt-0",
        border: "sm:border-t",
        borderColor: `sm:border-base`,
      },
    },
    Item: {
      type: {
        default: {
          label: "w-1/3",
          content: "w-2/3",
          itemColumnContainer: "flex py-5 px-4",
        },
        sameColumn: {
          label: "",
          content: "",
          itemColumnContainer: "py-3 px-2",
        },
      },
    },
  },
  Dropdown: {
    Menu: {
      transition: {
        entering: "transition ease-out duration-100",
        enterFrom: "transform opacity-0 scale-95",
        enterTo: "transform opacity-100 scale-100",
        leave: "transition ease-in duration-75",
        leaveFrom: "transform opacity-100 scale-100",
        leaveTo: "transform opacity-0 scale-95",
      },
    },
  },
  DropdownMenu: {
    Icon: {
      color: {
        default: `text-primary-light hover:text-primary`,
        dark: "text-slate-900 hover:text-slate-600",
        light: "text-white hover:text-slate-800",
      },
    },
    MenuItem: {
      master:
        "w-full block flex justify-start hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:text-slate-900 focus:bg-slate-100",
      padding: "py-2 px-4",
      fontSize: "text-base",
      textColor: "text-body",
      disabled: "opacity-50",
      transition: "transition duration-150 ease-in-out",
    },
    MenuContainer: {
      master: "origin-top-right",
      margin: "mt-2",
      width: "w-full",
      borderRadius: "rounded-md",
      boxShadow: "shadow-lg",
      backgroundColor: "bg-transparent",
    },
    MenuInnerContainer: {
      borderRadius: "rounded-md",
      boxShadow: "ring-1 ring-black ring-opacity-5",
      backgroundColor: {
        default: "bg-primary-600",
        dark: "bg-slate-800",
        light: "bg-white",
      },
    },
    MenuContainerChildren: {
      master: "",
      padding: "p-2",
      textColor: {
        default: "text-primary-contrast",
        dark: "text-white",
        light: "text-slate-900",
      },
    },
  },
  DateTimeInput: {
    container: "",
    borderRadius: "rounded-b-lg",
    borderBottomWidth: "border-b-2",
    Icon: {
      color: "text-primary",
    },
  },
  DateTimePicker: {
    container: "flex flex-wrap flex-col",
    tabsContainer: "pt-2 rounded-t-lg flex shadow",
    tab: "h-8 bg-white flex-1 flex justify-center items-center border-primary pointer-events-auto cursor-pointer",
  },
  DragZone: {
    dragZoneContainer: "w-full h-full overflow-auto space-y-2",
    uploadyDropZone: "h-full relative flex flex-col rounded-md cursor-pointer",
    customUploadDropZoneContainer: {
      master: "group flex justify-center",
      margin: "mt-2",
      padding: "py-4 px-6",
      borderWidth: "border-2",
      borderStyle: "border-dashed",
      borderRadius: "rounded-md",
      borderColor: `border-slate-400 hover:border-primary`,
      borderDarkColor: "border-slate-500",
    },
    iconSize: 7,
    iconColor: `text-slate-400 group-hover:text-primary`,
    customUploadDropZoneDescriptionContainer: "flex flex-col text-center items-center space-y-1",
    loading: {
      master: "relative flex justify-center items-center text-slate-600 mx-auto my-px",
      percentage: "absolute top-1.5 text-body text-xs",
    },
    customUploadDropZoneTitle: {
      master: "flex cursor-pointer",
      fontSize: "text-base",
      fontWeight: "font-medium",
      color: "text-body-light",
    },
    customUploadDropZoneSubtitle: {
      fontSize: "text-xs",
      color: "text-body-light",
    },
  },
  Field: {
    Hint: {
      base: "text-slate-500 text-sm leading-5",
    },
    Help: {
      base: "mt-2 text-sm",
      color: "text-body-light",
    },
    Tooltip: {
      marginLeft: "ml-0.5",
    },
    ErrorText: {
      base: "mt-2 text-sm text-danger",
    },
  },
  FieldError: {
    error: "text-danger",
  },
  FieldGroup: {
    Group: {
      legend: "flex text-base text-slate-900 md:text-sm font-medium leading-6 cursor-default",
      help: "text-sm text-slate-500 leading-5",
      content: {
        master: "mt-4",
        horizontal: "flex space-x-4",
        vertical: "space-y-2",
      },
      error: "mt-1 text-danger text-sm",
    },
    GroupItem: {
      container: "flex items-start",
      content: "h-5 absolute flex items-center",
      info: "pl-6 text-sm leading-5",
      label: "text-slate-700 font-medium",
      help: "text-slate-500",
      disabled: "opacity-50",
    },
  },
  FetchDebugRequest: {
    backgroundColor: "bg-teal-200",
  },
  FileList: {
    container: {
      master: "flex items-center justify-between",
      borderWidth: "border",
      borderColor: "",
      borderRadius: "",
      padding: "p-3",
      fontSize: "text-sm",
      lineHeight: "leading-4",
    },
    actions: {
      master: `transition duration-150 ease-in-out hover:text-primary-dark cursor-pointer`,
      fontSize: "text-button-md",
      color: "text-primary",
    },
    icon: {
      color: "text-primary",
      margin: "mr-2",
    },
    fileName: {
      fontSize: "text-base",
      textColor: "text-body",
    },
  },
  FormLayout: {
    backgroundColor: "bg-white",
    border: "border-t border-gray-200",
    simpleBorder: "mt-8 border-t border-gray-200 pt-8",
    borderPadding: "py-5",
    card: {
      layout: "md:grid md:grid-cols-3 md:gap-6",
      titleContainer: "md:col-span-1",
      title: {
        fontSize: "text-lg",
        color: "text-gray-900",
        fontWeight: "font-medium",
        lineHeight: "leading-6",
      },
      subtitle: {
        fontSize: "text-sm",
        color: "text-gray-500",
        margin: "mt-1",
        lineHeight: "leading-5",
      },
      container: "mt-5 md:mt-0 md:col-span-2",
      padding: "px-4 sm:px-0",
    },
    title: {
      fontSize: "text-title",
      color: "text-heading",
      fontWeight: "font-medium",
      lineHeight: "leading-6",
    },
    subtitle: {
      fontSize: "text-subtitle",
      color: "text-body-light",
      margin: "mt-1",
      lineHeight: "leading-4",
    },
    content: {
      layout: "md:grid md:grid-cols-3 md:gap-6",
      titleContainer: "md:col-span-1",
      container: "mt-5 md:mt-0 md:col-span-2 space-y-10",
      title: {
        fontSize: "text-title",
        color: "text-body",
        fontWeight: "font-medium",
        lineHeight: "leading-6",
      },
      subtitle: {
        fontSize: "text-subtitle",
        color: "text-body-light",
        margin: "mt-1",
        lineHeight: "leading-4",
      },
    },
    actions: {
      margin: "mt-8",
      border: "border-t border-gray-200",
      padding: "pt-5",
    },
  },
  Input: {
    master: "block w-full text-ellipsis overflow-hidden",
    fontSize: "text-base",
    textColor: "text-body",
    lineHeight: "sm:leading-5",
    borderColor: `border border-slate-300 focus:border-primary-300`,
    borderRadius: "rounded-md",
    padding: {
      input: "py-2 px-3",
      autocomplete: "py-2 pl-3 pr-20",
    },
    boxShadow: `focus-within:ring focus-within:outline-none focus-within:ring-primary-light`,
    disabled: "opacity-50",
    addOn: {
      master: "flex-1 block",
      padding: "py-2 px-3",
      color: "text-body-light",
      fontSize: "text-base",
      borderRadius: "rounded-none rounded-r-md",
      inline: "sm:leading-5",
      outline: "px-3 bg-slate-50 rounded-l-md border border-r-0 border-slate-300 ",
      InlineAddOn: {
        leading: "pl-3",
        trailing: "pr-3",
      },
    },
    inlineLeadingIcon: "pl-10",
    inlineLeadingAddOn: "pl-8",
    inlineTrailingAddOn: "pr-12",
    error: {
      borderColor: `border border-danger focus:border-danger-300`,
      color: "text-danger-dark",
      placeholder: "placeholder-danger",
      boxShadow: `focus-within:ring focus-within:outline-none focus-within:ring-danger-light`,
      Icon: {
        color: "text-danger",
      },
    },
    container: {
      base: "rounded-md shadow-sm",
      withLabel: "mt-1",
    },
    Required: {
      base: "ml-0.5 text-red-600",
    },
    Help: {
      base: "mt-2 text-body-light text-base",
    },
    ErrorText: {
      base: "mt-2 text-danger text-base",
    },
    Icon: {
      color: "text-slate-400 flex",
      Container: {
        leading: "pl-3 left-0",
        trailing: "pr-3",
      },
      clickableTrailing: "pointer-events-auto cursor-pointer flex hover:text-slate-500",
    },
    clear: {
      base: "pointer-events-auto",
      padding: "mr-3",
      color: "text-gray-400",
      size: 3,
      disabled: "opacity-50",
      clickableTrailing: "cursor-pointer hover:text-slate-700",
    },
  },
  Icon: {
    primary: "text-primary",
    InlineError: "w-5 h-5 text-danger",
    InlineMail: "w-5 h-5 ",
    InlineQuestionMark: "w-5 h-5 text-slate-400",
    color: "currentColor",
  },
  IconButton: {
    master: "focus:outline-none flex justify-center items-center hover:no-underline",
    container: {
      padding: "p-0.5",
    },
    icon: {
      opacity: "opacity-50",
      size: 5,
    },
  },
  Label: {
    fontSize: "text-label",
    color: "text-body",
    empty: "sr-only",
  },
  Link: {
    master: "transition ease-in-out duration-150 cursor-pointer hover:underline focus:outline-none",
    base: {
      fontSize: "text-base",
      fontWeight: "font-medium",
    },
    color: {
      main: `text-link hover:text-link-hover`,
      primary: `text-primary-dark hover:text-primary`,
      secondary: `text-secondary-dark hover:text-secondary`,
      tertiary: `text-tertiary-dark hover:text-tertiary`,
      info: `text-info-dark hover:text-info`,
      danger: `text-danger-dark hover:text-danger`,
      warning: `text-warning-dark hover:text-warning`,
      success: `text-success-dark hover:text-success`,
      white: "text-slate-700 hover:text-slate-500",
    },
  },
  Login: {
    master: "flex flex-col py-2 px-4 md:py-4 md:px-8",
    container: "max-w-lg mx-auto",
    logoContainer: "flex items-center justify-center mt-2 mb-8",
    headerContainer: "text-2xl font-bold text-center mb-8",
    inputSpacing: "mb-3",
    logoSize: "w-24",
    loginButton: {
      master: "flex flex-row w-full",
      margin: "mt-6",
    },
    link: {
      master: "link-primary text-sm hover:underline",
      container: "flex justify-center w-full mt-6",
    },
    emailForm: {
      master: "flex flex-col py-2 px-4 md:py-4 md:px-8",
      headerContainer: "text-2xl font-bold text-center mb-6",
      inputSpacing: "mb-3",
      submitButton: {
        master: "flex flex-row w-full",
        margin: "mt-6",
      },
      link: {
        master: "link-primary text-sm hover:underline",
        container: "flex justify-center items-center w-full mt-6 cursor-pointer",
        icon: "w-4 h-4 mr-3 text-slate-700",
      },
    },
    passwordResetForm: {
      master: "flex flex-col py-2 px-4 md:py-4 md:px-8",
      headerContainer: "text-2xl font-bold text-center mb-6",
      description: "mb-5 text-center",
      inputSpacing: "mb-3",
      resetButton: {
        master: "flex flex-row w-full",
        margin: "mt-6",
      },
      link: {
        master: "link-primary text-sm hover:underline",
        container: "flex justify-center items-center w-full mt-6 cursor-pointer",
        icon: "w-4 h-4 mr-2",
      },
    },
  },
  Modal: {
    Container: {
      base: {
        master: "fixed bottom-0 inset-x-0 sm:inset-0 sm:flex sm:items-center sm:justify-center z-40",
        padding: "px-4 pb-6 sm:p-0",
      },
      Content: {
        container: {
          master:
            "relative overflow-hidden overflow-y-visible scrollbar transform transition-all sm:max-w-lg sm:w-full max-h-screen focus:outline-none",
          backgroundColor: "bg-white",
          borderRadius: "rounded-lg",
          padding: "p-4 sm:p-6",
          boxShadow: "shadow-xl",
        },
        dismiss: "pt-4 pr-4 hidden sm:block absolute top-0 right-0",
        outer: "sm:flex sm:items-start",
        inner: "w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left",
      },
      Overlay: {
        outer: "fixed inset-0 overflow-auto transition-opacity",
        inner: {
          master: "absolute inset-0 opacity-75",
          backgroundColor: "bg-slate-500",
        },
      },
    },
    Content: {
      master: "mt-2 text-normal text-body-light",
      title: {
        fontSize: "text-title",
        lineHeight: "leading-6",
        fontWeight: "font-medium",
        color: "text-heading",
      },
    },
    Dismiss: {
      button: {
        master: " transition ease-in-out duration-150 focus:text-slate-500 focus:outline-none",
        color: "text-slate-400",
        hover: "hover:text-slate-500",
      },
    },
    Footer: {
      base: "mt-5 sm:mt-4 flex flex-wrap flex-row-reverse gap-2",
    },
    Icon: {
      base: "mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10",
      backgroundColor: "bg-green-500",
    },
  },
  Notification: {
    actions: {
      master: "mt-2 space-x-2",
      borderColor: "border-primary",
    },
    Container: {
      master: "w-full max-w-sm pointer-events-auto",
      backgroundColor: "bg-white",
      borderRadius: "rounded-xl",
      boxShadow: "drop-shadow-xl",
      outer: {
        base: "rounded-lg flex items-start shadow-xs overflow-hidden ",
        regular: "p-3",
        condensed: "p-2",
      },
    },
    dismiss: {
      master: "flex flex-shrink-0",
      margin: "ml-4",
      Button: {
        master: "inline-flex transition ease-in-out duration-150 focus:text-slate-500 focus:outline-none",
        color: "text-slate-400",
      },
    },
    title: {
      fontSize: "text-base",
      fontWeight: "font-medium",
      color: "text-body",
    },
    content: {
      fontSize: "text-base",
      color: "text-body-light",
      margin: "mt-1",
    },
  },
  NotificationProvider: {
    Container: {
      master: "fixed inset-0 flex justify-center items-end pointer-events-none z-50",
      padding: "px-4 py-6 sm:p-6",
      inner: "w-full max-w-sm grid grid-col gap-4",
      position: {
        topCenter: "sm:justify-center sm:items-start",
        topRight: "sm:justify-end sm:items-start",
        topLeft: "sm:justify-start sm:items-start",
        bottomCenter: "sm:justify-center",
        bottomRight: "sm:justify-end",
        bottomLeft: "sm:justify-start",
      },
    },
    Icon: {
      size: 6,
    },
  },
  PageHeading: {
    container: "md:flex md:items-center md:justify-between",
    master: "flex-1 min-w-0",
    breadcrumbs: "mb-2",
    title: {
      master: "sm:truncate",
      padding: "py-1",
      fontSize: "text-h1 sm:text-h2",
      fontWeight: "font-bold",
      lineHeight: "leading-10 sm:leading-9",
      color: "text-heading",
    },
    subtitle: {
      marginTop: "mt-1",
      fontSize: "text-subtitle",
      lineHeight: "leading-4",
      color: "text-body-light",
    },
    meta: {
      master: "flex flex-col sm:flex-row sm:flex-wrap",
      marginTop: "mt-1 sm:mt-0",
      child: "mt-2 sm:mr-6",
    },
    actions: {
      master: "flex space-x-3",
      marginTop: "mt-4 md:mt-0",
      marginLeft: "md:ml-4",
    },
  },
  Pagination: {
    master: "flex flex-col space-y-2 items-center justify-end sm:flex-row sm:flex-1 sm:space-x-2 sm:space-y-0",
    default: {
      backgroundColor: "bg-white hover:bg-slate-50",
      textColor: "text-slate-700",
      borderColor: `border border-slate-300 focus:border-primary-light`,
    },
    current: {
      backgroundColor: "bg-slate-100 hover:bg-slate-50",
      textColor: "text-slate-700",
      borderColor: `border border-slate-4 focus:border-primary-light`,
    },
    pageSummary: {
      fontSize: "text-sm",
      lineHeight: "leading-5",
      color: "text-slate-700",
    },
  },
  PageResizer: {
    master: "text-sm text-slate-700 flex items-center leading-5",
  },
  ProgressBar: {
    container: {
      master: "divide-y divide-slate-300 md:divide-y-0 md:flex",
      borderWidth: "border",
      borderColor: "border-base",
      borderRadius: "rounded-md",
    },
    indexIcon: {
      master: "w-10 h-10 flex flex-shrink-0 justify-center items-center",
      backgroundColor: "bg-primary",
      borderWidth: "border-2",
      borderColor: "border-primary",
      borderRadius: "rounded-full",
      afterBorderColor: "border-base",
    },
    textIndex: {
      master: "",
      fontSize: "text-base",
      fontWeight: "font-medium",
      lineHeight: "leading-5",
      color: "text-primary",
      beforeTextColor: "text-body",
      afterTextColor: "text-body-light",
    },
    stepContainer: {
      master: "flex items-center space-x-4",
      padding: "py-4 px-6",
      margin: "mr-1",
    },
    icon: {
      color: "text-white mt-1",
      size: 24,
    },
    rightArrow: {
      color: "text-slate-300",
    },
  },
  RadioGroup: {
    master: "appearance-none",
    transition: "transition duration-150 ease-in-out",
    base: {
      size: "w-4 h-4",
      borderColor: "border border-slate-300",
      borderRadius: "rounded-full",
      boxShadow: `focus:ring`,
      backgroundColor: "bg-white",
      color: {
        primary: `checked:bg-primary focus:ring-primary-light focus:border-primary-light`,
        secondary: `checked:bg-secondary focus:ring-secondary-light focus:border-secondary-light`,
        tertiary: `checked:bg-tertiary focus:ring-tertiary-light focus:border-tertiary-light`,
        info: `checked:bg-info focus:ring-info-light focus:border-info-light`,
        danger: `checked:bg-danger focus:ring-danger-light focus:border-danger-light`,
        warning: `checked:bg-warning focus:ring-warning-light focus:border-warning-light`,
        success: `checked:bg-success focus:ring-success-light focus:border-success-light`,
        white: "checked:bg-white focus:ring-slate-100 focus:border-slate-300",
      },
    },
    input: "absolute w-0 h-0",
    Item: {
      disabled: "opacity-50",
    },
  },
  Select: {
    Button: {
      container: "flex justify-between items-center",
      input: "absolute w-0 h-0",
      value: "mr-3 grow overflow-hidden truncate",
    },
    Clear: {
      base: {
        padding: "p-2",
        margin: "-m-2",
      },
      active: "pointer-events-auto cursor-pointer hover:text-slate-700",
    },
    Item: {
      base: {
        master:
          "block hover:text-slate-900 hover:bg-slate-100 focus:text-slate-900 focus:bg-slate-100 focus:outline-none",
        padding: "py-2 px-4",
        fontSize: "text-sm",
        lineHeight: "leading-5",
        color: "text-slate-700",
        disabled: "opacity-50",
        selected: "bg-primary-50",
      },
      active: {
        regular: "py-2 px-4 block text-sm text-slate-900 leading-5 cursor-pointer bg-slate-100 focus:outline-none",
        hovered: "bg-primary-light",
      },
      container: "flex justify-between items-center",
      element: "mr-3 flex-grow flex-wrap",
      selected: {
        master: "flex-shrink-0",
        color: "text-primary",
        size: "w-4 h-4",
      },
    },
    Items: {
      container: "max-h-48 overflow-y-auto scrollbar",
      inputContainer: "py-1 px-2",
    },
    List: {
      master: "w-full outline-none",
      borderRadius: "rounded-md",
      boxShadow: "shadow-lg",
      inner: {
        margin: "mt-2 mb-2",
        borderRadius: "rounded-md",
        backgroundColor: "bg-white",
        boxShadow: "ring-1 ring-black ring-opacity-5",
        outline: "outline-none",
      },
    },
    Loading: {
      container: "text-slate-400 flex items-center shrink-0",
      inner: {
        padding: "p-2 pr-4",
        margin: "-m-2",
      },
    },
    Separator: {
      container: "pl-2",
      inner: "border-r border-base",
    },
    Select: {
      master: "w-full block text-left cursor-default transition duration-150 ease-in-out",
      padding: "py-2 pl-3 pr-10",
      borderColor: `border border-slate-300 focus:border-primary-300`,
      boxShadow: `focus-within:ring focus-within:outline-none focus-within:ring-primary-light`,
      borderRadius: "rounded-md",
      backgroundColor: "bg-white",
      margin: "mt-1",
      fontSize: "sm:text-sm",
      lineHeight: "sm:leading-5",
      error: `border border-danger text-danger-dark placeholder-danger focus:ring focus:border-danger-300 focus:ring-danger-light`,
      disabled: "opacity-50",
      input: "absolute w-0 h-0",
    },
    container: "relative w-full",
    placeholder: "text-slate-500 select-none",
  },
  SidebarLayout: {
    container: {
      master: "h-screen flex overflow-hidden flex-col md:flex-row",
      backgroundColor: "bg-slate-100",
    },
    master: "flex-1 relative z-0 overflow-y-auto scrollbar focus:outline-none",
    padding: "py-6",
    content: {
      master: "",
      padding: "py-4",
    },
  },
  SidebarNavigation: {
    container: {
      master: "flex flex-col gap-5 md:h-screen md:w-64",
      dark: "text-white bg-slate-800",
      light: "text-slate-700 bg-white border-b border-slate-200",
      default: "text-white bg-primary-dark",
      padding: "p-4 md:px-3",
    },
    topContainer: "w-full grid grid-cols-3 justify-center md:flex justify-between",
    base: {
      master: "flex-col space-y-1 scrollbar overflow-y-auto",
      container: "h-96 flex-col flex-grow",
      boxShadow: "shadow-sm",
      borderRadius: "rounded-md",
      default: "text-white bg-primary",
      dark: "text-white bg-slate-700",
      light: "text-slate-700 bg-slate-100 border-b border-slate-200",
      padding: "p-2",
    },
    navButtons: {
      container: "md:hidden flex items-center text-center justify-start md:justify-center",
      margin: "ml-4 md:ml-8",
      size: "h-10",
      hover: "primary",
      master: "hover:text-black",
      default: "text-primary-light",
      dark: "text-slate-300",
      light: "text-slate-700",
    },
    bottomActions: {
      master: "flex flex-col justify-end flex-grow",
      padding: "pt-2",
    },
    logo: {
      master: "flex justify-center items-center",
      withTopRightAction: {
        master: "md:justify-start md:col-span-2",
        margin: "md:ml-2",
      },
      withoutTopRightAction: "md:justify-center md:col-span-3",
    },
    topRightAction: {
      master: "w-full flex justify-end md:ml-0",
    },
    item: {
      master: "flex leading-5",
      padding: "py-2 px-3",
      fontSize: "text-button-lg md:text-button-sm",
      base: {
        fontWeight: "font-medium",
        default: `w-full text-white text-center justify-center hover:bg-primary-dark hover:text-slate-300
        md:text-start md:justify-start md:rounded-none md:border-l-2 md:border-transparent 
        md:hover:text-slate-300 md:hover:bg-transparent md:hover:border-slate-300`,
        dark: `w-full text-slate-200 text-center justify-center hover:bg-slate-800 hover:text-slate-300
        md:text-start md:justify-start md:rounded-none md:border-l-2 md:border-transparent 
        md:hover:text-slate-300 md:hover:bg-transparent md:hover:border-slate-300`,
        light: `w-full text-slate-500 text-center justify-center hover:bg-slate-200 hover:text-slate-700
        md:text-start md:justify-start md:rounded-none md:border-l-2 md:border-transparent
        md:hover:text-slate-700 md:hover:bg-transparent md:hover:border-slate-400`,
      },
      active: {
        fontWeight: "font-semibold",
        default: `bg-primary-dark border-primary-light rounded-md justify-center
        md:justify-start md:bg-transparent md:border-l-2 
        md:hover:text-slate-300 md:rounded-none`,
        dark: `bg-slate-800 border-primary rounded-md justify-center
        md:justify-start md:bg-transparent md:border-l-2 
        md:hover:text-slate-300 md:rounded-none`,
        light: `text-slate-700 bg-slate-200 border-primary-dark rounded-md 
        justify-center md:justify-start md:bg-transparent md:border-l-2  
        md:hover:text-slate-500 md:rounded-none`,
      },
      expandable: {
        container: "w-full flex space-x-0.5 justify-center items-center",
        subitemsContainer: {
          padding: "p-2",
          margin: "md:ml-4",
          borderRadius: "rounded-md md:rounded",
          boxShadow: "shadow-sm",
          width: "w-4/5",
          default: "bg-primary-dark",
          dark: "bg-slate-800 ",
          light: "bg-white ",
        },
      },
      inactive: {
        default: "text-white",
        dark: "text-slate-200",
        light: "text-slate-500",
      },
      transition: "transition duration-150 ease-in-out",
    },
    icon: {
      master: `w-6 h-6 flex items-center transition ease-in-out duration-150 group-hover:text-primary-light group-focus:text-primary-light`,
      color: "text-primary-light",
    },
    dropdownItem: {
      master: "my-1 block flex justify-center md:justify-start",
      padding: "py-2 px-2 md:pl-2 md:py-0.5",
      fontSize: "text-button-lg md:text-button-sm",
      base: {
        fontWeight: "font-medium",
        default: `w-full text-white text-center justify-center 
        hover:bg-primary hover:text-slate-300 md:border-transparent 
        md:text-start md:justify-start md:rounded-none md:border-l-2
        md:hover:text-slate-300 md:hover:bg-transparent md:hover:border-slate-300`,
        dark: `w-full text-slate-200 text-center justify-center
        hover:bg-slate-700 hover:text-slate-300 md:border-transparent 
        md:text-start md:justify-start md:rounded-none md:border-l-2
        md:hover:text-slate-300 md:hover:bg-transparent md:hover:border-slate-300`,
        light: `w-full text-slate-500 text-center justify-center 
        hover:bg-slate-200 hover:text-slate-700 md:border-transparent 
        md:text-start md:justify-start md:rounded-none md:border-l-2
        md:hover:text-slate-700 md:hover:bg-transparent md:hover:border-slate-400`,
      },
      active: {
        fontWeight: "font-semibold",
        default: `text-slate-200 bg-primary rounded-md justify-center
        border-primary-light md:justify-start md:bg-transparent md:border-l-2 
        md:hover:text-slate-300 md:rounded-none`,
        dark: `text-slate-200 bg-slate-700 rounded-md justify-center 
        border-primary-600 md:justify-start md:bg-transparent md:border-l-2 
        md:hover:text-slate-300 md:rounded-none`,
        light: `text-slate-700 bg-slate-200 rounded-md justify-center  
        border-primary-600 md:justify-start md:bg-transparent md:border-l-2  
        md:hover:text-slate-500 md:rounded-none`,
      },
      transition: "transition duration-150 ease-in-out",
    },
  },
  Slider: {
    outerContainer: "h-10",
    innerContainer: "h-2",
    base: "h-2 rounded",
    backgroundColor: "bg-slate-400",
    Marker: {
      master: "w-0 top-4 box-border border border-black border-r-0",
      container: "w-px",
      backgroundColor: "bg-cool-slate-900",
      markerLabel: "h-5",
      markerNoLabel: "h-3 mt-2 ",
      text: "h-4 text-xs text-cool-slate-900",
    },
    Value: {
      base: "h-2 rounded border border-solid ",
      outer: "h-2",
      inner: "w-4 h-4 -mt-1 -mr-2 rounded-lg border border-solid",
      colors: ["border-primary bg-primary-light"],
    },
  },
  StackedLayout: {
    master: "min-h-screen",
    backgroundColor: "bg-white",
    grayBackgroundColor: "bg-slate-100",
    compactPadding: "py-4",
    padding: "py-6",
    contentContainer: "px-4 py-8 sm:px-0 z-0",
  },
  StatusButton: {
    icon: {
      size: {
        xs: 2,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
      },
    },
  },
  Tabs: {
    outerContainer: "border-b border-base",
    innerContainer: "-mb-px pb-0.5 flex space-x-4",
    withoutScrollButtons: "overflow-x-auto scrollbar",
    Tab: {
      base: {
        master: `cursor-pointer select-none focus:outline-none `,
        width: "w-full",
        padding: "px-1 py-4",
        borderBottomWidth: "border-b-2",
        fontWeight: "font-medium",
        fontSize: "text-base",
      },
      active: {
        master: `focus:text-primary focus:border-primary`,
        borderColor: "border-primary",
        color: "text-primary",
      },
      inactive: {
        master: "hover:text-slate-700 hover:border-slate-300 focus:text-slate-700 focus:border-slate-300",
        borderColor: "border-transparent",
        color: "text-slate-500",
      },
      fullWidth: "text-center flex-1 justify-center leading-5 cursor-pointer select-none focus:outline-none",
      noIcon: "whitespace-no-wrap",
      withIcon: {
        leading: "group inline-flex items-center",
        trailing: "group inline-flex flex-row-reverse items-center",
      },
      withScrollButtons: "whitespace-nowrap",
    },
    Icon: {
      base: {
        leading: "-ml-0.5 mr-2 w-5 h-5 ",
        trailing: "-mr-0.5 ml-2 w-5 h-5 ",
      },
      inactive: "text-slate-400 group-hover:text-slate-500 group-focus:text-slate-600",
      active: `text-primary group-focus:text-primary`,
    },
  },
  TestUsersPicker: {
    backgroundColor: "bg-blue-200",
  },
  Textarea: {
    master: "w-full block",
    fontSize: "text-base",
    borderColor: `border border-slate-300 focus:border-primary-300`,
    borderRadius: "rounded-md",
    padding: "px-3 py-2",
    boxShadow: `focus:outline-none focus:ring focus:ring-primary-light`,
    container: {
      base: "rounded-md shadow-sm",
      withLabel: "mt-1",
    },
    error: {
      borderColor: `border border-danger focus:border-danger-300`,
      color: "text-danger-dark",
      placeholder: "placeholder-danger",
      boxShadow: `focus:ring focus:ring-danger-light focus:outline-none`,
      Icon: {
        color: "text-danger",
      },
    },
    disabled: "opacity-50",
  },
  TimePicker: {
    container: "w-full flex flex-col items-center justify-center bg-white shadow p-2 left-0",
    innerContainer: "mt-2 mb-3 flex justify-center space-x-4 items-center",
    pickerHeaderContainer: "flex justify-between items-center space-x-1",
    pickerBodyContainer: "flex justify-center mb-2",
    clockContainer: {
      master: "relative flex justify-center items-center",
      backgroundColor: "bg-primary-50",
    },
    clockButtonsContainer: "flex justify-between items-center space-x-2",
    twentyFourHoursClockContainer: "relative flex justify-center items-center",
    twentyFourHoursClock: "absolute bg-slate-200 flex justify-center items-center",
    digitInputContainer: "pb-3 flex items-center space-x-1",
    digitInput: "w-16 flex justify-center items-center",
    handContainer: "absolute flex justify-center items-center pointer-events-none select-none relative",
    handline: {
      master: "absolute pointer-events-none select-none",
      backgroundColor: "bg-primary",
    },
    smallHandPointer: "absolute bg-white pointer-events-none select-none",
    clockDigitsContainer: "relative text-sm flex justify-center items-center pointer-events-none select-none",
    clockDigits: "absolute pointer-events-none select-none",
  },
  TimeInput: {
    container: "",
  },
  TopNavigation: {
    color: "primary",
    base: {
      master: "flex flex-col md:flex md:justify-between md:w-full",
      padding: "py-4",
      dark: "text-white bg-slate-800",
      light: "text-slate-700 bg-white border-b border-slate-200",
      default: "text-white bg-primary-dark",
    },
    logo: {
      master: "ml-0 md:ml-2 shrink-0",
      withTopRightAction: {
        master: "md:justify-start md:col-span-2",
        margin: "md:ml-2",
      },
      withoutTopRightAction: "md:justify-center md:col-span-3",
    },
    navButtons: {
      hover: "primary",
      master: "hover:text-black",
      default: "text-primary-light",
      dark: "text-slate-300",
      light: "text-slate-700",
    },
    Item: {
      master: "flex leading-5",
      padding: "px-3 py-2",
      fontSize: "text-button-lg md:text-button-sm",
      base: {
        fontWeight: "font-medium",
        transition: "transition ease-in-out duration-150",
        default: `w-full text-white text-center justify-center
        hover:bg-primary hover:text-slate-300 md:border-transparent
        md:text-start md:justify-start md:rounded-none md:border-b-2
        md:hover:text-slate-300 md:hover:bg-transparent md:hover:border-slate-300`,
        dark: `w-full text-slate-200 text-center justify-center
        hover:bg-slate-700 hover:text-slate-300 md:border-transparent
        md:text-start md:justify-start md:rounded-none md:border-b-2
        md:hover:text-slate-300 md:hover:bg-transparent md:hover:border-slate-300`,
        light: `w-full text-slate-500 text-center justify-center
        hover:bg-slate-200 hover:text-slate-700 md:border-transparent
        md:text-start md:justify-start md:rounded-none md:border-b-2
        md:hover:text-slate-700 md:hover:bg-transparent md:hover:border-slate-400`,
      },
      active: {
        fontWeight: "font-semibold",
        default: `w-full bg-primary rounded-md border-primary-light
        justify-center md:justify-start md:bg-transparent md:border-b-2
        md:hover:text-slate-300 md:rounded-none`,
        dark: `w-full bg-slate-700 rounded-md border-primary
        justify-center md:justify-start md:bg-transparent md:border-b-2
        md:hover:text-slate-300 md:rounded-none`,
        light: `w-full text-slate-700 bg-slate-200 rounded-md border-primary-dark
        justify-center md:justify-start md:bg-transparent md:border-b-2
         md:hover:text-slate-500 md:rounded-none`,
      },
      expandable: {
        container: "flex items-center space-x-0.5",
        subitemsContainer: {
          master: "rounded-md",
          padding: "p-2 px-2",
          width: "w-full",
          default: "bg-primary",
          dark: "bg-slate-900 ",
          light: "bg-slate-100 ",
        },
      },
      inactive: {
        default: "text-white",
        dark: "text-slate-200",
        light: "text-slate-500",
      },
      space: "ml-4",
      transition: "transition duration-300 ease-in-out",
    },
    fullWidth: "w-full px-4 grid grid-cols-3 justify-center md:flex justify-between",
    container: "max-w-7xl mx-auto",
    innerContainer: "flex justify-center items-center md:ml-2 md:justify-start md:col-span-2",
    menuContainer: "hidden md:block",
    innerMenuContainer: "flex items-baseline space-x-4",
    actionsAndDropdownContainer: "hidden md:block ml-2 md:col-start-3",
    innerActionsAndDropdownContainer: "flex justify-end items-center",
    menuButtonContainer: "md:hidden flex items-center text-center justify-start md:justify-center",
    smallMenuContainer: "flex flex-wrap flex-col",
    smallMenuInnerContainer: "mx-4 px-2 pb-3 flex flex-col space-y-2 flex-start flex-wrap items-start",
    smallDropdownContainer: "pb-3 flex flex-col flex-wrap ",
    smallDropdown: "px-4 flex items-center",
    actionsContainer: "flex-shrink-0",
    smallActions: {
      master: "px-4 pt-2 py-2 pb-3 flex flex-col flex-wrap items-start space-y-2",
      color: {
        light: "border-t-2 border-black",
        dark: "border-t-2 border-white",
        default: "border-t-2 border-white",
      },
    },
    actions: "flex items-center space-x-2",
    dropdownContainer: "ml-4 relative flex-shrink-0",
    border: {
      light: "border-b-2 border-black",
      dark: "border-b-2 border-white",
      default: "border-b-2 border-white",
    },
    dropdownItem: {
      master: "my-1 py-2 px-2 block flex justify-center md:pl-2 md:py-0.5 md:justify-start",
      fontSize: "text-button-lg md:text-button-sm",
      base: {
        fontWeight: "font-medium",
        default: `w-full text-white text-center justify-center
        hover:bg-primary-dark hover:text-slate-300 md:text-start md:justify-start
        md:rounded-none md:border-l-2 md:border-transparent md:hover:text-slate-300
        md:hover:bg-transparent md:hover:border-slate-300`,
        dark: `w-full text-slate-200 text-center justify-center 
        hover:bg-slate-700 hover:text-slate-300 md:text-start md:justify-start
        md:rounded-none md:border-l-2 md:border-transparent md:hover:text-slate-300
         md:hover:bg-transparent md:hover:border-slate-300`,
        light: `w-full text-slate-500 text-center justify-center 
        hover:bg-slate-200 hover:text-slate-700 md:text-start md:justify-start
        md:rounded-none md:border-l-2 md:border-transparent md:hover:text-slate-700
        md:hover:bg-transparent md:hover:border-slate-400`,
      },
      active: {
        fontWeight: "font-semibold",
        default: `text-slate-200 bg-primary-dark rounded-md justify-center
        md:justify-start md:bg-transparent md:border-l-2 border-primary-light 
        md:hover:text-slate-300 md:rounded-none`,
        dark: `text-slate-200 bg-slate-700 rounded-md justify-center 
        md:justify-start md:bg-transparent md:border-l-2 border-primary-600 
        md:hover:text-slate-300 md:rounded-none`,
        light: `text-slate-700 bg-slate-200 rounded-md justify-center 
        md:justify-start md:bg-transparent md:border-l-2 border-primary-600 
        md:hover:text-slate-500 md:rounded-none`,
      },
      transition: "transition duration-150 ease-in-out",
    },
    smallDropdownItem: {
      master: "my-1 py-2 block text-center",
      fontSize: "text-button-lg md:text-button-sm",
      base: {
        fontWeight: "font-medium",
        default: `text-white hover:text-slate-200 hover:bg-primary-700 focus:bg-primary-700`,
        dark: `text-slate-200 hover:text-white hover:text-slate-300 hover:bg-slate-700 focus:bg-slate-700`,
        light: `text-slate-500 hover:text-slate-700 hover:bg-slate-200 focus:bg-slate-200`,
      },
      active: {
        fontWeight: "font-semibold",
        default: `bg-primary-700 rounded-md md:rounded-none text-white`,
        dark: `bg-slate-700 rounded-md md:rounded-none text-white`,
        light: `bg-slate-200 rounded-md md:rounded-none text-slate-700`,
      },
      transition: "transition duration-150 ease-in-out",
    },
    menuButton:
      "px-2 py-2 text-slate-400 rounded-md hover:text-white hover:bg-slate-700 focus:outline-none " +
      "focus:text-white focus:bg-slate-700",
    searchBarContainer: "flex-1 flex px-2 lg:ml-4",
    searchBar: "w-full max-w-sm lg:max-w-xs",
  },
  Toggle: {
    master: "flex items-center space-x-3",
    container: "mx-auto mt-1",
    base: "w-11 h-6 relative inline-flex rounded-full border-2 border-transparent shrink-0 cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring focus:ring-primary-light",
    backgroundColor: "bg-primary",
    gray: "bg-gray-200",
    label: {
      color: "text-body",
      padding: "p-0",
      fontSize: "text-label",
    },
    disabled: "opacity-70 pointer-events-none",
    toggle:
      "inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 flex align-center",
    icon: {
      master: "flex items-center",
      margin: "my-[3px] ml-[2.8px]",
      size: 3,
    },
  },
  Tooltip: {
    master: "border border-transparent bg-opacity-75 absolute whitespace-nowrap z-50 pointer-events-none shadow",
    padding: "px-2 py-1",
    borderRadius: "rounded",
    fontSize: "text-base",
    color: "text-white",
    backgroundColor: "bg-black",
  },
  Typography: {
    container: {
      base: "flex items-center",
    },
    variant: {
      text: {
        fontSize: "text-base",
        color: "text-body",
      },
      subtext: {
        fontSize: "text-subtitle",
        color: "text-body-light",
      },
      title: {
        fontSize: "text-title",
        color: "text-body",
      },
      subtitle: {
        fontSize: "text-subtitle",
        color: "text-body-light",
      },
      h1: {
        fontSize: "text-h1",
        color: "text-body",
      },
      h2: {
        fontSize: "text-h2",
        color: "text-body",
      },
      h3: {
        fontSize: "text-h3",
        color: "text-body",
      },
      h4: {
        fontSize: "text-h4",
        color: "text-body",
      },
      h5: {
        fontSize: "text-h5",
        color: "text-body",
      },
      h6: {
        fontSize: "text-h6",
        color: "text-body",
      },
    },
    icon: {
      base: "shrink-0 w-5 h-5",
      marginRight: "mr-1.5",
      marginLeft: "ml-0.5",
      text: "",
      subtext: "text-slate-400",
      title: "",
      subtitle: "text-slate-400",
    },
  },
};

const defaultTheme = createTheme({ component: defaultComponentConfig });

export type IconProps = {
  size: number;
  className: string;
};

export type IconConfig = {
  dismiss: (props: Partial<IconProps>) => React.ReactElement;
  breadcrumbs: (props: Partial<IconProps>) => React.ReactElement;
  openExpander: (props: Partial<IconProps>) => React.ReactElement;
  closeExpander: (props: Partial<IconProps>) => React.ReactElement;
  paginatorPrevious: (props: Partial<IconProps>) => React.ReactElement;
  paginatorNext: (props: Partial<IconProps>) => React.ReactElement;
  completed: (props: Partial<IconProps>) => React.ReactElement;
  warning: (props: Partial<IconProps>) => React.ReactElement;
  sortDesc: (props: Partial<IconProps>) => React.ReactElement;
  sortAsc: (props: Partial<IconProps>) => React.ReactElement;
  date: (props: Partial<IconProps>) => React.ReactElement;
  time: (props: Partial<IconProps>) => React.ReactElement;
  inputError: (props: Partial<IconProps>) => React.ReactElement;
  showPassword: (props: Partial<IconProps>) => React.ReactElement;
  hidePassword: (props: Partial<IconProps>) => React.ReactElement;
  menu: (props: Partial<IconProps>) => React.ReactElement;
  search: (props: Partial<IconProps>) => React.ReactElement;
  upload: (props: Partial<IconProps>) => React.ReactElement;
  file: (props: Partial<IconProps>) => React.ReactElement;
  loading: (props: Partial<IconProps>) => React.ReactElement;
  undo: (props: Partial<IconProps>) => React.ReactElement;
  redo: (props: Partial<IconProps>) => React.ReactElement;
  listBullets: (props: Partial<IconProps>) => React.ReactElement;
  listNumbers: (props: Partial<IconProps>) => React.ReactElement;
  textItalic: (props: Partial<IconProps>) => React.ReactElement;
  textBolder: (props: Partial<IconProps>) => React.ReactElement;
  textUnderline: (props: Partial<IconProps>) => React.ReactElement;
  textStrikethrough: (props: Partial<IconProps>) => React.ReactElement;
  textIndent: (props: Partial<IconProps>) => React.ReactElement;
  textOutdent: (props: Partial<IconProps>) => React.ReactElement;
  textAlignLeft: (props: Partial<IconProps>) => React.ReactElement;
  textAlignCenter: (props: Partial<IconProps>) => React.ReactElement;
  textAlignRight: (props: Partial<IconProps>) => React.ReactElement;
  textAlignJustify: (props: Partial<IconProps>) => React.ReactElement;
  table: (props: Partial<IconProps>) => React.ReactElement;
  link: (props: Partial<IconProps>) => React.ReactElement;
  linkBreak: (props: Partial<IconProps>) => React.ReactElement;
};

export const defaultIconConfig = {
  dismiss: (props: Partial<IconProps>) => <span className={props.className}>&times;</span>,
  breadcrumbs: (props: Partial<IconProps>) => <span className={props.className}>&gt;</span>,
  openExpander: (props: Partial<IconProps>) => <span className={props.className}>-</span>,
  closeExpander: (props: Partial<IconProps>) => <span className={props.className}>+</span>,
  paginatorPrevious: (props: Partial<IconProps>) => <span className={props.className}>&lt;</span>,
  paginatorNext: (props: Partial<IconProps>) => <span className={props.className}>&gt;</span>,
  completed: (props: Partial<IconProps>) => <span className={props.className}>✓</span>,
  warning: (props: Partial<IconProps>) => <span className={props.className}>!</span>,
  sortDesc: (props: Partial<IconProps>) => <span className={props.className}>↓</span>,
  sortAsc: (props: Partial<IconProps>) => <span className={props.className}>↑</span>,
  date: (props: Partial<IconProps>) => <span className={props.className}></span>,
  time: (props: Partial<IconProps>) => <span className={props.className}></span>,
  inputError: (props: Partial<IconProps>) => <span className={props.className}></span>,
  showPassword: (props: Partial<IconProps>) => <span className={props.className}>👁️</span>,
  hidePassword: (props: Partial<IconProps>) => <span className={props.className}></span>,
  menu: (props: Partial<IconProps>) => <span className={props.className}></span>,
  search: (props: Partial<IconProps>) => <span className={props.className}>🔍</span>,
  upload: (props: Partial<IconProps>) => <span className={props.className}></span>,
  file: (props: Partial<IconProps>) => <span className={props.className}></span>,
  loading: (props: Partial<IconProps>) => <span className={cx("spinner", props.className)}>↺</span>,
  undo: (props: Partial<IconProps>) => <span className={props.className}>&larr;</span>,
  redo: (props: Partial<IconProps>) => <span className={props.className}>&rarr;</span>,
  listBullets: (props: Partial<IconProps>) => <span className={props.className}></span>,
  listNumbers: (props: Partial<IconProps>) => <span className={props.className}></span>,
  textItalic: (props: Partial<IconProps>) => <span className={props.className}></span>,
  textBolder: (props: Partial<IconProps>) => <span className={props.className}></span>,
  textUnderline: (props: Partial<IconProps>) => <span className={props.className}></span>,
  textStrikethrough: (props: Partial<IconProps>) => <span className={props.className}></span>,
  textIndent: (props: Partial<IconProps>) => <span className={props.className}></span>,
  textOutdent: (props: Partial<IconProps>) => <span className={props.className}></span>,
  textAlignLeft: (props: Partial<IconProps>) => <span className={props.className}></span>,
  textAlignCenter: (props: Partial<IconProps>) => <span className={props.className}></span>,
  textAlignRight: (props: Partial<IconProps>) => <span className={props.className}></span>,
  textAlignJustify: (props: Partial<IconProps>) => <span className={props.className}>&#9776;</span>,
  table: (props: Partial<IconProps>) => <span className={props.className}></span>,
  link: (props: Partial<IconProps>) => <span className={props.className}></span>,
  linkBreak: (props: Partial<IconProps>) => <span className={props.className}></span>,
};

export type Theme = {
  component: ThemeComponentConfig;
};

export type ThemeConfigFactory = {
  component: DeepPartial<ThemeComponentConfig>;
};

export type ThemeComponentConfig = typeof defaultComponentConfig;

export type ThemeComponentType = keyof Theme["component"];

export function createTheme({ component }: ThemeConfigFactory): Theme {
  const mergedComponent = component ? merge(defaultComponentConfig, component) : defaultComponentConfig;

  return {
    component: mergedComponent,
  };
}

export default defaultTheme;
