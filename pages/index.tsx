import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
    const [todos, setTodos] = useState([])

    useEffect(() => {
      const fetchTodos = async () => {
        const res = await axios("http://localhost:3000/api/getAllTodos");
        setTodos(res.data);
      };
      fetchTodos();
    }, []);
    
    const handleSubmit = (e:any) => {
        e.preventDefault()
        if (!input) return
        // @ts-ignore
        axios
      .post("http://localhost:3000/api/createTodo", {
        note: input
       ,
      })
      .then((res) => {
        if (res.status === 200) {
          // @ts-ignore
          setTodos((prev) => [...prev, res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
        setInput("")
    }
    const handleChange = (e:any) => {
        setInput(e.target.value)
    }
    const handleDelete = (id: string) => {
      axios.post("http://localhost:3000/api/deleteTodo", { id }).then((res) => {
        if (res.status === 200) {
          // @ts-ignore
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        }
      });
    };
    
  return (
    <div className='w-screen h-screen bg-gray-900 text-gray-200 flex justify-center items-center'>
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 text-gray-900 rounded min-w-[400px] flex flex-col'>
            <div className='text-2xl font-black text-center'>
                Todo App
            </div>
            <p className="p-2"></p>
            <form onSubmit={handleSubmit} className='flex'>
                <input value={input} onChange={handleChange} className='appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" />
                <p className="p-2"></p>
                <button className='text-white bg-pink-500 hover:bg-rose-600 px-2 py-1 rounded' type="submit">Enter</button>
            </form>
            <div className='flex flex-col'>
                {todos.map((todo, idx) => (
                    <div className='text-xl flex justify-between items-center w-full bg-gray-100 hover:bg-gray-200 px-2 py-1 mt-2 rounded' key={idx}>
                      {/* @ts-ignore */}
                      {todo.note}
                    {/* @ts-ignore */}
                        <button onClick={() => handleDelete(todo.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                ))}
                
            </div>
        </div>
    </div>
  )
}
