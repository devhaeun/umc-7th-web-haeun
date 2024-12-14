import TodoList from './components/TodoList'
import InputTodo from './components/InputTodo'
import styled from 'styled-components'

function App() {

  return (
    <Container>
      <h1>TODO</h1>
      <InputTodo />
      <TodoList />
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`