# useModal

> a simple react hook to deal with modal!

![npm version](https://camo.githubusercontent.com/08e492e9cf8a5b2e03b2d82282632262018c0336f77bc6be130499b2540919d4/687474703a2f2f696d672e736869656c64732e696f2f6e706d2f762f72632d73656c6563742e7376673f7374796c653d666c61742d737175617265)

| Dependencies |   DevDependencies    |
| :----------- | :------------------: |
| 0            | react、react-dom ... |

---

# Feature

1. react hook
2. function programming
3. simple

# install

```js
npm i @waou/use-modal
yarn add @waou/use-modal
```

# Usage

### basic use

```js
import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "@waou/use-modal";
import { Dialog, Drawer } from "@alifd/next";

function Child() {
  const [dispatch] = useModal(<YOUR_Component />, { title: "modal" });

  return <button onClick={() => dispatch(true)}>open</button>;
}

function App() {
  return (
    <ModalProvider config={{ Dialog, Drawer }}>
      <Child />
    </ModalProvider>
  );
}

ReactDOM.render(<App />, document.getElement("root"));
```

### support parent refresh

```js
function Child() {
  const [count, setCount] = useState(0);
  const [dispatch] = useModal(
    <YOUR_Component count={count} />,
    { title: "modal" },
    [count]
  );

  useEffect(() => {
    setCount((count) => count + 1);
  }, []);

  return <button onClick={() => dispatch(true)}>open</button>;
}

function App() {
  return (
    <ModalProvider config={{ Dialog, Drawer }}>
      <Child />
    </ModalProvider>
  );
}

ReactDOM.render(<App />, document.getElement("root"));
```

### support share context

```js
import React, { createContext } from "react";

const Context = createContext(0);

function YOUR_Component() {
  const count = useContext(Context);
  return <div>{count}</div>;
}

function Child() {
  const [count, setCount] = useState(0);
  const [dispatch] = useModal(<YOUR_Component />, { title: "modal" });

  useEffect(() => {
    setCount((count) => count + 1);
  }, []);

  return <button onClick={() => dispatch(true)}>open</button>;
}

function App() {
  return (
    <Context.Provider value={count}>
      <ModalProvider config={{ Dialog, Drawer }}>
        <Child />
      </ModalProvider>
    </Context.Provider>
  );
}

ReactDOM.render(<App />, document.getElement("root"));
```

# API

### params

|      component       |   modalProps   | deps  |
| :------------------: | :------------: | :---: |
| function/JSX.Element | title、onOk... | Array |
