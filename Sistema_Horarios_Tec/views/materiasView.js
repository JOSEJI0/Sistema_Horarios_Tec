/* js/views/materiasView.js */

// 1. Importamos la DB y las funciones de Firestore
import { db } from '../firebaseConfig.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export default class MateriasView {
    constructor() {
        this.viewId = 'view-materias';
        this.form = document.querySelector('#view-materias .materia-form');
        this.tableBody = document.querySelector('#view-materias .data-table tbody');
        
        // Ya no necesitamos this.materias = [] porque los datos viven en la nube
    }

    init() {
        if (!this.form) return;
        
        // Cargar datos reales al iniciar
        this.loadMaterias(); 
        this.addEventListeners();
        console.log('Materias View inicializada con Firebase');
    }

    addEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addMateria();
        });
    }

    // --- FUNCIONES ASÍNCRONAS (Conectan con Firebase) ---

    // LEER (Read)
    async loadMaterias() {
        this.tableBody.innerHTML = '<tr><td colspan="5">Cargando datos...</td></tr>';
        
        try {
            // "materias" es el nombre de la colección en Firebase
            const querySnapshot = await getDocs(collection(db, "materias")); 
            
            this.tableBody.innerHTML = ''; // Limpiar mensaje de carga

            querySnapshot.forEach((doc) => {
                // doc.data() trae los datos, doc.id trae el ID único generado por Google
                const materiaData = { id: doc.id, ...doc.data() };
                this.renderRow(materiaData);
            });
        } catch (error) {
            console.error("Error al cargar materias: ", error);
            alert("Error al cargar los datos.");
        }
    }

    // CREAR (Create)
    async addMateria() {
        const inputs = this.form.querySelectorAll('input');
        const nuevaMateria = {
            nombre: inputs[0].value,
            horas: inputs[1].value,
            creditos: inputs[2].value
        };

        try {
            // Guardamos en la colección "materias"
            const docRef = await addDoc(collection(db, "materias"), nuevaMateria);
            console.log("Documento escrito con ID: ", docRef.id);
            
            // Recargamos la tabla para ver el cambio
            this.loadMaterias(); 
            this.form.reset();
            alert('Materia guardada en la nube correctamente');

        } catch (e) {
            console.error("Error al agregar documento: ", e);
            alert("Error al guardar.");
        }
    }

    // ELIMINAR (Delete)
    async deleteMateria(id) {
        if(confirm('¿Estás seguro de eliminar esta materia de la base de datos?')) {
            try {
                // Referencia al documento específico por su ID
                await deleteDoc(doc(db, "materias", id));
                
                // Recargamos la tabla
                this.loadMaterias(); 
                
            } catch (e) {
                console.error("Error al eliminar: ", e);
            }
        }
    }

    // Renderizado simple de una fila
    renderRow(materia) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-size:0.8em; color:#999;">${materia.id}</td> <td>${materia.nombre}</td>
            <td>${materia.horas}</td>
            <td>${materia.creditos}</td>
            <td>
                <button class="btn btn-info btn-sm">Editar</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${materia.id}">Eliminar</button>
            </td>
        `;
        this.tableBody.appendChild(row);

        // Asignar evento al botón eliminar de esta fila
        row.querySelector('.delete-btn').addEventListener('click', (e) => {
            this.deleteMateria(e.target.dataset.id);
        });
    }
}