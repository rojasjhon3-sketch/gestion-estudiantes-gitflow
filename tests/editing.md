# Pruebas de la funcionalidad: edición de estudiantes

## Objetivo
Comprobar que se pueden modificar registros existentes sin crear duplicados.

## Casos de prueba
1. Seleccionar un estudiante y comprobar que sus datos aparecen en el formulario.
2. Modificar la carrera y guardar; debe actualizarse el mismo registro.
3. Modificar el correo por uno ya utilizado; debe impedir el cambio duplicado.
4. Cancelar la edición y comprobar que el formulario vuelve al modo de registro.
5. Simular un registro eliminado mientras el formulario está en edición; no debe crearse uno nuevo.
6. Verificar que el mensaje de registro no disponible permanece visible.

## Resultado esperado
La edición actualiza exclusivamente al estudiante seleccionado y conserva las validaciones.