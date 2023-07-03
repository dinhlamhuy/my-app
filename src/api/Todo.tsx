import axios from "axios";
import { useState, useEffect } from "react";
interface todoType {
  title: string;
  userId: number;
  id: number;
  completed: () => void;
}
function Todo() {
  const [todos, todoList] = useState<todoType[]>([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response: any) => {
        console.log(response.data[0].completed);
         todoList(response.data);
      })
      .catch((error: any) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      {todos.map((todo,i) => (
        <>
          <p key={ i} >userId: {todo["userId"]}</p>
          <p>id: {todo["id"]}</p>
          <p>title: {todo["title"]}</p>
          <p>completed: {todo['completed'] ? 'true' : 'false'}</p>
        </>
      ))}
    </div>
  )
}
export default Todo;
