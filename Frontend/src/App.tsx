import { useState } from "react";
function App() {
  const [active, setActive] = useState(false);

  return (
    <div className="bg-amber-50 w-full p-4 mt-[50px]  justify-right flex flex-row justify-between">
      <div className="bg-white flex flex-row gap-3">
        <div
          className={`cursor-pointer border rounded-lg w-[100px] text-center pt-[7px] ${
            active ? "bg-red-500 text-black" : "bg-white text-black"
          }`}
          onClick={() => setActive(!active)}
        >
          PENDING
        </div>
        <div
          className={`cursor-pointer border rounded-lg w-[100px] text-center pt-[7px] ${
            !active ? "bg-green-500 text-black" : "bg-white text-black"
          }`}
          onClick={() => setActive(!active)}
        >
          COMPLETED
        </div>
      </div>
      <div className="cursor-pointer bg-yellow-300 w-[200px] h-[40px] text-center pt-[7px] mr-[10px] text-lg border rounded-lg">
        ADD TODO
      </div>
    </div>
  );
}

export default App;
