import TodoContainer from "./components/TodoContainer";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <TodoContainer />
    </TodoProvider>
  )
}

export default App
