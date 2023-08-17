
//console.log('Hola Mundo!!', new Date().toISOString());

const sonl = document.querySelector('#sonl');
const soffl = document.querySelector('#soffl');
const mensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () =>{

    //console.log('Conectado');

    sonl.style.display = '';
    soffl.style.display = 'none';
});


socket.on('disconnect', () =>{

    //console.log('Desconectado');    

    sonl.style.display = 'none';
    soffl.style.display = '';
});

socket.on('enviar-mensaje-desde-server', (mensaje)=>{
    console.log(mensaje);    
})

socket.on('mensaje-confirmacion', (mensaje)=>{
    console.log(mensaje);    
})

btnEnviar.addEventListener('click', () => {

    //console.log(mensaje.value);

    socket.emit('enviar-mensaje-desde-socket', mensaje.value, (parametro) => {
        console.log(parametro);
    });
    /* El tercer argumento es opcional. Se agrega si necesitamos respuesta por parte del server
    en el mensaje enviado. Por ejemplo, si se grabo algo en la base y devuelve un id*/
});