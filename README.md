
# Case to solved
# Introduccion de javascript

## Contenido de la web

**index.html:** Muestra 9 productos mas destacados (ordenados por rating) 
                Tambien contiene comentario de los clientes 

**productos.html:** Muestra todos los productos, y una barra de busqueda donde filtra por nombre del mismo

**Estilos:** He utlizado boostrap para agilizar el diseño del catalogo
### He utilizado bing chat, para resolver dudas y problemas de consola al hacer el fetch



### Api
**He utilizado la api:** [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/comments)

para imprimir la opinion de los clientes de la tienda, he utilizado slice para filtrar solo 9 comentarios

**He utilizado la api:** [unsplash.com](https://source.unsplash.com/random/400x300)

para generar la imagen de cada comentario e imprimirlo en su respectiva card

**He utizado**: [https://dummyjson.com](https://dummyjson.com/products)

para ordenar por rating he revisado la documentacion para saber como filtrarlos y termine utilizando
```javascript
fetch('https://dummyjson.com/products?limit=9&sortBy=rating&order=desc')
```
y para mostrar todos los productos si se usa sin paramemetros
```javascript
fetch('https://dummyjson.com/products')
```
