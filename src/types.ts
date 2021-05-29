export type CreateState<State> = {
  getState: () => State
  setState: (newState: State) => void
  subscribe: (callback: Listener<State>) => string
  unsubscribe: (id: string) => boolean
}

export type Listener<State> = (state: State) => void
