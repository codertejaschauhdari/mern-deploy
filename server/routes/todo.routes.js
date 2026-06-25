const express = require("express")
const router = express.Router()
const {getAllTodos,createTodos,getTodoWithId,editTodoWithId,deleteTodoWithId} = require("../controllers/todo.controllers")

router.get("/", getAllTodos)

router.post("/post",createTodos)

router
.route("/:id")
.get(getTodoWithId)
.put(editTodoWithId)
.delete(deleteTodoWithId)


module.exports = router;