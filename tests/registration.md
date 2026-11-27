# Pruebas de la funcionalidad: registro de estudiantes

## Objetivo
Comprobar que el formulario registra estudiantes y protege la integridad de los datos.

## Casos de prueba
1. Registrar un estudiante con nombre, matrícula, correo y carrera válidos.
2. Intentar guardar con un campo vacío; debe mostrarse el mensaje de campos obligatorios.
3. Registrar una matrícula ya existente; debe impedir el duplicado.
4. Registrar un correo ya existente con diferencias de mayúsculas; debe impedir el duplicado.
5. Confirmar que el correo se almacena normalizado en minúsculas.
6. Recargar la página y comprobar que el registro permanece en localStorage.

## Resultado esperado
Solo se guardan estudiantes completos con matrícula y correo únicos.