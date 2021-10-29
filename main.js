const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

//Agregamos los listener de los enlaces para filtrar por categorias.
window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('active'));
            evento.target.classList.add('active');


            const categoria = evento.target.innerHTML.toLowerCase();
            if (categoria === 'todos') {
                grid.filter('[data-categoria]');
            } else {
                grid.filter(`[data-categoria= ${categoria}]`);
            }
        });
    });

    //Agregamos el listener para la barra de busqueda.
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
    });
    //Agregamos listener para las imagenes
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {

        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add('active');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });

    //EventListener del boton de cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    //EventListener del boton de cerrar
    overlay.addEventListener('click', (evento) => {
        if (evento.target.id === 'overlay') {
            overlay.classList.remove('active');
        }
    });
});

//agragar evelentos para la barra de busqueda
document.querySelector('#barra-busqueda').addEventListener('keyup', () => {
    const busqueda = document.querySelector('#barra-busqueda').value;
    grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
});
