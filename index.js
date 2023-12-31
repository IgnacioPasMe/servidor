const http = require("http");
const path = require("path");
const {stat} = require ("fs");
const {tipo,servirFichero} = require(path.join(__dirname,"funciones.js"));

let puerto = process.env.PORT || 3000;

const servidor = http.createServer((peticion,respuesta) => {
    if(peticion.url == "/"){
        servirFichero(respuesta,path.join(__dirname,"estaticos/index.html"),tipo("html"),200);
    }else if(peticion.url == "/color"){

        respuesta.writeHead(200,{ "Content-type" : "application/json"});

        let [r,g,b] = [0,0,0].map(() => Math.floor(Math.random() * 256));

        respuesta.write(JSON.stringify({r,g,b}));

        respuesta.end();

    }else{
        let ruta = path.join(__dirname,"estaticos",peticion.url);

        stat(ruta, (error, estadisticas) => {

            if(!error && estadisticas.isFile()){
                servirFichero(respuesta,ruta,tipo(ruta.split(".").pop()),200);
            }else{
                servirFichero(respuesta,path.join(__dirname,"404.html"),tipo("html"),404);
            }
        })
    }
    
});

servidor.listen(3000);



