/* js/views/docentesView.js */

export default class DocentesView {
    constructor() {
        this.viewId = 'view-docentes';
        this.form = document.querySelector('#view-docentes .docente-form');
        this.tableBody = document.querySelector('#view-docentes .data-table tbody');

        // Datos simulados
        this.docentes = [
            { id: 'D-001', nombre: 'Javier González', carga: '8-18', materias: 'Cálculo, Física' },
            { id: 'D-002', nombre: 'María López', carga: '20-22', materias: 'Programación, Redes' }
        ];
    }

    init() {
        if (!this.form) return;
        this.renderTable();
        this.addEventListeners();
        console.log('Docentes View inicializada');
    }

    addEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addDocente();
        });
    }

    addDocente() {
        const inputs = this.form.querySelectorAll('input');
        const select = this.form.querySelector('select');

        const nuevoDocente = {
            id: inputs[1].value, // Usamos la matrícula como ID
            nombre: inputs[0].value,
            carga: select.options[select.selectedIndex].text,
            materias: 'Sin asignar' // Por defecto
        };

        this.docentes.push(nuevoDocente);
        this.renderTable();
        this.form.reset();
        alert('Docente registrado correctamente');
    }

    deleteDocente(id) {
        if(confirm('¿Eliminar docente?')) {
            this.docentes = this.docentes.filter(d => d.id !== id);
            this.renderTable();
        }
    }

    renderTable() {
        this.tableBody.innerHTML = ''; 
        this.docentes.forEach(doc => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${doc.id}</td>
                <td>${doc.nombre}</td>
                <td>${doc.carga}</td>
                <td>${doc.materias}</td>
                <td>
                    <button class="btn btn-info btn-sm">Editar</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${doc.id}">Eliminar</button>
                </td>
            `;
            this.tableBody.appendChild(row);
        });

        this.tableBody.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteDocente(e.target.dataset.id));
        });
    }
}