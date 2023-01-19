![Tiller cover image](https://raw.githubusercontent.com/croz-ltd/tiller/master/img/tiller_cover.png)

## <h1 align="center">Tiller Design System</h1>

<p align="center">
<a href="https://github.com/croz-ltd/tiller/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="Tiller is released under the Apache-2.0 license" />
  </a>
  <a href="https://github.com/croz-ltd/tiller/actions/workflows/build.yml">
    <img src="https://github.com/croz-ltd/tiller/actions/workflows/build.yml/badge.svg" alt="CI workflow status" />
  </a>
  <a href="https://github.com/croz-ltd/tiller/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" />
  </a>
</p>

> A design system is a set of standards to manage design at scale by reducing redundancy while creating a shared language and visual consistency across different pages and channels.

**Tiller Design System** is open-source UI library which offers a set of visual, functional components and patterns that accelerate design and development. Components are endlessly customizable, accessible, and can integrate into any application with primarily focus on back-office applications. <br>
Tiller design system is based on **Tailwind CSS, Formik** and **ReachUI**. Besides these, Tiller is made with the help of **[Nx](https://nx.dev/), [Yarn 2](https://yarnpkg.com/)** and **[Storybook](https://storybook.js.org/)**.

| Package Name                                                                     | Version                                                          |
|----------------------------------------------------------------------------------|------------------------------------------------------------------|
| [@tiller-ds/core](https://www.npmjs.com/package/@tiller-ds/core)                 | ![](https://img.shields.io/npm/v/@tiller-ds/core/latest)         |
| [@tiller-ds/cra-template](https://www.npmjs.com/package/@tiller-ds/cra-template) | ![](https://img.shields.io/npm/v/@tiller-ds/cra-template/latest) |

## ✨ Features

- 📦 A set of high-quality React components out of the box
- 🛡 Written in TypeScript with predictable static types
- 🌐 Internationalization support
- 🎨 Powerful theme customization in every detail
- 🗃️ Storybook (Docs, Controls, Playroom)
- 📌 Rich Text Editor
- 📌 Login Pattern

## 🎨 Tiller Design System - Figma UI Kit

Tiller DS **UI kit** in **Figma** is a collection of Tiller components that allow you to easily create user interfaces for your **Figma projects**. It includes common components like buttons, input fields, and menus, as well as more specialized components, like Formik components or Login Pattern.

- [Figma UI Kit](https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8627%3A11169&t=F3NI5LM7tIG1qSnq-0)

## 📚 Tiller Docs & Storybook

For more information about **Tiller Design System**, please refer to:

- [Storybook](https://croz-ltd.github.io/tiller/?path=/docs/introduction--page) 
  - Usage documentation for each component
  - Prop documentation for each component
  - Factories for a number of components to easily visualize and create components
  - Code preview for each story
- [GitHub](https://github.com/croz-ltd/tiller)
- [npm](https://www.npmjs.com/package/@tiller-ds/core)

## 🚀 Getting Started

### Installation with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)

1. Install node.js
2. Install yarn
3. Create project with 
   ```
   yarn create react-app app-name --template @tiller-ds/cra-template
   ```
4. Run `yarn start` command to start your project

### Installation with [Vite](https://vitejs.dev/)

1. Install node.js
2. Install yarn
3. Create project with
   ```
   npx degit croz-ltd/tiller-starter-vite
   ```
4. Then run these commands to start your project
   ```
   cd %PROJECT_NAME%
   yarn install
   yarn run dev
   ```

### Installation with custom project setup

If you use your own starter, basic steps needed for Tiller to work are next:

1. Dependency to `@tiller-ds/theme` and other wanted modules for your app
2. `tailwind.config.js` with this minimal config:

```
module.exports = {
  presets: [require('@tiller-ds/theme').preset]
};
```

3. Import of tiller styles in your main css file:

```
@import "@tiller-ds/theme/styles/tiller.css";
```

### Usage

Install packages you’re interested in using, for example, a @tiller-ds/core:
```
npm i @tiller-ds/core
```

```
import { Button } from "@tiller-ds/core";

<Button>Hello world!</Button>
```

### Styles

Tiller DS is bundled with a default theme that you can customize to match the look and feel of your project.

Customizations on theme level are implemented using design tokens which we call Tiller tokens.
For guides on Tiller tokens, head on over to our Storybook - [Theming and Customization](https://croz-ltd.github.io/tiller/?path=/docs/theming-and-customization--page).

Tiller Design System is divided into **modules**.

Available modules / packages:
 - `@tiller-ds/alert`
 - `@tiller-ds/core`
 - `@tiller-ds/data-display`
 - `@tiller-ds/date`
 - `@tiller-ds/dev`
 - `@tiller-ds/form-elements`
 - `@tiller-ds/form-elements-advanced`
 - `@tiller-ds/formik-elements`
 - `@tiller-ds/icons`
 - `@tiller-ds/intl`
 - `@tiller-ds/menu`
 - `@tiller-ds/patterns`
 - `@tiller-ds/selectors`
 - `@tiller-ds/theme`
 - `@tiller-ds/upload`
 - `@tiller-ds/util`

For more information about each component, check out our [Storybook](https://croz-ltd.github.io/tiller/?path=/docs/introduction--page).

## Versions
Every monday, a new version of the tiller packages will be published.
Whether is minor or major will depend on the tasks completed the week before. If there is no new version on monday, it means there hasn't been enough changes to update the version.

### Version ranges
When you want to specify a dependency you specify its name and a version range in your package.json like one of these:
```json
{
"dependencies": {
"package-1": ">2.0.0",
"package-2": "^0.4.2",
"package-3": "~2.7.1"
}
}
```
You’ll notice that we have a bunch of characters separate from the version. These characters, >=, <, ^, and ~, are operators and they are used to specify version ranges.
The purpose of a version range is to specify which versions of a dependency will work for your code.


| Description         | Version |
|---------------------|---------|
| Exact version       | 2.0.0   |
| Grater than         | >2.0.1  |
| Compatible changes  | ^2.3.1  |
| Minor-level changes | ~2.4.1  |

If you need the exact version of the package you will install the exact version without any characters in front of the version number. In case you need a specific volume then you'll use greater than sign.
If you only accept compatible changes from the specific major version then you will need to use carrot before the version number. In this case the minor (2.**3**.1) and the patch version (2.3.**1**) will change but the major version (**2**.3.1) will be fixed.
If you accept only minor level changes then you should use tilda and the version number. In this case only the patch version will change (2.4.**1**).

## Frequently asked questions

**What are the major benefits of the Tiller DS?**

- **Better developer experience** Short onboarding process, easier setup, detailed documentation, high-quality React components.
- **Endlessly customizable** Every detail of Tiller DS is customizable to match your brand. Style with Tiller Tokens or override components with your own.
- **Functional components** Formik components wrapped in a Field Formik component, as well as implementation of Fetch.

**Where should I file bugs and requests?**

[Bugs and feature requests for Tiller DS](https://github.com/croz-ltd/tiller/issues/new)

You can also use the above link to report a bug or a feature request for previous version of Tiller Components.

As we continue to work on the new Tiller we will move UI-related issues in the tiller repository over here to work on them. We will continue to maintain major bug and security fixes for all existing UI packages and versions. New development for UI components will happen in this repository.

## 🙌 Contributing

One of the goals of the Tiller Design System is to make building applications as easy as possible, while maintaining high quality UI components. The best way to achieve this goal is through a collective effort. We would appreciate contributions from the community, regardless of their size. 😍

If you're interested, definitely check our [Contributing Guide](https://github.com/croz-ltd/tiller/blob/master/CONTRIBUTING.md).

## 📝 License

Licensed under the [Apache 2.0 License](https://github.com/croz-ltd/tiller/blob/master/LICENSE).
