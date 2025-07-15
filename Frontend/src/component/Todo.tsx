interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Todo({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: () => any;
  onDelete: () => any;
}) {
  return (
    <div className="flex flex-col justify-between border h-[200px] w-[300px] rounded-lg ml-[10px] mt-[20px] p-4">
      <div className="font-bold underline text-2xl">{todo.title}</div>
      <div className="mt-[20px]">{todo.description}</div>
      <div className="flex flex-row justify-between mt-4 top-2 margin-top:auto">
        <div
          className={`cursor-pointer border rounded-lg pl-2 pr-2 ${
            todo.completed ? "text-red-500" : "text-green-500"
          }  `}
          onClick={onToggle}
        >
          {!todo.completed ? "markCompleted" : "markPending"}
        </div>
        <div className="cursor-pointer text-red-500" onClick={onDelete}>
          DELETE
        </div>
      </div>
    </div>
  );
}
