## Documentation

- [typescript, in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Typescript basic types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [Typescript interfaces vs types (more similar than you think)](https://stackoverflow.com/a/52682220)
- [TypeScript Generics](https://www.freecodecamp.org/news/make-typescript-easy-using-basic-ts-generics/)
- [Introduction Documentation to emotion](https://emotion.sh/docs/introduction)
- [React Query overview by the creator](https://www.youtube.com/watch?v=seU46c6Jz7E)
- [React Query and Typescript](https://tkdodo.eu/blog/react-query-and-type-script)

## Supplemental Reading

- [CSS in JS - An excellent summary of current solutions](https://github.com/andreipfeiffer/css-in-js)

## Getting Started

- If using vsCode the first time you open this repository you will be asked if you'd like to install the recommended Extensions. This is, obviously, recommended.

- `npm install`
- `npm start`

- DO spend some time reading the above documentation, the required information to complete the tasks below are contained within.

A note on this repos' setup:

> I am not yet 100% convinced of the chosen libraries for this demo (emotion and react-query); thus, it is my hope to get your honest feedback from using them.

## Tasks

1. Fix the <i>color</i> variable within the Customer interface found [here](/src/api/CustomerApi.ts#L7) by creating a "Color" type, that only allows the 4 choosable colors. You will have to follow the type around to fix associated components found: [here](src/pages/Landing/index.tsx#L87) and [here](src/components/ColoredTd.tsx#L5)

2. Using Typescript generics (inherited types), fix the "any" types found within the "callApi" function found [here](src/api/apiUtilities.ts#L5). Our goal is to always see the outputted types from our [Super real API calls](src/api/CustomerApi.ts#L32)

3. Using `"@emotion/styled"` create a new `MagicalButton` component (reference [ColoredTd](src/components/ColoredTd.tsx)), this new component will have a single additional prop called `isMagical`. When the button `isMagical`, apply the css string literal styling found [here](src/components/helpers.ts#L1). Replace the Submit Button component found [here](src/pages/Landing/index.tsx#L105), ensuring the new isMagical prop is applied.

## Stretch

- Using React Query and our [Super real API calls](src/api/CustomerApi.ts#L38), finish the functionality of the [Add New Customer Modal](src/pages/Landing/index.tsx#L65)

  - For an added stretch create a delete button for each item in the table.

- Using the `Global Styles` from emotion and [useAppContext hook](src/context/index.tsx#L21), fix the nightmode issues found across the app.

- Add a second parameter to the `callApi` function within the [GetCustomers api call](src/api/CustomerApi.ts#L33) so that it reads: `callAPI(customersGetter, 0.7)`. This will create intermittent errors on that endpoint. Handle those errors with the options parameter of useQuery found [here](src/pages/Landing/index.tsx#L41).
