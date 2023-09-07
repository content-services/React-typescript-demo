## Documentation

- [typescript, in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Typescript basic types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [Typescript interfaces vs types (more similar than you think)](https://stackoverflow.com/a/52682220)
- [TypeScript Generics](https://www.freecodecamp.org/news/make-typescript-easy-using-basic-ts-generics/)
- [Introduction Documentation to react-jss](https://cssinjs.org/react-jss#basic)
- [React Query overview by the creator](https://www.youtube.com/watch?v=seU46c6Jz7E)
- [React Query and Typescript](https://tkdodo.eu/blog/react-query-and-type-script)
- [Example of using js ternary operators (these are everywhere in our app, get familiar)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator)
- Examples of js object destructuring: [destructure](https://wesbos.com/destructuring-objects), [rename](https://wesbos.com/destructuring-renaming), [default values](https://wesbos.com/destructuring-default-values)
- [Example of js array destructuring (this can be seen often with component props)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## Supplemental Reading

- [CSS in JS - An excellent summary of current solutions](https://github.com/andreipfeiffer/css-in-js)

## Getting Started

- If using vsCode the first time you open this repository you will be asked if you'd like to install the recommended Extensions. This is, obviously, recommended.

- `npm install`
- `npm start`

- <b>DO</b> spend some time reading the above documentation, the required information to complete the tasks below are contained within.

## Tasks

1. Fix the <i>color</i> variable within the Customer interface found [here](/src/api/CustomerApi.ts#L7) by creating a "Color" type, that only allows the 4 choosable colors. You will have to follow the type around to fix associated components found: [here](src/pages/Landing/index.tsx#L98) and [here](src/components/ColoredTd.tsx#L4)

2. Using `"react-jss"` and `"createUseStyles"` create a new `SnazzyButton` component (reference [ColoredTd](src/components/ColoredTd.tsx)), this new component will use the Patternfly Button component as a base and have a single additional prop called `isSnazzy`. When the button `isSnazzy`, apply the css string literal styling found [here](src/components/helpers.ts#L1). Replace the Submit Button component found [here](src/pages/Landing/index.tsx#L120), ensuring the new `SnazzyButton` has it's isSnazzy prop applied.

3. Using React Query and our [Super real API calls](src/api/CustomerApi.ts#L38), complete the functionality of the [Add New Customer Modal](src/pages/Landing/index.tsx#L65), if you're feeling confident, impliment the "optimistic update" functionality mentioned in the [React Query overview by the creator](https://www.youtube.com/watch?v=seU46c6Jz7E).

4. Make the [Add New Customer Modal](src/pages/Landing/index.tsx#L65) it's own component, importing it into the main [table page](src/pages/Landing/index.tsx).

5. Using React Query and our [Super real API calls](src/api/CustomerApi.ts#L38), add a menu kebab to each item in the table with the "Delete" action. Use [this design](https://www.patternfly.org/v4/components/table#composable-actions) as a reference to help you.

6. Using the existing darkmode context variable and [useAppContext hook](src/context/index.tsx#L21), fix the nightmode issues found within the table and the modal, feel free to use a `ternary operator` where needed.

7. Add a second parameter to the `callApi` function within the [GetCustomers api call](src/api/CustomerApi.ts#L33) so that it reads: `callAPI(customersGetter, 0.7)`. This will create intermittent errors on that endpoint. Handle those errors with the options parameter of useQuery found [here](src/pages/Landing/index.tsx#L41).

8. (HARD) Using Typescript generics (inherited types), fix the "any" types found within the "callApi" function found [here](src/api/apiUtilities.ts#L4). Our goal is to always see the outputted types from our [Super real API calls](src/api/CustomerApi.ts#L32)
