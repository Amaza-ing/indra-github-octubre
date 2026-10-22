# Mi página web

Página web sencilla e interactiva creada con HTML, CSS y JavaScript nativos. Presenta un saludo, permite cambiar el tema visual y muestra un reloj analógico con la hora local.

## Funcionalidades

- **Saludo interactivo:** al pulsar «Haz clic aquí», cambia el mensaje de bienvenida.
- **Tema claro y oscuro:** el botón alterna entre ambos temas y guarda la selección en el almacenamiento local del navegador para conservarla al volver a visitar la página.
- **Reloj analógico:** muestra la hora local y actualiza sus agujas cada segundo.
- **Diseño adaptable:** la tarjeta y el reloj ajustan su presentación a pantallas pequeñas.
- **Saludo con GitHub Actions:** un workflow muestra un saludo por consola en cada `push` y también se puede ejecutar manualmente.


## Tecnologías

- HTML5
- CSS3
- JavaScript (sin dependencias ni herramientas de compilación)

## Cómo ejecutar el proyecto

No es necesario instalar dependencias ni compilar el proyecto.

1. Clona o descarga este repositorio.
2. Abre `index.html` directamente en un navegador.

También puedes servir la carpeta con una extensión de servidor local, como **Live Server** en Visual Studio Code, y abrir la dirección local que esta indique.

## Estructura del proyecto

```text
mi-web/
├── index.html    # Estructura y contenido de la página
├── styles.css    # Estilos, temas y diseño adaptable
├── script.js     # Interacciones y funcionamiento del reloj
├── README.md     # Documentación del proyecto
└── .github/
    └── workflows/
        └── saludo.yml  # Saludo por consola con GitHub Actions
```

## Uso

- Pulsa **Haz clic aquí** para actualizar el mensaje.
- Pulsa **Activar tema oscuro** o **Activar tema claro** para cambiar la apariencia. La preferencia se guarda en el navegador.
- Consulta el reloj situado en la esquina inferior derecha para ver la hora local.
