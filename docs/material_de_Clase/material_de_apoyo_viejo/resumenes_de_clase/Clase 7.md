# Clase 7 - 12/06/2026

## CRUD Completo y Paginación

En esta clase implementamos el CRUD completo y la paginación del proyecto.

### Vista customer_record
Creamos la vista para ver un registro individual de cliente usando su clave primaria (pk):
```python
def customer_record(request, pk):
    if request.user.is_authenticated:
        customer_record = Record.objects.get(id=pk)
        return render(request, 'record.html', {'customer_record': customer_record})
    else:
        messages.error(request, "Debes iniciar sesión para ver el registro")
        return redirect('home')
```

### Template record.html
Creación de la plantilla para mostrar detalles del cliente en una tarjeta (card) con campos: Email, Phone, Address, City, State, Zipcode, Create At, ID.

### Vistas delete_record y update_record
- **delete_record**: Obtiene el registro por pk, lo elimina y redirige al home.
- **update_record**: Obtiene el registro actual, crea un formulario con `instance=current_record`, valida y guarda.

### Paginación
Implementamos paginación con el paginador de Django:
1. Ordenar registros con `Record.objects.all().order_by("id")`
2. Crear paginador: `Paginator(records_queryset, 5)` (5 registros por página)
3. Leer parámetro `?page=` de la URL
4. Obtener página segura con `paginator.get_page(page_number)`

En el template se implementaron botones de navegación: primera página, anterior, páginas numeradas (mostrando 2 antes y 2 después de la actual), siguiente y última página, con estilos Bootstrap.

### Datos de Prueba
Se insertaron registros de prueba en la base de datos con clientes como Luis Ramirez, Camila Vargas, Javier Rojas, Lucía Herrera, entre otros.
