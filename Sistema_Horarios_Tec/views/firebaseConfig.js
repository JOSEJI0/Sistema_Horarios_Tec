/* js/firebaseConfig.js */

// Importamos las funciones necesarias desde los servidores de Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfM2KIz5LvLF-5e9mf18i6jsm1u9kaAOE",
  authDomain: "gestiondehorarios-50d8a.firebaseapp.com",
  projectId: "gestiondehorarios-50d8a",
  storageBucket: "gestiondehorarios-50d8a.firebasestorage.app",
  messagingSenderId: "668402273794",
  appId: "1:668402273794:web:2e02d000f59bf5cb81e11b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar y exportar la referencia a la Base de Datos
export const db = getFirestore(app);