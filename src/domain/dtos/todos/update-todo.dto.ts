
export class UpdateTodoDto {

    //private para que solo se puede instanciar desde la clase
    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ) { }

    get values() {

        // El id no se actualiza porque nunca se tiene que actualziar al ser una primary key en las tablas
        const returnObj: { [key: string]: any } = {}

        if (this.text) returnObj.text = this.text
        if (this.completedAt) returnObj.completedAt = this.completedAt

        return returnObj
    }

    //[key: string]: any }, esto es key(atributo), valor
    //retornamos [string?, CreateTodoDto?], el string es por si algo va mal, mensaje de error y CreateTodoDto la salida de nuestro dto.Ambos opcionales
    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { text, completedAt, id } = props;
        let newCompletedAt = completedAt

        if (!id || isNaN(Number(id))) {
            return ['El id tiene que ser un numero']
        }

        if (completedAt) {
            newCompletedAt = new Date(completedAt)
            if (newCompletedAt.toString() === 'Invalid Date') {
                return ['Fecha incorrecta a actualizar']
            }
        }
        //si todo es correcto, al mensaje error devuelve undefined y en el segundo parametro devuelve el dto.
        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)]
    }

}