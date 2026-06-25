import "./index.css"
import { useEffect, useState } from "react";
import axios from "axios";
//import dotenv from "dotenv"


function App() {
  const [todo, setTodo] = useState("");
  const [collection, setCollection] = useState([])

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    if (!todo.trim()) return  
    try {
      const newTodo = {text : todo, completed:false}
      const response = await axios.post(`/todo/post`,newTodo)
      console.log("response:",response)
      setCollection((prev)=> [...prev,response.data.todo])
    } catch (error) {
    console.log("error", error)
      
    }
    setTodo("")
  }

  const handleDelete = async(id)=>{
     try {
    await axios.delete(`/todo/${id}`);
    setCollection((prev) =>
      prev.filter((item) => item._id !== id)
    );
  } catch (error) {
    console.log(error);
  }
  }


  const handleComplete = async(id)=>{
   try {
    const response = await axios.put(`/todo/${id}`, {
      completed: true,
    });

    setCollection((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, completed: true }
          : item
      )
    );
  } catch (error) {
    console.log(error);
  }
  }

  const fetchTodos = async()=>{
    try {
      const result = await axios.get(`/todo`);
      const data = result.data;

      setCollection(data)
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(() => {
    fetchTodos();

  }, [])
  
  
  return (
  
    <div className="app">
      <h1>Task  manager</h1>
      <form className="form" onSubmit={onSubmitHandler}>
        <input
          className="input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          aria-required
          placeholder="add task here"
        />
        <button className="btn-addtask" type="submit">add task</button>

      </form>
      {
        collection?.map((item) => {
          return (
            <div className="itemList" key={item?._id ?item._id :item}>
              <span className={`item-text ${item.completed ? "completed" : ""}`}>{item.text}</span>
              <span className="btn-items">
              <button className="btn-compelted" onClick={()=>handleComplete(item?._id)}>completed</button>
              <button className="btn-delete" onClick={()=>handleDelete(item?._id)}>delete</button>
              </span>
            </div>
          )

        })
      }
    </div>
  );
}

export default App;