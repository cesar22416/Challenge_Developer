document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const textarea = document.getElementById('texto');
    const encryptButton = document.getElementById('encrytar');
    const decryptButton = document.getElementById('desencriptar');
    const backButton = document.getElementById('back');
    const textoEncriptado = document.getElementById('outputText');
    const mensaje = document.getElementById('mensaje');
    const homeTextoEncriptado = document.querySelector('.home_texto_encriptado');
    const homeImg = document.querySelector('.home_img');
    const copiarButton = document.getElementById('copiar');
    const imgOcultar = document.getElementById('imgOcultar'); // Referencia a la imagen a ocultar

    // Función para redirigir a una URL específica
    function redirectTo(url) {
        window.location.href = url;
    }

    // Función para ocultar o mostrar el textarea de salida según el contenido del textarea de entrada
    function toggleOutputVisibility(show) {
        if (show) {
            textoEncriptado.style.display = "block";
            copiarButton.style.display = "block"; // Mostrar el botón de copiar
        } else {
            textoEncriptado.style.display = "none";
            copiarButton.style.display = "none"; // Ocultar el botón de copiar
        }
    }

    // Función para validar el texto de entrada
    function validateInput(text) {
        const regex = /^[a-z\s]+$/;
        return regex.test(text);
    }

    // Función para encriptar texto utilizando el cifrado César
    function encryptText() {
        var input = textarea.value;

        // Validar el texto de entrada
        if (!validateInput(input)) {
            // Mostrar la alerta de SweetAlert
            swal("Oops...", "Solo letras minúsculas y sin acentos", "error");
            return;
        }

        var output = "";
        var shift = 3; // Desplazamiento de caracteres para el cifrado César

        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);

            if (charCode >= 97 && charCode <= 122) {  // Letras minúsculas
                output += String.fromCharCode((charCode - 97 + shift) % 26 + 97);
            } else {
                output += input.charAt(i);  // Conserva caracteres no alfabéticos
            }
        }

        // Mostrar el texto encriptado en el textarea de salida
        textoEncriptado.value = output;
        toggleOutputVisibility(true);

        // Cambiar el fondo de la sección y ocultar la imagen y el mensaje
        homeTextoEncriptado.style.backgroundColor = "#219C90";
        homeTextoEncriptado.style.borderRadius = "3rem";
        homeImg.style.display = "none";
        mensaje.style.display = "none";
        imgOcultar.style.display = 'none'; // Ocultar la imagen específica

        // Centrar la sección home_texto_encriptado
        homeTextoEncriptado.style.display = "flex";
        homeTextoEncriptado.style.flexDirection = "column";
        homeTextoEncriptado.style.justifyContent = "center";
        homeTextoEncriptado.style.alignItems = "center";
        homeTextoEncriptado.style.textAlign = "center";
        homeTextoEncriptado.style.margin = "auto";
        homeTextoEncriptado.style.maxWidth = "100%";

        // Limpiar el textarea de entrada
        textarea.value = "";
    }

    // Función para desencriptar texto utilizando el cifrado César
    function decryptText() {
        var input = textoEncriptado.value || textarea.value; // Usar el texto encriptado original o el texto externo
        var output = "";
        var shift = 3; // Mismo desplazamiento utilizado en la encriptación

        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode >= 97 && charCode <= 122) {  // Para letras minúsculas
                output += String.fromCharCode((charCode - 97 - shift + 26) % 26 + 97);
            } else {
                output += input.charAt(i);  // Conserva caracteres no alfabéticos
            }
        }

        // Mostrar el texto desencriptado en el textarea de entrada
        textarea.value = output;
        toggleOutputVisibility(false); // Ocultar el textarea de salida

        // Restablecer el estado inicial de la sección
        homeTextoEncriptado.style.backgroundColor = "";
        homeTextoEncriptado.style.borderRadius = ""; // Restablecer el border-radius
        homeImg.style.display = "block";
        mensaje.style.display = "block";

        // Ocultar la imagen si la pantalla es de 1000px o menos
        if (window.innerWidth <= 1000) {
            imgOcultar.style.display = 'none';
        }

        // Centrar la sección home_texto_encriptado
        homeTextoEncriptado.style.display = "flex";
        homeTextoEncriptado.style.flexDirection = "column";
        homeTextoEncriptado.style.justifyContent = "center";
        homeTextoEncriptado.style.alignItems = "center";
        homeTextoEncriptado.style.textAlign = "center";
        homeTextoEncriptado.style.margin = "auto";
        homeTextoEncriptado.style.maxWidth = "100%";
    }

    // Función para copiar el texto del textarea de salida
    function copyText() {
        textoEncriptado.select();
        document.execCommand('copy');
        // Deseleccionar el texto después de copiar
        window.getSelection().removeAllRanges();
    }

    // Verificar si los elementos existen antes de añadir los event listeners
    if (textarea && encryptButton && decryptButton && backButton && homeTextoEncriptado && homeImg && mensaje && copiarButton) {
        // Añadir evento de clic al botón de encriptado
        encryptButton.addEventListener('click', function() {
            encryptText();
        });

        // Añadir evento de clic al botón de desencriptado
        decryptButton.addEventListener('click', function() {
            decryptText();
        });

        // Añadir evento de clic al botón de copiar
        copiarButton.addEventListener('click', function() {
            copyText();
        });

        // Añadir evento de clic al botón de volver atrás
        backButton.addEventListener('click', function() {
            redirectTo('index.html');
        });

        // Ocultar inicialmente el textarea de salida y el botón de copiar
        toggleOutputVisibility(false);
        copiarButton.style.display = "none";
    } else {
        console.warn('Algunos elementos no se encontraron en el DOM.');
    }
});

