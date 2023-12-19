const nameFilterEl = document.getElementById("name-filter");
const statusFilterEl = document.getElementById("status-filter");
const pagina2El = document.getElementById("pagina-2");
const boton1 = document.getElementById("botonHtml");
const boton2 = document.getElementById("botonHtml2");


const apiRicky = async (pagina) => {

    let url = "https://rickandmortyapi.com/api/character/?page=1"
    if (pagina == "0") {
      url = "https://rickandmortyapi.com/api/character/?page=1";
  
    }
  
    else if (isNaN(nameFilterEl.value)) {
      url += `/&name=${nameFilterEl.value}`;
      if (statusFilterEl.value) {
        url += `&status=${statusFilterEl.value}`;
  
      
      }
    }

    else if (statusFilterEl.value) {
      url += `/?status=${statusFilterEl.value}`;
  
    }
  
      else if (statusFilterEl.value && isNaN(nameFilterEl.value)) {
        url  += `/&name=${nameFilterEl.value}&status=${statusFilterEl.value}`;   
      }
  
  
  
    else {
      url = "https://rickandmortyapi.com/api/character/?page=" + pagina;
    }

    fetch(url)
    .then(response => {
      // Verifica si la respuesta es exitosa (código de estado 200)
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json(); // traduce la respuesta como JSON
    })
    .then(data => {
      // Procesa los datos de la respuesta
      divRes = document.querySelector("#resultado")
      divRes.innerHTML = "";
       //inner es como un método para meter cosas en el HTML
      data.results.map(item => {
        //data es lo que tiene toda la info de la api y con el punto entramos en los resultados de data
      divItem = document.createElement("div")
      //Aqui decimos que la variable divItem es igual a crear un div dentro del div #resultado y 
      // con innerhtml le creamos todo el codigo en ese div.
      divItem.innerHTML =`
        
          <div class="card" style="width: 18rem;">
              <img src="${item.image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.status} ${item.species}</p>
                  <p class="card-text">${item.gender}</p>  
              </div>
          </div>              
  
          
        `
        // aqui insertamos el divItem en el divRes que es el div id #resultado
      divRes.appendChild(divItem);
      })
    })
    .catch(error => {
      // Maneja los errores en la llamada a la API
      console.error('Error al llamar a la API:', error.message);
    });

     

  }
  apiRicky(0)
  // Variables para almacenar el estado
let currentPage = "0";

// Función para manejar el cambio de página
const handlePageChange = (e) => {
  const selectedPage = e.target.value;
  currentPage = selectedPage;
};

// Función para decrementar la página
const decrementPage = () => {
  const newPage = parseInt(currentPage, 10) - 1;
  if (newPage >= 1) {
    currentPage = newPage.toString();
  }
};


nameFilterEl.addEventListener("input", (nameFilterEl) => {
  apiRicky(nameFilterEl.value);

})

statusFilterEl.addEventListener('change', (statusFilterEl) => {
  apiRicky(statusFilterEl.value);
});

boton1.addEventListener('click', () => {
  currentPage = parseInt(currentPage, 10) - 1;
  apiRicky(currentPage);
});

boton2.addEventListener('click', () => {
  currentPage = parseInt(currentPage, 10) + 1;
  apiRicky(currentPage);
});