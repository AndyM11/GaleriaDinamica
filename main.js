const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

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
});