
export class CreateTodoDto {

    //private para que solo se puede instanciar desde la clase
    private constructor(
        public readonly text: string,
    ) { }

    //[key: string]: any }, esto es key(atributo), valor
    //retornamos [string?, CreateTodoDto?], el string es por si algo va mal, mensaje de error y CreateTodoDto la salida de nuestro dto.Ambos opcionales
    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
        const { text } = props;
        // Si el texto no viene le deveulve error
        if (!text) return ['TExt property is required', undefined]
        //si todo es correcto, al mensaje error devuelve undefined y en el segundo parametro devuelve el dto.
        return [undefined, new CreateTodoDto(text)]
    }

}