// Seleccionar todos los elementos de menú con submenús
const menuItems = document.querySelectorAll('.menu_item'); //querySelectorAll() devuelve una lista de todos los elementos que coinciden con el selector CSS especificado.
const submenus = document.querySelectorAll('.submenu a');   // Seleccionar todas las opciones de submenú

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

// Función para guardar el estado actual en Local Storage
function saveMenuState(mainIndex, subIndex) {
    localStorage.setItem('menuState', JSON.stringify({ mainIndex, subIndex }));
}

// Función para cargar el estado guardado y aplicar las clases `active` y `selected`
function loadMenuState() {
    const menuState = JSON.parse(localStorage.getItem('menuState'));
    if (menuState) {
        // Si hay un índice de menú principal guardado, aplica la clase y el estilo correspondiente
        if (menuState.mainIndex !== null) {
            const mainMenu = menuItems[menuState.mainIndex];
            if (mainMenu.nextElementSibling && mainMenu.nextElementSibling.classList.contains('submenu')) {
                // Menú con submenú: aplicar estilo "activo" en rojo con blanco
                mainMenu.classList.add('active');
                mainMenu.style.fontWeight = 'bold';
                mainMenu.style.color = 'white';
                mainMenu.style.backgroundColor = '#F41F00';
                mainMenu.nextElementSibling.style.display = 'block'; // Mostrar submenú
            } else {
                // Menú sin submenú: aplicar estilo de "selección" en amarillo con negro
                mainMenu.classList.add('selected');
                mainMenu.style.fontWeight = 'bold';
                mainMenu.style.color = 'black';
                mainMenu.style.backgroundColor = '#E1E00B';
            }
        }
        // Si hay un índice de submenú guardado, aplica la clase `selected` y estilo en amarillo
        if (menuState.subIndex !== null) {
            const subMenu = submenus[menuState.subIndex];
            subMenu.classList.add('selected');
            subMenu.style.fontWeight = 'bold';
            subMenu.style.color = 'black';
            subMenu.style.backgroundColor = '#E1E00B';
        }
    }
}

// Función para borrar el estado almacenado en Local Storage
function clearMenuState() {
    localStorage.removeItem('menuState');
}

// Borrar el estado al recargar el main
document.addEventListener('DOMContentLoaded', () => {
    const isMain = window.location.pathname.includes('main'); // Detecta si es la página principal
    if (isMain) clearMenuState();
    loadMenuState(); // Cargar el estado en cada página
});

// Guardar el estado en Local Storage cuando se hace clic en un menú principal
menuItems.forEach((item, mainIndex) => {
    item.addEventListener('click', function(event) {
        const hasSubmenu = this.nextElementSibling && this.nextElementSibling.classList.contains('submenu'); //&& funciona como un AND y this. funciona como un referencia al elemento actual
        saveMenuState(mainIndex, hasSubmenu ? null : mainIndex); // Guardar solo el índice principal si no tiene submenú y ? funciona como un OR
    });
});

// Guardar el estado en Local Storage cuando se hace clic en un submenú
submenus.forEach((submenu, subIndex) => {
    submenu.addEventListener('click', function(event) {
        const mainIndex = Array.from(menuItems).indexOf(this.closest('.submenu').previousElementSibling); // closest() devuelve el primer elemento que coincide con el selector CSS especificado en la cadena de búsqueda, comenzando desde el elemento actual y subiendo por la jerarquía del DOM.
        saveMenuState(mainIndex, subIndex); // Guarda el índice principal y de submenú cuando se selecciona un submenú
    });
});
