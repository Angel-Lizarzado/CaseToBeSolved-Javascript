const barraBusqueda = document.getElementById('barra-busqueda');
const resultadosBusqueda = document.getElementById('resultados-busqueda');
const resultadosBusquedaCompleta = document.getElementById('resultados-busqueda-completa');

// Carga todos los productos al cargar la página
window.addEventListener('load', () => {
    mostrarResultadosDestacados('');
    mostrarTodosResultados('');
});

barraBusqueda.addEventListener('input', (event) => {
    const terminoBusqueda = event.target.value.toLowerCase();
    mostrarTodosResultados(terminoBusqueda);
});

function mostrarResultadosDestacados(terminoBusqueda) {
    fetch('https://dummyjson.com/products?limit=9&sortBy=rating&order=desc') // reemplaza esta URL con la de tu API
        .then(response => response.json())
        .then(data => {
            resultadosBusqueda.innerHTML = ''; // limpia los resultados anteriores
            const rowContainer = document.createElement('div');
            rowContainer.className = 'row'; // Agrega la clase para la fila
            data.products.forEach(producto => {
                if (producto.title.toLowerCase().includes(terminoBusqueda)) {
                    const divProducto = document.createElement('div');
                    divProducto.className = 'col-lg-4 col-md-6 mb-4 produto'; // Agrega las clases CSS necesarias
                    divProducto.innerHTML = `
                        <div class="card h-100 marginn"> 
                            <img class="card-img-top" src="${producto.thumbnail}" alt="${producto.title}">
                            <div class="card-body">
                                <h4 class="card-title">${producto.title}</h4>
                                <h5>$${producto.price}</h5>
                                <h6>Rating: ${producto.rating}</h5>
                                <p class="card-text">${producto.description}</p>
                                <!-- Agrega más detalles según tus necesidades -->
                            </div>
                        </div>
                    `;
                    rowContainer.appendChild(divProducto); // Agrega la tarjeta a la fila
                }
            });
            resultadosBusqueda.appendChild(rowContainer); // Agrega la fila al contenedor de resultados
        });
}

function mostrarTodosResultados(terminoBusqueda) {
    fetch('https://dummyjson.com/products') // reemplaza esta URL con la de tu API
        .then(response => response.json())
        .then(data => {
            resultadosBusquedaCompleta.innerHTML = ''; // limpia los resultados anteriores
            const rowContainer = document.createElement('div');
            rowContainer.className = 'row'; // Agrega la clase para la fila
            data.products.forEach(producto => {
                if (producto.title.toLowerCase().includes(terminoBusqueda)) {
                    const divProducto = document.createElement('div');
                    divProducto.className = 'col-lg-4 col-md-6 mb-4 produto'; // Agrega las clases CSS necesarias
                    divProducto.innerHTML = `
                        <div class="card h-100 marginn"> 
                            <img class="card-img-top" src="${producto.thumbnail}" alt="${producto.title}">
                            <div class="card-body">
                                <h4 class="card-title">${producto.title}</h4>
                                
                                <h6>Rating: ${producto.rating}</h5>
                                <p class="card-text">${producto.description}</p>
                                <div class="card-footer">
                                <h5>$${producto.price}</h5>
                                    <a class="btn btn-primary">Comprar</a>
                                    </div>
                                <!-- Agrega más detalles según tus necesidades -->
                            </div>
                        </div>
                    `;
                    rowContainer.appendChild(divProducto); // Agrega la tarjeta a la fila
                }
            });
            resultadosBusquedaCompleta.appendChild(rowContainer); // Agrega la fila al contenedor de resultados
        });
}





