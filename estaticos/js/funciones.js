const circulos = document.querySelectorAll(".circulo");
const contenedorTiempo = document.querySelector(".tiempo");
const textoModal = document.querySelector(".modal h1");
const botonJugar = document.querySelector(".modal button");
const modal = document.querySelector(".modal");
let puntuacion = 0
let contador = null;
let tiempo = 10;
let estadoJuego = false; // true --> Has ganado ! False --> Has perdido o es la primera partida.

function juego(tiempo){
    puntuacion = 0;
    contenedorTiempo.innerHTML = "";
    circulos.forEach(circulo => circulo.classList.remove("invisible"));
    for(let i = 0; i < tiempo; i++){
        let bloque = document.createElement("div");
        bloque.style.width = `calc(${100/tiempo}% - 10px)`;
        contenedorTiempo.appendChild(bloque);
    }
    contador = setInterval(() => {
        contenedorTiempo.children[0].remove();
        if(contenedorTiempo.children.length == 0){
            clearInterval(contador);
            estadoJuego = false;
            textoModal.innerHTML = "Has perdido"
            modal.classList.add("visible");
        }
    },1000);

}

for(let i = 0; i < circulos.length; i++){
    circulos[i].addEventListener("click", () => {
        circulos[i].classList.add("invisible");
        puntuacion++;
        if(puntuacion == 12){
            clearInterval(contador);
            estadoJuego = true;
            textoModal.innerHTML = "Has ganado!";
            modal.classList.add("visible");
        }
    });
}
botonJugar.addEventListener("click", () => {
    modal.classList.remove("visible");
    if(estadoJuego){
        tiempo--;
    }
    juego(estadoJuego ? --tiempo : tiempo);
});