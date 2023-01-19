# Contributing to Tiller

Thank you for your interest in contributing to Tiller. Anyone is welcome to open [issues](https://github.com/croz-ltd/tiller/issues) or
[pull requests](https://github.com/croz-ltd/tiller/pulls) for bug fixes, feature requests, or ideas. If unsure where to start, you can open a
[discussion](https://github.com/croz-ltd/tiller/discussions) topic first.

As Tiller evolves, the policies described here might change.

## Setup

To start contributing to Tiller, you should clone GitHub's repository.<br>
Run the `yarn install` command to install all required dependencies.

Once you have completed these two steps, you can begin to contribute to Tiller.<br>
We encourage you to use the following useful tools:

- Intellij IDEA<br>
- Prettier

## Git Workflow

### Creating new Issues
Check if the Issue tracker already contains the same (or a very similar) issue.
Ensure the title is clear about what the problem is.
Be aware Issue can be closed if it doesn't follow the code of conduct or if its content is not considered a useful contribution to Tiller.

### Branching policy

Work on one functionality at a time and avoid pull requests with multiple functionalities.
In case you have many contributions, please split them into separate pull requests.

Tiller uses a workflow based on the **branching policy**.
This policy distinguishes the following branches:

- **master** – main branch: fully stable
- **feature/bugfix/task-branches** – a single branch that can be created by any developer, who is responsible for new features, fixes or bugs reported.
 
Each branch name should start with the appropriate prefix and be named based on the corresponding issue. Branch names should follow the following format: `{prefix}/{issue number}`.

Examples:

- feature: feature/12
- bugfix: bugfix/14
- task: task/16

Branches merged into master will be **deleted** from the main repository.

    
### Creating new branches

New branches **must** be created from **master**.
Master is the main branch that contains only fully stable, published project iterations.

### Storybook
If there are modifications to the component, it is necessary to adjust the story/stories accordingly.

## Commit Messages

Start with the issue number and write in imperative. <br>
Example: #9 Fix Autocomplete error message

### Creating pull request
1. Start with the issue number e.g. #15.
2. Title must be clear on what is going to change.
3. The description must include an explanation of what has changed and specify the issue it closes.

## Code of conduct

Our [Code of conduct](./CODE_OF_CONDUCT.md) governs this project and everyone participating in it. By participating, you are expected to uphold this code.
