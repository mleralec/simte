import type { CreateState, Listener } from './types'
import { generateId } from './utils'

export const createState = <State>(state: State): CreateState<State> => {
  const listeners: { [key: string]: Listener<State> } = {}
  let currentState = Object.assign({}, state)

  const getState = () => currentState

  const setState = (newState: State) => {
    currentState = newState

    if (Object.keys(listeners).length > 0) {
      Object.values(listeners).forEach(listener => listener(currentState))
    }
  }

  const subscribe = (callback: Listener<State>): string => {
    const id = generateId()
    listeners[id] = callback
    return id
  }

  const unsubscribe = (id: string) => {
    if (listeners[id]) {
      return delete listeners[id]
    }
    return false
  }

  return { getState, setState, subscribe, unsubscribe }
}
