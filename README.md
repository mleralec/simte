<div align="center">
  <h1><a href="https://www.npmjs.com/package/simte">Simte</a></h1>
  <p>A simple state management for JS applications without dependencies.</p>
  <p>< 500 Bytes 🏋️ and Typescript friendly.</p>
</div>

## 👀 Examples

- [Vanilla counter app](examples/vanilla-counter/index.html)

## 🔧 Installation

### With CDN

```html
<script src="https://unpkg.com/simte@0.0.1/dist/index.iife.js"></script>
```

```js
const { createState } = simte
```

### With NPM

```sh
yarn add simte
# OR
npm i simte
```

```ts
import { createState } from 'simte'
```

## 💻 Usage

```ts
// initialize the state
const state = createState({ counter: 0 })

// subscribe to updates
state.subscribe(state => console.log(`The state has changed: ${state}`))

// update the state
state.setState({ counter: 1 }) // will log `The state has changed: { counter: 1 }`
```

## 📕 API

### `createState(state)`

Initialize the given state and return 4 methods:

- getState
- setState
- subscribe
- unsubscribe

### `.getState()`

Return the current state

### `.setState(newState)`

Update the current state with given parameter. This update will trigger listeners.

### `.subscribe(listener)`

Setup a listener with given parameter. The listener should be a function who receive the new state. The subscribe method will return an id (used for unsubscribe).

### `.unsubscribe(id)`

Unsubscribe a listener with his identifier.

## Typescript

You can use your `Type` with Typescript. The return of the getState function, the parameter of the setState function, and the parameter of each listener will use this type.

```ts
type MyState = {
  counter: number
}

const state = createState<MyState>({ counter: 0 })

state.getState() // { counter: 0 } as MyState

state.setState({ counter: 1, newProperty: 'hello' }) // will throw "Argument of type '{ counter: number; newProperty: string; }' is not assignable to parameter of type 'MyState'."
```
