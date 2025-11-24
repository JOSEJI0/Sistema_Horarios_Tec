/* js/views/horarioGridView.js */

export default class HorarioGridView {
    constructor() {
        this.viewId = 'view-horario';
        this.tableBody = document.querySelector('.horario-table tbody');
        
        // Datos simulados del horario
        // diaIndex: 1=Lunes, 2=Martes, etc.
        // horaIndex: 0=7:00, 1=14:00 (según tus filas en HTML)
        this.clases = [
            { 
                materia: 'Cálculo Diferencial', 
                aula: '101', 
                profesor: 'J. Pérez', 
                diaIndex: 1, // Lunes
                horaIndex: 0 // Primera fila (7:00 - 8:00)
            },
            { 
                materia: 'Programación Web', 
                aula: '205', 
                profesor: 'M. López', 
                diaIndex: 3, // Miércoles
                horaIndex: 0 // Primera fila
            },
            { 
                materia: 'Base de Datos', 
                aula: 'LAB 2', 
                profesor: 'R. Sanchez', 
                diaIndex: 2, // Martes
                horaIndex: 1 // Segunda fila (14:00)
            }
        ];
    }

    init() {
        if(!this.tableBody) return;
        this.renderGrid();
        console.log('Horario Grid View inicializada');
    }

    renderGrid() {
        // 1. Obtener todas las filas de tiempo actuales del HTML
        const rows = this.tableBody.querySelectorAll('tr');

        // 2. Limpiar contenido de celdas (excepto la primera columna de hora)
        rows.forEach(row => {
            // Empezamos desde i=1 porque i=0 es la columna de la hora
            for (let i = 1; i < row.children.length; i++) {
                row.children[i].className = 'class-slot';
                row.children[i].innerHTML = '';
            }
        });

        // 3. Rellenar con los datos
        this.clases.forEach(clase => {
            const targetRow = rows[clase.horaIndex];
            if (targetRow) {
                const targetCell = targetRow.children[clase.diaIndex];
                
                if (targetCell) {
                    targetCell.classList.add('class-active');
                    targetCell.innerHTML = `
                        <span class="materia">${clase.materia}</span>
                        <span class="details">Aula: ${clase.aula} / Prof: ${clase.profesor}</span>
                    `;
                    
                    // Efecto de click para ver detalles (simulado)
                    targetCell.onclick = () => alert(`Detalles de ${clase.materia}\nDocente: ${clase.profesor}`);
                }
            }
        });
    }
}