// Asegúrate de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias al botón de inicio
    const inicio = document.getElementById('star');

    // Función para redirigir a una URL específica
    function redirectTo(url) {
        window.location.href = url;
    }

    // Verificar si el botón de inicio existe antes de añadir el event listener
    if (inicio) {
        // Añadir evento de clic al botón de inicio
        inicio.addEventListener('click', function() {
            redirectTo('home.html');
        });
    } else {
        console.warn('El botón de inicio no se encontró en el DOM.');
    }
});
