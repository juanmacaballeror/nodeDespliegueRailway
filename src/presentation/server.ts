import express, { Router } from 'express'
import path from 'path'

interface Options {
    port: number;
    routes: Router
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string
    private readonly routes: Router

    constructor(
        options: Options
    ) {
        const { port = 3000, public_path = 'public', routes } = options
        this.port = port
        this.publicPath = public_path
        this.routes = routes
    }

    async start() {

        // MiddleWare (Funciones que se ejecutan antes de pasar en una ruta)
        // con este middleware, le estamos indicando que todas las peticiones van a ser con una comunicacion de json. 

        // Si se comenta este middlewre, los datos no llegan al servicio
        this.app.use(express.json())
        // Este middleware se usa para poder ejecutar al servicio rest con peticion de tipo x-www-form-urlencoded
        // Por ejemplo para peticiones de tipo GET. Este mismo formato puede ser usado en el body ya que es una cadena 
        // de caracteres donde las llaves están divididas por el símbolo &
        this.app.use(express.urlencoded({ extended: true }))

        // Public Folder
        this.app.use(express.static(this.publicPath))

        //ROUTES
        this.app.use(this.routes)

        //cualquier peticion 'get', que no está en "public" lo intercepta, es  como un comodín . Si ejecutas localhot:3000/ como si es interceptada en public porque es el inicio
        // de la aplicación si se ve la aplicación y no pasa por app.get
        //SPA
        this.app.get('*', (req, res) => {
            //console.log(req.url)
            //res.send(`La url "${req.url}" no se puede servir`)
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`)

            // res.send(envia información al cliente) 
            // res.sendFile(Envia una url para ser renderizada en el cliente, es como si hiciera "his.app.use(express.static('public'))" o algo así, ejecuta el archivo public/index)

            res.sendFile(indexPath)
        })


        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`)
        })
    }

}