import { Request, Response } from 'express'

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy butter', completedAt: new Date() },
];


export class TodosController {

    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        //El '+' hace la conversion de string a integer
        const id = +req.params.id
        //lo comento porque me da error el lintenado con typescript
        if (isNaN(id)) return res.status(400).json({ error: `${req.params.id} no es un numero` })
        const todo = todos.find(item => item.id === id)
        if (todo) {
            res.json(todo)
        } else {
            //lo comento porque me da error el lintenado con typescript
            res.status(404).json(`TODO with id ${id} not found`)
        }

    }

    public createTodo = (req: Request, res: Response) => {
        // console.log(JSON.stringify(req))
        const { text, completedAt } = req.body;
        if (!text) res.status(400).json({ error: 'no viene el texto' })
        todos.push({
            id: todos.length + 1,
            text,
            completedAt
        })

        res.json(todos)
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

        const { text, completedAt } = req.body;

        todo.text = text || todo.text;
        (completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);


        res.json(todo);

    }


    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);

    }
}