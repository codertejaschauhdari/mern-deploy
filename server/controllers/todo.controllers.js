const { text } = require("express");
const todo = require("../models/todo.models")


async function getAllTodos(req, res) {
    try {
          const todos = await todo.find({})
         return res.send(todos)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
  
}

async function createTodos(req, res) {
    const body = req.body;
    console.log("body:", body)
    if(!body || !body.text || body.completed === null || body.completed === undefined ){
         return res.status(400).json({msg:"All fileds are required "})
    }
   const result = await todo.create({
    text :body.text,
    completed: body.completed
   })
   return res.status(201).json({msg : "success" , todo : result})
}

async function getTodoWithId(req, res) {
   const id = (req.params.id)
    const todowithid = await todo.findById(id)
    if(!todowithid) return res.status(404).json({message :"not found"})
   return res.status(201).json({msg : "success" , todo : todowithid})
}

async function editTodoWithId(req,res){
    // edit perticular user
    const body = req.body;
    const id = (req.params.id)
    await todo.findByIdAndUpdate(id,{...body})
    return res.json({status: "successfully updated"
        }
    );
}

async function deleteTodoWithId(req,res){
    //delete user
    const id = (req.params.id)
    try {
     await todo.findByIdAndDelete(id)
     return res.json({status: "successfully deleted"})
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }

}


module.exports = {
    getAllTodos,
    createTodos,
    getTodoWithId,
    editTodoWithId,
    deleteTodoWithId
}