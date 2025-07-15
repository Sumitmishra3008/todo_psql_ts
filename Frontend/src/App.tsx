import { useState, useEffect } from "react";
import Todo from "./component/Todo";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

function App() {
  const [active, setActive] = useState(false);
  const [todos, setTodos] = useState([]);
  const [active2, setActive2] = useState(false);

  useEffect(() => {
    async function fetchtodos() {
      try {
        const response = await axios.get("http://localhost:3000/todo");
        setTodos(response.data.todos);
      } catch (error: any) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchtodos();
  }, [active2]);

  async function handleUpdate({ todo }: { todo: Todo }) {
    await axios
      .put(`http://localhost:3000/updatetodo/?id=${todo.id}`, {
        completed: todo.completed,
      })
      .then(() => {
        setActive2(!active2);
      });
  }

  async function handleDelete({ todo }: { todo: Todo }) {
    await axios
      .put(`http://localhost:3000/deletetodo/?id=${todo.id}`)
      .then(() => {
        setActive2(!active2);
      });
  }

  return (
    <div>
      <div className="bg-amber-50 w-full p-4 mt-[50px]  justify-right flex flex-row justify-between">
        <div className="bg-white flex flex-row gap-3">
          <div
            className={`cursor-pointer border rounded-lg w-[100px] text-center pt-[7px] ${
              active ? "bg-red-500 text-black" : "bg-white text-black"
            }`}
            onClick={() => (!active ? setActive(!active) : null)}
          >
            PENDING
          </div>
          <div
            className={`cursor-pointer border rounded-lg w-[100px] text-center pt-[7px] ${
              !active ? "bg-green-500 text-black" : "bg-white text-black"
            }`}
            onClick={() => (active ? setActive(!active) : null)}
          >
            COMPLETED
          </div>
        </div>
        <div className="cursor-pointer bg-yellow-300 w-[200px] h-[40px] text-center pt-[7px] mr-[10px] text-lg border rounded-lg">
          ADD TODO
        </div>
        {/* onClick call to open a modal or form to add a new todo */}
      </div>
      <div className="flex flex-row flex-wrap justify-center mt-[20px]">
        {todos
          .filter((todo: Todo) => (todo.completed ? !active : active))
          .map((todo: Todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onToggle={() => handleUpdate({ todo })}
              onDelete={() => handleDelete({ todo })}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
