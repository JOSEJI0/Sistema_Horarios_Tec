/* js/dashboard.js */

// Importamos las clases de las vistas
import MateriasView from './views/materiasView.js';
import DocentesView from './views/docentesView.js';
import HorarioGridView from './views/horarioGridView.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Inicialización de Vistas ---
    const materiasView = new MateriasView();
    const docentesView = new DocentesView();
    const horarioView = new HorarioGridView();

    // Inicializamos lógica interna de cada vista
    materiasView.init();
    docentesView.init();
    horarioView.init();


    // --- 2. Lógica de Navegación (Sidebar) ---
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const viewTitle = document.getElementById('view-title');

    const loadView = (viewName) => {
        // Ocultar todas las vistas
        document.querySelectorAll('.view-content').forEach(v => v.style.display = 'none');
        
        // Mostrar la vista seleccionada
        const selectedView = document.getElementById(viewName);
        if (selectedView) {
            selectedView.style.display = 'block';
            
            // Actualizar el título principal
            const newTitle = selectedView.getAttribute('data-title');
            if(viewTitle) viewTitle.textContent = newTitle;
        }

        // Actualizar clase activa del menú
        navItems.forEach(item => item.classList.remove('nav-active'));
        const activeLink = document.querySelector(`.nav-item[data-view="${viewName}"]`);
        if(activeLink) activeLink.classList.add('nav-active');
    };

    // Asignar eventos click al menú lateral
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const viewName = e.target.getAttribute('data-view'); // Usamos getAttribute para ser seguros
            loadView(viewName);
        });
    });

    // Cargar la vista por defecto al iniciar
    loadView('view-horario');
});