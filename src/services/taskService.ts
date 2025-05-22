import { getFirestore, collection, addDoc, getDocs, query, doc, updateDoc, deleteDoc, setDoc, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import type { Task } from '../types/taskTypes';

// Firebase initialization
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to save a task to Firestore
export const saveTaskToFirestore = async (task: Task) => {
  try {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('Usuario no autenticado.');

    await addDoc(collection(db, 'tasks'), {
      ...task,
      uid, // Asigna el uid del usuario creador
      createdAt: new Date(),
    });

    return { success: true, message: 'Tarea guardada exitosamente.' };
  } catch (error) {
    console.error('Error adding document: ', error);
    return { success: false, message: 'Error al guardar la tarea. Inténtelo de nuevo.' };
  }
};

// Function to fetch tasks from Firestore
export const fetchTasksFromFirestore = async () => {
  try {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('Usuario no autenticado.');

    // Consulta solo por uid sin ordenar
    const tasksQuery = query(collection(db, 'tasks'), where('uid', '==', uid));
    const querySnapshot = await getDocs(tasksQuery);

    const tasks: Task[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title || '',
      description: doc.data().description || '',
      deadline: doc.data().deadline || '',
      priority: doc.data().priority || 'media',
      isFavorite: doc.data().isFavorite || false,
      completed: doc.data().completed || false,
      tags: doc.data().tags || [],
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      uid: doc.data().uid || '', // Add uid property
    }));

    return { success: true, tasks };
  } catch (error) {
    console.error('Error fetching user tasks: ', error);
    return { success: false, message: 'Error al obtener las tareas del usuario.' };
  }
};

// Function to update task completion status in Firestore
export const updateTaskCompletionStatus = async (taskId: string, completed: boolean) => {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { completed });
    return { success: true, message: 'Estado de la tarea actualizado exitosamente.' };
  } catch (error) {
    console.error('Error updating task: ', error);
    return { success: false, message: 'Error al actualizar el estado de la tarea. Inténtelo de nuevo.' };
  }
};

export const deleteTaskFromFirestore = async (taskId: string) => {
  try {
    await deleteDoc(doc(db, 'tasks', taskId));
    return { success: true };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : String(error) };
  }
};

export const updateTaskInFirestore = async (task: Task) => {
  try {
    await setDoc(doc(db, 'tasks', task.id), {
      ...task,
      updatedAt: new Date(),
    }, { merge: true }); // merge:true mantiene los campos no enviados

    return { success: true, message: 'Tarea actualizada correctamente.' };
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    return { success: false, message: 'Error al actualizar la tarea.' };
  }
};
