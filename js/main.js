// Seleccionar todos los elementos de menú con submenús
const menuItems = document.querySelectorAll('.menu_item'); //querySelectorAll() devuelve una lista de todos los elementos que coinciden con el selector CSS especificado.

// Agregar un evento de clic a cada menú principal
menuItems.forEach(item => {
    item.addEventListener('click', function(event) {
        // Evitar el comportamiento predeterminado de los enlaces
        event.preventDefault();
        
        // Remover la clase 'active' de todos los menús principales
        menuItems.forEach(item => item.classList.remove('active'));

        // Agregar la clase 'active' al menú principal seleccionado
        this.classList.add('active');
        
        // Alternar la visibilidad del submenú correspondiente
        const submenu = this.nextElementSibling; //nextElementSibling devuelve el siguiente elemento hermano en el árbol DOM.
        if (submenu) {
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block'; //Si el submenú está visible, lo oculta, y si está oculto, lo muestra.
        }
        
        // Ocultar los otros submenús
        menuItems.forEach(otherItem => {
            const otherSubmenu = otherItem.nextElementSibling; //nextElementSibling devuelve el siguiente elemento hermano en el árbol DOM.
            if (otherSubmenu && otherItem !== this) { //Si el otro submenú existe y no es el submenú seleccionado, lo oculta.
                otherSubmenu.style.display = 'none'; //Si el otro submenú está visible, lo oculta.
            }
        });
    });
});

// Mantener el menú principal en rojo mientras se navega por los submenús
document.querySelectorAll('.submenu').forEach(submenu => { 
    submenu.addEventListener('mouseenter', () => { //mouseenter se activa cuando el puntero del mouse entra en el área del elemento.
        submenu.previousElementSibling.classList.add('active'); // Agregar rojo si es activo
    });
    submenu.addEventListener('mouseleave', () => {
        submenu.previousElementSibling.classList.remove('active'); // Quitar rojo si no es activo
    });
});

// Efecto hover para cambiar color a amarillo cuando el ratón está sobre una opción de menú
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('active')) { //contains() es un método de JavaScript que se utiliza para verificar si un elemento tiene una clase específica.
            item.style.backgroundColor = '#E1E00B'; // Fondo amarillo en hover
            item.style.color = 'black'; // Texto negro en hover
        }
    });
    item.addEventListener('mouseleave', () => {
        if (!item.classList.contains('active')) {
            item.style.backgroundColor = ''; // Restaurar fondo original
            item.style.color = 'white';
        }
    });
});
