const {createReadStream} = require ("fs");

function tipo(extension){
    switch(extension){
        case "css":return "text/css";
        case "js":return "text/javascript";
        case "jpg":return "text/jpeg";
        case "jpeg":return "text/jpeg";
        case "png":return "text/png";
        case "json":return "application/json";
        default: return "text/html";
    }
}

function servirFichero(respuesta,ruta,tipo,status){
    respuesta.writeHead(status, {"Content-type" : tipo });

    let fichero = createReadStream(ruta);

    fichero.pipe(respuesta);

    fichero.on("end", () => respuesta.end());

}

module.exports = {tipo,servirFichero};