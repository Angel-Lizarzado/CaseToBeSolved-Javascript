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
                  <h5>$${producto.price}</h5>
                  <h6>Rating: ${producto.rating}</h5>
                  <p class="card-text">${producto.description}</p>
                  <button class="btn btn-primary" data-id="${producto.id}">Comprar</button>
                </div>
              </div>
            `;
                    rowContainer.appendChild(divProducto);
                }
            });
            resultadosBusquedaCompleta.appendChild(rowContainer);

            // Agregar evento de clic a los botones "Comprar"
            const comprarButtons = document.querySelectorAll('.btn.btn-primary');
            comprarButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.dataset.id;
                    fetch(`https://dummyjson.com/products/${productId}`)
                        .then(response => response.json())
                        .then(productData => {
                            // Mostrar información adicional del producto en el modal
                            const modal = document.getElementById('product-modal');
                            modal.innerHTML = `
                  <h2>${productData.title}</h2>
                  <p>${productData.description}</p>
                  <p>Precio: $${productData.price}</p>
                  <p>Rating: ${productData.rating}</p>
                  <h3>Comentarios de clientes:</h3>
                  <ul id="comentarios-clientes"></ul>
                `;
                            // Obtener comentarios de clientes desde JSONPlaceholder
                            fetch('https://jsonplaceholder.typicode.com/posts')
                                .then(response => response.json())
                                .then(comments => {
                                    const comentariosContainer = document.getElementById('comentarios-clientes');
                                    comments.forEach(comment => {
                                        const comentarioHTML = `
                        <li>
                          <p>${comment.title}</p>
                          <p>${comment.body}</p>
                        </li>
                      `;
                                        comentariosContainer.innerHTML += comentarioHTML;
                                    });
                                });
                            // Mostrar el modal
                            modal.style.display = 'block';
                        });
                });
            });
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
        let opinionesHtml = '';
        data.forEach((opinion) => {
            const cardHtml = `
          <div class="opinion-card">
            <div class="opinion-image">
            </div>
            <div class="opinion-info">
              <h5 class="opinion-name">${opinion.name}</h5>
              <p class="opinion-rating">${opinion.email}</p>
              <p class="opinion-text">${opinion.body}</p>
              
            </div>
          </div>
        `;
            opinionesHtml += cardHtml;
        });
        opinionesContainer.innerHTML = opinionesHtml;
    } else {
        console.error('Element #opiniones-clientes not found');
    }
}
