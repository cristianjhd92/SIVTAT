// Seleccionar todos los elementos de menú con submenús
const menuItems = document.querySelectorAll('.menu_item'); // querySelectorAll() devuelve una lista de todos los elementos que coinciden con el selector CSS especificado.
const submenus = document.querySelectorAll('.submenu a');   // Seleccionar todas las opciones de submenú

// Agregar un evento de clic a cada menú principal
menuItems.forEach((item, mainIndex) => {
    item.addEventListener('click', function(event) {
        // Evitar el comportamiento predeterminado de los enlaces
        event.preventDefault();
        
        // Remover la clase 'active' y 'selected' de todos los menús principales
        menuItems.forEach(item => {
            item.classList.remove('active', 'selected');
            item.style.backgroundColor = ''; // Restaurar fondo original
            item.style.color = 'white';
        });

        // Verificar si el elemento tiene un submenú o no
        const hasSubmenu = this.nextElementSibling && this.nextElementSibling.classList.contains('submenu');

        if (hasSubmenu) {
            // Aplicar estilo "activo" para menús con submenús
            this.classList.add('active');
            this.style.backgroundColor = '#F41F00'; // Fondo rojo para activo
            this.style.color = 'white'; // Texto blanco para activo
            this.nextElementSibling.style.display = 'block';
        } else {
            // Aplicar estilo "seleccionado" para menús sin submenús (como Dashboard)
            this.classList.add('selected');
            this.style.backgroundColor = '#E1E00B'; // Fondo amarillo para seleccionado
            this.style.color = 'black'; // Texto negro para seleccionado
        }

        // Ocultar los otros submenús
        menuItems.forEach(otherItem => {
            const otherSubmenu = otherItem.nextElementSibling;
            if (otherSubmenu && otherItem !== this) {
                otherSubmenu.style.display = 'none';
            }
        });

        // Guardar el estado actual en Local Storage
        saveMenuState(mainIndex, hasSubmenu ? null : mainIndex);
    });
});

// Mantener el menú principal en rojo mientras se navega por los submenús
document.querySelectorAll('.submenu').forEach(submenu => { 
    submenu.addEventListener('mouseenter', () => { 
        submenu.previousElementSibling.classList.add('active'); 
    });
    submenu.addEventListener('mouseleave', () => {
        submenu.previousElementSibling.classList.remove('active'); 
    });
});

// Efecto hover para cambiar color a amarillo cuando el ratón está sobre una opción de menú
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('active') && !item.classList.contains('selected')) { 
            item.style.backgroundColor = '#E1E00B'; // Fondo amarillo en hover
            item.style.color = 'black'; // Texto negro en hover
        }
    });
    item.addEventListener('mouseleave', () => {
        if (!item.classList.contains('active') && !item.classList.contains('selected')) {
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
        if (menuState.mainIndex !== null) {
            const mainMenu = menuItems[menuState.mainIndex];
            if (mainMenu.nextElementSibling && mainMenu.nextElementSibling.classList.contains('submenu')) {
                mainMenu.classList.add('active');
                mainMenu.style.backgroundColor = '#F41F00';
                mainMenu.style.color = 'white';
                mainMenu.nextElementSibling.style.display = 'block';
            } else {
                mainMenu.classList.add('selected');
                mainMenu.style.backgroundColor = '#E1E00B';
                mainMenu.style.color = 'black';
            }
        }
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
    const isMain = window.location.pathname.includes('main'); 
    if (isMain) clearMenuState();
    loadMenuState(); 
});

// Guardar el estado en Local Storage cuando se hace clic en un submenú
submenus.forEach((submenu, subIndex) => {
    submenu.addEventListener('click', function(event) {
        const mainIndex = Array.from(menuItems).indexOf(this.closest('.submenu').previousElementSibling);
        saveMenuState(mainIndex, subIndex);
    });
});
