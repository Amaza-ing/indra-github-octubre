# Instrucciones para GitHub Copilot

## Contexto del proyecto

- Sitio web estático de una sola página, escrito en HTML, CSS y JavaScript nativos.
- No hay framework, gestor de paquetes, dependencias ni proceso de compilación.
- La página contiene un saludo interactivo, un selector de tema claro/oscuro persistido en `localStorage` y un reloj analógico con la hora local.
- La interfaz y la documentación están en español.

## Estructura y responsabilidades

- `index.html`: estructura semántica, contenido y enlaces a los recursos.
- `styles.css`: presentación, variables de tema y adaptación a pantallas pequeñas.
- `script.js`: interacciones del saludo, selector de tema y actualización del reloj.
- `README.md`: características, estructura y pasos para abrir el sitio.
- `.github/copilot-instructions.md`: pautas para cambios futuros.

## Pautas de implementación

- Mantén el proyecto sencillo y sin dependencias externas, salvo que un requisito lo justifique claramente.
- Respeta la separación existente entre estructura (HTML), presentación (CSS) y comportamiento (JavaScript).
- Usa JavaScript estándar del navegador; mantén el script compatible con su carga mediante `defer`.
- Conserva el idioma español en los textos visibles y en la documentación.
- Reutiliza las variables CSS y los patrones existentes para los temas claro y oscuro. Mantén sincronizados el tema mostrado, el estado `aria-pressed` y la preferencia guardada.
- Si modificas la interfaz, conserva el diseño adaptable y la accesibilidad: HTML semántico, controles nativos, nombres descriptivos y estados perceptibles con teclado.
- Evita introducir complejidad o abstracciones que no sean necesarias para esta página.

## Validación de cambios

- No hay comandos de compilación o pruebas configurados. Para validar cambios, abre `index.html` en un navegador y comprueba la interacción afectada.
- En cambios de estilo, revisa tanto el tema claro como el oscuro y una ventana estrecha.
- Actualiza `README.md` si cambian las funcionalidades, la estructura o la forma de ejecutar el proyecto.