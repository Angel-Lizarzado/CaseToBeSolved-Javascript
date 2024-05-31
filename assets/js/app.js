const barraBusqueda = document.getElementById('barra-busqueda');
const resultadosBusqueda = document.getElementById('resultados-busqueda');
const resultadosBusquedaCompleta = document.getElementById('resultados-busqueda-completa');

// Carga todos los productos al cargar la página
window.addEventListener('load', () => {
    mostrarResultadosDestacados('');
    mostrarTodosResultados('');
    getOpiniones();
});

barraBusqueda.addEventListener('input', (event) => {
    const terminoBusqueda = event.target.value.toLowerCase();
    mostrarTodosResultados(terminoBusqueda);
});

function mostrarResultadosDestacados(terminoBusqueda) {
    fetch('https://dummyjson.com/products?limit=9&sortBy=rating&order=desc')
        .then(response => response.json())
        .then(data => {
            resultadosBusqueda.innerHTML = ''; // limpia los resultados anteriores
            const rowContainer = document.createElement('div');
            rowContainer.className = 'row';
            data.products.forEach(producto => {
                if (producto.title.toLowerCase().includes(terminoBusqueda)) {
                    const divProducto = document.createElement('div');
                    divProducto.className = 'col-lg-4 col-md-6 mb-4 produto';
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
                    rowContainer.appendChild(divProducto);
                }
            });
            resultadosBusqueda.appendChild(rowContainer);
        });
}

function mostrarTodosResultados(terminoBusqueda) {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            resultadosBusquedaCompleta.innerHTML = '';
            const rowContainer = document.createElement('div');
            rowContainer.className = 'row';
            data.products.forEach(producto => {
                if (producto.title.toLowerCase().includes(terminoBusqueda)) {
                    const divProducto = document.createElement('div');
                    divProducto.className = 'col-lg-4 col-md-6 mb-4 produto';
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
                    rowContainer.appendChild(divProducto);
                }
            });
            resultadosBusquedaCompleta.appendChild(rowContainer);
        });
}




function getOpiniones() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/comments';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const opinionesLimitadas = data.slice(0, 9); // Limita el número de comentarios a 10
            renderOpiniones(opinionesLimitadas);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // You could also display an error message to the user here
        });
}
function renderOpiniones(data) {
    const opinionesContainer = document.getElementById('opiniones-clientes');
    if (opinionesContainer) { // Check if the element exists
        let rowHtml = '';
        data.forEach((opinion, index) => {
            const cardHtml = `
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${opinion.name}</h5>
                            <p class="card-text">${opinion.body}</p>
                        </div>
                    </div>
                </div>
            `;
            if (index % 3 === 0) { // Crea un nuevo row cada 3 elementos
                rowHtml += `<div class="row">${cardHtml}`;
            } else if (index === data.length - 1) { // Cierra el row en el último elemento
                rowHtml += cardHtml + `</div>`;
            } else {
                rowHtml += cardHtml;
            }
        });
        opinionesContainer.innerHTML = rowHtml;
    } else {
        console.error('Element #opiniones-clientes not found');
    }
}