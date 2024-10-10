APP con BBDD prostgres con PRISMA

1.- npm i && npm run dev
2.- Ejecutar `docker composer up -d` , para ejecutar la bbdd en docker
3.- Instalar prisma, npm install prisma --save-dev
4.- Inicializamos bbbdd con prisma con el comando, npx prisma init --datasource-provider postgresql
5.- En este punto, nos ha creado uen nuestro proyecto, una carpeta llamada prisma con un schema de ejemplo. Ademas en el fichero ".env" nos genera una url de ejemplo para acceder a postgre(POSTGRES_URL). La eliminamos porque no la usaremos y nos quedamos con la nuestra creada en nuestro entorno local.
6.- Si tuviera geenrado my BBDD en prima, deberia ejecutar `npx prima db pull` y me descargaria de prisma el schemma de la bbdd definida. En mi caso como parto de inicio, la creo de la sifuiente manera:

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

//me creo el modelo de mi bbdd
model todo {
  id          Int       @id @default(autoincrement())
  text        String    @db.VarChar
  completedAt DateTime? @db.Timestamp()
}

```

7.- Realizo la migracion de mi definicion de modelo a prisma con el comando `npx prisma migrate dev --name init `. Con esto ya hemos creado el modelo en prisma. Si a futuro cambiara el modelo habria que volver a ejecutar `npx prisma migrate dev --name init ` para coger los cambios.

Si vamos a la carpeta prisma/migrations/, nos habra creado una carpeta con la fecha de la migración y tendremos un archivo llamdo migration.sql, con la query de creado de nuestro modelo, en nuestro caso sería:

```

CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);



```
