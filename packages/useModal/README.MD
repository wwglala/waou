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
pnpm add @waou/use-modal
```

# Usage

### basic use

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "@waou/use-modal";
import { Modal, SideSheet } from "@douyinfe/semi-ui";

function Child() {
  const [dispatch] = useModal(FunctionComponent, { modalProps: { title: "modal" }});

  return <button onClick={() => dispatch(true)}>open</button>;
}

function App() {
  return (
    <ModalProvider modal={Modal} sideSheet={SideSheet}>
      <Child />
    </ModalProvider>
  );
}

ReactDOM.render(<App />, document.getElement("root"));
```

### support parent refresh

```jsx
function Child() {
  const [count, setCount] = useState(0);
  const [dispatch] = useModal(
    FunctionComponent,
    { count, modalProps: { title: "modal" } },
    [count]
  );

  useEffect(() => {
    setCount((count) => count + 1);
  }, []);

  return <button onClick={() => dispatch(true)}>open</button>;
}

function App() {
  return (
    <ModalProvider modal={Modal} sideSheet={SideSheet}>
      <Child />
    </ModalProvider>
  );
}

ReactDOM.render(<App />, document.getElement("root"));
```

### support share context

```jsx
import React, { createContext } from "react";

const Context = createContext(0);

function Demo() {
  const count = useContext(Context);
  return <div>{count}</div>;
}

function Child() {
  const [count, setCount] = useState(0);
  const [dispatch] = useModal(Demo, { modalProps: { title: "modal" } });

  useEffect(() => {
    setCount((count) => count + 1);
  }, []);

  return <button onClick={() => dispatch(true)}>open</button>;
}

function App() {
  return (
    <Context.Provider value={count}>
      <ModalProvider modal={Modal} sideSheet={SideSheet}>
        <Child />
      </ModalProvider>
    </Context.Provider>
  );
}

ReactDOM.render(<App />, document.getElement("root"));
```

### delivery and inject props
```tsx
import { useInjectProps } from '@waou/use-modal'

function ModalContent() {
  const { injectModalProps } = useInjectProps()

  useEffect(()=>{
    injectModalProps({
      async onOk(){
        await ajax()
      }
    })
  },[])

  return <div>i am modal content</div>;
}

function Demo() {
  const [dispatch] = useModal(ModalContent)

  
  return <button onClick={()=>{dispatch(true)}}>open</button>;
}



function App() {
  return (
    <ModalProvider modal={Modal} sideSheet={SideSheet}>
      <Demo />
    </ModalProvider>
  );
}

ReactDOM.render(<App />, document.getElement("root"));
```


# API

### ModalProvider
|      modal       |   sideSheet   | 
| :------------------: | :------------: | 
| functionComponent | functionComponent | 


### useModal

|      component       |   props   | deps  |
| :------------------: | :------------: | :---: |
| function/JSX.Element | ......... | Array |

### useInjectProps

```ts

const { onClose,onResolve,onReject,injectModalProps } = useInjectProps()


```