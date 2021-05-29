import { createState } from '../src/index'

type Counter = {
  counter: number
}

const initialState: Counter = { counter: 0 }

afterEach(() => {
  initialState.counter = 0
})

describe('counter', () => {
  test('state.getState() should return initial state', () => {
    const state = createState(initialState)
    expect(state.getState()).toEqual(initialState)
  })

  test('update createdState manually should not update state', () => {
    const state = createState(initialState)
    initialState.counter = 1
    expect(state.getState()).toEqual({ counter: 0 })
  })

  test('state.setState() should update state', () => {
    const state = createState(initialState)
    state.setState({ counter: 1 })
    expect(state.getState()).toEqual({ counter: 1 })
  })

  test('listener should be triggered on state update', () => {
    let lastCounter = 0
    const state = createState<Counter>(initialState)
    const subscriber = (state: Counter) => (lastCounter = state.counter)

    state.subscribe(subscriber)
    expect(lastCounter).toBe(0)

    state.setState({ counter: 1 })
    expect(lastCounter).toBe(1)
  })

  test('unsubscribe should stop listen trigger on state', () => {
    let lastCounter = 0
    const state = createState<Counter>(initialState)
    const subscriber = (state: Counter) => {
      lastCounter = state.counter
    }

    const listenerId = state.subscribe(subscriber)
    expect(lastCounter).toBe(0)

    state.setState({ counter: 1 })
    expect(lastCounter).toBe(1)

    const unsubscribed = state.unsubscribe(listenerId)
    state.setState({ counter: 2 })
    expect(lastCounter).toBe(1)
    expect(unsubscribed).toBeTruthy()
  })

  test('unsubscribe with random id should return false', () => {
    const state = createState<Counter>(initialState)
    const unsubscribed = state.unsubscribe('test')
    expect(unsubscribed).toBeFalsy()
  })
})
