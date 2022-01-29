function suma(nun1, nun2){
    return nun1 + nun2;
}

function producto(nun1, nun2) {
    return nun1 * nun2;
}

function diferencia(nun1, nun2) {
    return nun1 - nun2;
}

function cociente(nun1, nun2) {
    return nun1 / nun2;
}

//Esta funcion recibe como parametro los numeros y ademas recibe una funcion 
function calc(nun1, nun2, callback){
    return callback(nun1, nun2);
}

console.log(calc(9, 3, suma));
console.log(calc(9, 3, producto));
console.log(calc(9, 3, diferencia));
console.log(calc(9, 3, cociente));

//--------------------Imprimir la fecha actual------------------------
function date(callback) {
    console.log("date " + new Date);//primero imprime esta fecha
    setTimeout(function() {
        let date = new Date; //Calcula la nueva fecha
        callback(date);    //LLama a la funcion que se pasa por parameto y se le envia la nueva fecha 
    }, 3000) 
}

function printDate(dateNow) { //recibe la nueva fecha
    console.log("printDate " + dateNow); //Imprime la nueva fecha
}

date(printDate);