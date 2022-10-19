# State Management

Finding the best strategy to handle a state of your application or component can be tricky. Often we
need to juggle between performance and ease of use. In this guide we will talk about our approach to
tackle these challenges.

## KISS

We follow the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle). This also counts for
state handling. Over the past years many great concepts have been published. We found
[this article](https://flutter.dev/docs/development/data-and-backend/state-mgmt/options) very
helpful, when making decisions and designing our state management strategy.

## Building states

Let's first look at some very simple state managers on a component level and then extend to build
[finite state machines](https://en.wikipedia.org/wiki/Finite-state_machine) to handle states of our
software.

### Checkbox

Step 1: Adding a local state

In this example we can see how we can intuitively add a local state to a checkbox and make use of
it.

```tsx
import { useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={event_ => {
          setChecked(event_.target.checked);
        }}
      />
      <div>State: {checked ? "ON" : "OFF"}</div>
    </label>
  );
};

const App = () => {
  return (
    <>
      <Checkbox />
    </>
  );
};
```

Step 2: Adding a default state

when we want to add a default state we can make use of React's
[DOM API](https://reactjs.org/docs/uncontrolled-components.html#default-values). Let's add
`defaultChecked` to our component properties.

```tsx
import { useState } from "react";

const Checkbox = ({ defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={event_ => {
          setChecked(event_.target.checked);
        }}
      />
      <div>State: {checked ? "ON" : "OFF"}</div>
    </label>
  );
};

const App = () => {
  return (
    <>
      <Checkbox />
      <Checkbox defaultChecked />
    </>
  );
};
```

Step 3: Allowing outside control

When we build Software, we often want to have more control of our app's state. To allow this we can
create a [controlled component](https://reactjs.org/docs/forms.html#controlled-components).

Let's [lift the state up](https://reactjs.org/docs/lifting-state-up.html). In our case the App will
host the state.

```tsx
import { useState } from "react";

const Checkbox = ({ checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={event_ => {
          onChange(event_.target.checked);
        }}
      />
      <div>State: {checked ? "ON" : "OFF"}</div>
    </label>
  );
};

const App = () => {
  const [appState, setAppState] = useState(false);

  return (
    <>
      <Checkbox
        checked={appState}
        onChange={checked => {
          setAppState(checked);
        }}
      />
      <Checkbox
        checked={appState}
        onChange={checked => {
          setAppState(checked);
        }}
      />
    </>
  );
};
```

Step 4: Building State Providers

When we add more logic to our Software, we can easily lose track of our state. We forget to follow
the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle). To help us we can build state
machines, in our case we will add a [context](https://reactjs.org/docs/context.html) to provide the
state of our feature.

```tsx
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CheckboxContext = createContext();

const CheckpoxProvider = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const check = useCallback(() => {
    setChecked(true);
  }, []);
  const uncheck = useCallback(() => {
    setChecked(true);
  }, []);
  const toggle = useCallback((requestedState?: boolean) => {
    if (typeof requestedState === "boolean") {
      setChecked(requestedState);
    } else {
      setChecked(previousState => !previousState);
    }
  }, []);

  return (
    <CheckboxContext.Provider value={{ checked, check, uncheck, toggle }}>
      {children}
    </CheckboxContext.Provider>
  );
};

const useCheckbox = () => useContext(CheckboxContext);

const Checkbox = ({ checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={event_ => {
          onChange(event_.target.checked);
        }}
      />
      <div>State: {checked ? "ON" : "OFF"}</div>
    </label>
  );
};

const Checkboxes = () => {
  const { toggle, checked } = useCheckbox();
  return (
    <>
      <Checkbox
        checked={checked}
        onChange={requestedChecked => {
          toggle(requestedChecked);
        }}
      />
      <Checkbox
        checked={checked}
        onChange={requestedChecked => {
          toggle(requestedChecked);
        }}
      />
    </>
  );
};

const App = () => {
  return (
    <CheckpoxProvider>
      <Checkboxes />
    </CheckpoxProvider>
  );
};
```

Let's look at this implementation in detail.

We added a context and decided to define a small state machine `CheckboxProvider`. We also define a
[hook](https://reactjs.org/docs/hooks-reference.html) to allow easy access to the machine.

We provide three callbacks with "common names".

```tsx
const on = useCallback(() => {
  /* activate */
}, []);

const off = useCallback(() => {
  /* deactivate */
}, []);

const toggle = useCallback(requestedState => {
  if (typeof requestedState === "boolean") {
    /* satisfy request */
  } else {
    /* toggle */
  }
}, []);
```

Common names allow us to easily understand how to operate different machines. We can also create the
same machine to open or close a dialog, sidebar or similar. We would then use `open`, `close` and
`toggle`.

When we want to operate several machines, we can simply rename the key.

```tsx
const { open: openModal, opened: isModalOpen } = useOpen();
const { open: openDialog, opened: isDialogOpen } = useOpen();
const { open: openSidebar, opened: isSidebarOpen } = useOpen();
```

We renamed the callbacks to better communicate what we are changing. We also renamed the state and
prefixed it with `is`. Adding `is` or `has` allows us to better understand the type of state, which
in our case is a `boolean`. While we kept the previous examples simple and did not prefix the state,
we could design our machines in the same way.

This decision should be discussed with the team and then respected to keep the promise of "common"
communication. Speaking different languages can cause major issues, a very good example is the
[Mars Climate Orbiter](https://en.wikipedia.org/wiki/Mars_Climate_Orbiter) failure.

> An investigation attributed the failure to a measurement mismatch between two software systems:
> metric units by NASA and non-metric (imperial or "English") units by spacecraft builder Lockheed
> Martin.

## Build something awesome, build with conscience

We hope this lesson helped you to understand how to keep it simple, stupid, while still allowing for
complex, big scale software. Don't overthink it, KISS 💋.
