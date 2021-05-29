const counterElement = document.getElementById('counter')
const decrementBtn = document.getElementById('decrement')
const incrementBtn = document.getElementById('increment')

const { createState } = simte
const state = createState({ counter: Number(counterElement.textContent) })

const render = state => {
  counterElement.textContent = state.counter
}

const decrement = () => state.setState({ counter: state.getState().counter - 1 })
const increment = () => state.setState({ counter: state.getState().counter + 1 })
decrementBtn.addEventListener('click', decrement)
incrementBtn.addEventListener('click', increment)

state.subscribe(render)
