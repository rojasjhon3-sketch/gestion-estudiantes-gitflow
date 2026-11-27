# Pruebas de la funcionalidad: eliminación de estudiantes

## Objetivo
Comprobar la eliminación segura de registros.

## Casos de prueba
1. Pulsar Eliminar y cancelar la confirmación; el registro debe permanecer.
2. Confirmar la eliminación; el registro debe desaparecer del listado.
3. Recargar la página y comprobar que el registro eliminado no reaparece.
4. Eliminar el estudiante que está seleccionado en el formulario de edición; el formulario debe reiniciarse.
5. Simular un error de almacenamiento; la aplicación debe recuperar el estado anterior y mostrar un mensaje.

## Resultado esperado
La eliminación requiere confirmación y mantiene la interfaz y localStorage sincronizados.