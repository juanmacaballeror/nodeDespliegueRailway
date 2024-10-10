import { Request, Response } from 'express'
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';



export class TodosController {

    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany()
        return res.json(todos)
    }

    public getTodoById = async (req: Request, res: Response) => {
        //El '+' hace la conversion de string a integer
        const id = +req.params.id
        //lo comento porque me da error el lintenado con typescript
        if (isNaN(id)) return res.status(400).json({ error: `${req.params.id} no es un numero` })

        const todo = await prisma.todo.findFirst({
            where: { id }
        })

        if (todo) {
            res.json(todo)
        } else {
            //lo comento porque me da error el lintenado con typescript
            res.status(404).json(`TODO with id ${id} not found`)
        }

    }

    public createTodo = async (req: Request, res: Response) => {
        //DTO
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });
        console.log({ createTodoDto })

        //inserto fila con el text que me lleva en la peticion
        //El signo ! en TypeScript se llama "non-null assertion operator". Se utiliza para indicar que una expresión no será null ni undefined en ese punto del código.
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo)
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        })
        if (error) res.status(400).json({ error })
        //Antes de actualizar, compruebo que exista en la bbdd
        const todo = await prisma.todo.findFirst({
            where: { id }
        })
        if (!todo) return res.status(404).json({ error: `el id ${id} no existe` });
        const updatedTodoUpdate = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        })
        res.json(updatedTodoUpdate);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = await prisma.todo.findFirst({
            where: { id }
        })
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

        const deleted = await prisma.todo.delete({
            where: { id }
        })

        if (deleted) {
            res.json({ todo, deleted })
        } else {
            res.status(400).json()
        }

    }
}