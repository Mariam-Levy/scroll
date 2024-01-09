// ---------------- establecer la fecha : -------------------
// Selecciona un elemento <span> con el ID "date"
const date = document.getElementById('date');
// Establece el contenido de ese elemento como el año actual
date.innerHTML = new Date().getFullYear();


// Selecciona elementos relevantes del DOM
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');


//----------------- Lógica para mostrar/ocultar el menú de enlaces: -----------------
// Agrega un evento de clic al elemento con clase ".nav-toggle" 
navToggle.addEventListener('click', function() {

    // Se obtiene la altura del contenedor de enlaces (linksContainer) y de los enlaces (links)
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;

    // Se verifica si el 'contenedor de enlaces'(containerHeigth) está visible o no.
    // Si está oculto (altura = 0), se establece su altura para mostrarlo.
    // Si ya está visible, se oculta estableciendo su altura a 0.
    if(containerHeight === 0 ) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
});


//--------------- Lógica para fijar la barra de navegación y mostrar/ocultar el enlace "volver arriba": -----------------
const navbar = document.querySelector('#nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', function() {
    // Se obtiene la altura del desplazamiento y la barra de navegación
    const navHeight = navbar.getBoundingClientRect().height;
    const scrollHeight = window.scrollY;

    // Si el desplazamiento vertical supera la altura de la barra de navegación,
    // se agrega una clase para fijar la barra. Si no, se elimina esa clase.
    if(scrollHeight > navHeight) {
        navbar.classList.add('fixed-nav')
    } else {
        navbar.classList.remove('fixed-nav');
    }

    // Si el desplazamiento es mayor a 500px, se muestra el enlace "volver arriba".
    // Si no, se oculta.
    if(scrollHeight > 500) {
        topLink.classList.add('show-link')
    } else {
        topLink.classList.remove('show-link')
    }
})


// ------------ Lógica para el desplazamiento suave a las secciones correspondientes: -----------
// Selecciona todos los elementos con la clase ".scroll-link"
const scrollLinks = document.querySelectorAll('.scroll-link');

// Itera sobre cada elemento ".scroll-link" y agrega un evento de clic a cada uno
scrollLinks.forEach((link) => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace (evita que se cargue una nueva página)

        // Obtiene el ID del elemento al que se hará scroll suave, quitando el carácter "#"
        const id = e.currentTarget.getAttribute('href').slice(1);

        // Obtiene el elemento del DOM con el ID correspondiente
        const element = document.getElementById(id);

        // Obtiene la altura de la barra de navegación y del contenedor de enlaces
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;

        // Verifica si la barra de navegación está fija o no (contiene la clase "fixed-nav")
        const fixedNav = navbar.classList.contains('fixed-nav');

        // Calcula la posición de desplazamiento del elemento, considerando la altura de la barra de navegación
        let position = element.offsetTop - navHeight;

        // Ajusta la posición si la barra de navegación no está fija
        if(!fixedNav) {
            position = position - navHeight;
        }

        // Ajusta la posición si la barra de navegación no está fija
        if(navHeight > 82) {
            position = position + containerHeight;
        } 

        // Realiza el desplazamiento suave hacia la posición calculada
        window.scrollTo({
            left: 0,
            top: position,
        });

        // Cierra el menú de enlaces al hacer clic en uno de ellos
        linksContainer.style.height = 0;

    })
});