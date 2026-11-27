# Sistema de Gestión de Estudiantes

Aplicación CRUD académica desarrollada con HTML, CSS y JavaScript puro.

## Funcionalidades

- **Registrar:** crea estudiantes con nombre, matrícula, correo electrónico y carrera.
- **Consultar:** muestra los estudiantes registrados y el total de registros.
- **Editar:** permite modificar los datos de un estudiante existente.
- **Eliminar:** solicita confirmación antes de eliminar un registro.
- **Buscar:** filtra por nombre, matrícula, correo electrónico o carrera; la tecla Escape limpia la búsqueda.
- **Validar:** exige todos los campos, evita matrículas y correos duplicados (sin distinguir mayúsculas/minúsculas).
- **Ordenar:** presenta los resultados por nombre en orden alfabético español.
- **Persistir:** guarda los registros en `localStorage` del navegador.

## Cómo ejecutar

1. Clona o descarga este repositorio.
2. Abre `index.html` en un navegador moderno.
3. Registra estudiantes desde el formulario. Los datos se conservarán en el almacenamiento local de ese navegador.

No requiere servidor ni instalación de dependencias.

## Tecnologías

- HTML5
- CSS3
- JavaScript (ES6+)
- Web Storage API (`localStorage`)

## Pruebas manuales recomendadas

1. Registrar un estudiante con todos los campos completos.
2. Intentar registrar nuevamente la misma matrícula.
3. Intentar registrar el mismo correo usando mayúsculas diferentes.
4. Buscar por nombre, matrícula, correo y carrera; después limpiar con Escape.
5. Comprobar el orden alfabético de varios estudiantes.
6. Editar un registro y verificar que no se duplique.
7. Eliminar un registro y cancelar también una eliminación para comprobar la confirmación.
8. Recargar la página y verificar que los registros continúan disponibles.

## Limitaciones

Este proyecto es una aplicación académica de demostración. `localStorage` guarda los datos únicamente en el navegador y dispositivo utilizados; no proporciona una base de datos compartida, autenticación ni sincronización entre usuarios.
