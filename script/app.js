document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const textarea = document.getElementById('texto');
    const encryptButton = document.getElementById('encrytar');
    const decryptButton = document.getElementById('desencriptar');
    const backButton = document.getElementById('back');
    const textoEncriptado = document.getElementById('outputText');
    const mensaje = document.getElementById('mensaje');

    // Función para redirigir a una URL específica
    function redirectTo(url) {
        window.location.href = url;
    }

    // Función para encriptar texto utilizando el cifrado César
    function encryptText() {
        var input = textarea.value;
        var output = "";
        var shift = 3; // Desplazamiento de caracteres para el cifrado César

        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);

            if (charCode >= 65 && charCode <= 90) {  // Letras mayúsculas
                output += String.fromCharCode((charCode - 65 + shift) % 26 + 65);
            } else if (charCode >= 97 && charCode <= 122) {  // Letras minúsculas
                output += String.fromCharCode((charCode - 97 + shift) % 26 + 97);
            } else {
                output += input.charAt(i);  // Conserva caracteres no alfabéticos
            }
        }

        // Mostrar el texto encriptado en el textarea de salida
        textoEncriptado.value = output;
    }

    // Función para desencriptar texto utilizando el cifrado César
    function decryptText() {
        var input = textoEncriptado.value; // Usar el texto encriptado original
        var output = "";
        var shift = 3; // Mismo desplazamiento utilizado en la encriptación
    
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) {  // Para letras mayúsculas
                output += String.fromCharCode((charCode - 65 - shift + 26) % 26 + 65);
            } else if (charCode >= 97 && charCode <= 122) {  // Para letras minúsculas
                output += String.fromCharCode((charCode - 97 - shift + 26) % 26 + 97);
            } else {
                output += input.charAt(i);  // Conserva caracteres no alfabéticos
            }
        }
    
        textarea.value = output; // Mostrar el texto desencriptado en el textarea de entrada
    }

    // Verificar si los elementos existen antes de añadir los event listeners
    if (textarea && encryptButton && decryptButton && backButton) {
        // Añadir evento de clic al botón de encriptado
        encryptButton.addEventListener('click', function() {
            encryptText();
        });

        // Añadir evento de clic al botón de desencriptado
        decryptButton.addEventListener('click', function() {
            decryptText();
        });

        // Añadir evento de clic al botón de volver atrás
        backButton.addEventListener('click', function() {
            redirectTo('index.html');
        });
    } else {
        console.warn('Algunos elementos no se encontraron en el DOM.');
    }
});
