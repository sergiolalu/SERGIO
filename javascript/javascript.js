const apiRicky = async (pagina) => {

    let url = "https://rickandmortyapi.com/api/character/?"
    if (pagina !== "0") {
      url += `page=${pagina}`;
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