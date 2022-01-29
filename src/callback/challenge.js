// debemos instalar esta dependencia en la terminal "npm install xmlhttprequest --save"
//hacer instancias para un llamado de una API - es el objeto que utilizamos para hacer llamados a las API
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';// esta es la API a la cual le vamos hacer la peticiones.

//Esta funcion le da vida a las llamadas de la API
function fetchData(url_api, callback) { 
    let xhttp = new XMLHttpRequest(); // generar la referencia al objeto que necesitamos
    // Hacer un llamado a una url (GET-->Es lo que queremos hacer, url_api --> la url de la API, true --> activa asincronismo)
    xhttp.open('GET', url_api, true);
    //Escucha lo que va ahcer esa conexion y activa una funcion que recibe un evento 
    xhttp.onreadystatechange = function (event) {
        //realizamos una validacion, si el estado es el adecuado
        if(xhttp.readyState === 4) {//debe de estar en cuatro para que la respuesta este lista
            if(xhttp.status === 200) { // debe de estar en 200 para que la respuesta este lista
                //Ejecuto el callback null hace referencia al erro que es el primer parametro que recibe pero el 
                //profe lo dejo en null, El Json es la respuesta que recibimos en texto pero lo convertimos en un JSON 
                //para poder trabajarlo e interar con el
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                //Un else por si algo sale mal enviar un erro
                const error = new Error('Error ' + url_api);
                return callback(error, null);//Pasamos el erro y no enviamos ninguna respuesta por eso es null
            }
        }
    }
    xhttp.send();//Envia la solicitud
}

//1ra peticion a la API que es ingresar y hacer peticiones a la api y tener acceso a cuantos personajes
fetchData(API, function (error1, data1) { //Recibimos la url de la API y el callback con sus respectivos parametros
    if (error1) return console.error(error1); // Si hay un error finalizo la ejecucion y envio el error
    //2da Peticion a la API que es el id del personaje y tener acceso a los datos del personaje
    //Si no hay error ejecutamos nuevamente fetchDta concatenandole el resultado que debe de ser el id del primer personaje
    fetchData(API + data1.results[0].id, function(error2, data2) { 
        if (error2) return console.error(error2); // Si hay un error finalizo la ejecucion y envio el error
        //3ra peticion a la API que es el origen para conocer la dimension
        fetchData(data2.origin.url, function (error3, data3) {
            if (error3) return console.error(error3);
            //Imprimimos en consola los datos que obtubimos en tra tres peticiones que hicimos a la API
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        });
    })
})