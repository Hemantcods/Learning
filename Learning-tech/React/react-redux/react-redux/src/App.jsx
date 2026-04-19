import { useState } from 'react'

import './App.css'
import AddTodo from './Componets/AddTodo'
import Todo from './Componets/Todo'
import { Provider } from 'react-redux'
import {store} from './app/store'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
    <h1>redux toolkit</h1>
    <AddTodo />
    <Todo />
    </Provider>
      
  )
}

export default App
