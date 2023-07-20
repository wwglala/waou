# useModal

| Dependencies | peerDependencies |
| :----------- | :--------------: |
| 0            | react、react-dom |

## 前言

使用弹窗的方式多样化，常见的是直接使用 Modal 组件，然后显隐状态放在父容器中进行维护。
其次将组件与需要触发的视图相结合，比如 Button。

第一种控制变量在父组件，性能上有些问题当前组件需要 render 一次，写起来比较麻烦，一旦一个页面调用了多个 Modal，代码量就会非常大，并且有多个变量仅仅是控制 Modal 的隐藏。第二种虽然可以避免一次父组件 render ，但是如果没有相关视图进行绑定或多个地方可以控制它以及 props 的偷穿都是一种十分麻烦的做法。

期望的是像 Toast 那样简单的使用，但 Toast 组件带来便利的同时舍弃了 context、父子 props 更新，那么有没有一种方法既能满足使用的便利又能满足这个特性呢？

经过查证，市面上或多或少存在相关能力，要么是能力不完善，要么在使用上存在一定的麻烦性。

## 期望

1. 调用足够丝滑
2. 性能好
3. 支持父子组件刷新
4. 支持 context
5. 等等

## Feature

1. react hook
2. function programming
3. simple
4. support refresh
5. support context

## install

```js
npm i @waou/use-modal
yarn add @waou/use-modal
pnpm add @waou/use-modal
```

## Usage

### main

使用 ModalProvider 来注入 ui 组件库的 Modal 与 SideSheet，并不仅限于 @douyinfe/semi-ui 中的弹窗组件可以是 antd 、fusion 等其他 ui 组件库

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "@waou/use-modal";
import { Modal, SideSheet } from "@douyinfe/semi-ui";

function App() {
  return (
    <ModalProvider modal={Modal} sideSheet={SideSheet}>
      <Child />
    </ModalProvider>
  );
}

ReactDOM.render(<App />, document.getElement("root"));
```

### basic use

```jsx
function Demo() {
  return <div>content</div>;
}

function Child() {
  const [dispatch] = useModal(Demo, {
    count,
    modalProps: { title: "modal" },
  });

  return <button onClick={() => dispatch(true)}>open</button>;
}
```

### support parent refresh

```jsx
function Child() {
  const [count, setCount] = useState(0);
  const [dispatch] = useModal(Demo, { count }, [count]);

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

### reuse component

第一种

```js
// 添加的地方
const [add] = useModal(AddOrUpdateUser, {
  modalProps: { width: 800 },
});

// 编辑的地方
const [update] = useModal(AddOrUpdateUser, {
  modalProps: { width: 800 },
});
```

第二种

上一种，会有 2 个组件实例被注册，不太适用于在 table 中的 action 进行声明，所以可以采用这一种
采用先行注册，后续使用的手法

注册

```
useModal.useRegister('Change Dept',ChangeDept)
useModal.useRegister('Edit Member',UpdateMember)
useModal.useRegister('Delete Member',DeleteMember)
useModal.useRegister('Suspend Account',SuspendAccount)
```

使用

```
const [changeDispatch] = useModal('Change Dept', {
  modalProps: { width: 800 },
});

const [changeDispatch] = useModal('Edit Member', {
  modalProps: { width: 800 },
});

const [changeDispatch] = useModal('Suspend Account', {
  modalProps: { width: 800 },
});

```

### 组件关闭

自定义关闭弹窗，useModal 会怎么做呢？

只需要需要关闭的 case 下面调用 下面三个方法之一 即可！

```
Success: onResolve
Fail: onReject
Any: onClose
```

```
export const UpdateMember(){
  const { onReject, onResolve, onClose } = useInjectProps()

}

```

# Performance

省去传统维护变量的刷新

# Enhance

## InjectModalProps

大多数场景中，都会去复用 弹窗 组件的 footer，但往往想要把逻辑内聚到组件本身，这就涉及到属性注入我们声明弹窗属性是在外面 useModal( xxx, { modalProps:{ ... } }) , 那 useModal 如何做的呢？

```tsx
import { useInjectProps } from "@waou/use-modal";

function ModalContent() {
  const { injectModalProps } = useInjectProps();

  useEffect(() => {
    injectModalProps({
      async onOk() {
        await ajax();
      },
    });
  }, []);

  return <div>i am modal content</div>;
}
```

## More

```
function onClick(){
  await dispatch()
}

```

许多其他特性等着你去探索～
