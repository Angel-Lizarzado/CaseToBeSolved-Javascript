
# Case to solved
# Introduccion de javascript

## Contenido de la web

**index.html:** Muestra 9 productos mas destacados (ordenados por rating) 

**productos.html:** Muestra todos los productos, y una barra de busqueda donde filtra por nombre del mismo

**Estilos:** He utlizado boostrap para agilizar el diseño del catalogo
### He utilizado bing chat, para resolver dudas y problemas de consola al hacer el fetch



### Api
**He utizado**: https://dummyjson.com/products

para ordenar por rating he revisado la documentacion para saber como filtrarlos y termine utilizando
```javascript
fetch('https://dummyjson.com/products?limit=9&sortBy=rating&order=desc')
```
y para mostrar todos los productos si se usa sin paramemetros
```javascript
fetch('https://dummyjson.com/products')
```
