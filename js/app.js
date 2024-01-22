

const formulario = document.querySelector('#formulario');
const lista = document.querySelector("#lista-tweets");
const tweet = document.querySelector('#tweet');

let tweets = [];






eventos();
function eventos(){
    formulario.addEventListener('submit', agregarTweet);
   document.addEventListener('DOMContentLoaded', mostrarLocal);
}


function mostrarLocal() {
    //intenta traer los tweets del local sio se trae un arreglo vacio 
     tweets = JSON.parse(localStorage.getItem('tweets'))  || [];
   console.log(tweets);
   listarTweet();
}



function agregarTweet(e){
    e.preventDefault();
    const tweet = e.target.children[1].value;
    if(tweet === ""){
        mostrarAlerta("el campo no puede estar vacio");
    }else{
        
        const tweetObject = {
            id: Date.now(),
            texto: tweet
        }
        tweets = [...tweets, tweetObject];
        console.log(tweets)
        formulario.reset();
        listarTweet();
    }
}

function listarTweet(){
        limpiar();
        if(tweets.length > 0){
            tweets.forEach((twee) =>{
                const btnEliminar = document.createElement("a");
                btnEliminar.classList.add("borrar-tweet");
                btnEliminar.textContent = 'x';
                const tweethtml = document.createElement("li");
                
                btnEliminar.addEventListener("click", () =>{
                    borrarTweet(twee.id);
                });
                tweethtml.textContent =`${twee.texto}` ;
                tweethtml.appendChild(btnEliminar); 
                lista.appendChild(tweethtml);
            })
        }
       
        sincronizarStorage();
   
}

//agregar los tweets acutuales al local Storage
function sincronizarStorage(){
        localStorage.setItem(`tweets`, JSON.stringify(tweets));  
}
function limpiar(){
    lista.innerHTML = ``;
}



function borrarTweet(tweetid){
    console.log(tweetid);
    tweets =  tweets.filter(tw => tw.id != tweetid)
    console.log(tweets);  
    listarTweet();
}

function mostrarAlerta(error){
    const mensaje = document.createElement("p");
    mensaje.textContent = error;
    mensaje.classList.add("error");
    formulario.appendChild(mensaje);
    setTimeout( () =>{
        formulario.removeChild(mensaje);

    }, 2000)

}
