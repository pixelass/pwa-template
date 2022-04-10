# File names

In order to optimize for smaller bundles and easier to understand we separate certain parts from
each other.

## Example

```
atoms
   ┣━ my-component
   ┃  ┣━ constants.js
   ┃  ┣━ index.jsx
   ┃  ┣━ styled.js
   ┃  ┣━ styles.js 
   ┃  ┣━ types.js
   ┃  ┣━ utils.js
   ┃  ┗━ [*].js
   ┗━ ...
```

* `constants.js`: local constants
* `index.jsx`: the main component (`export default`)
* `styled.js`: styled components via `import styled from "@emotion/styled"`
* `styles.js`: styles  via `import {css} from "@emotion/react"`
* `utils.js`: local utility functions
* `[*].ts`: add more files in case you need them
  * i.e. `items.{js,json}`
  
## Exports

We use named exports in all files except for the `index.jsx`.
We need to use `export default` to allow better DX when using components in dynamic imports

## File extension

Use `.jsx` if your file contains JSX. In all other cases use `.js` (or `.json` when applicable) 

