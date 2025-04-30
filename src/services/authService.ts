import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

// Function to register a user with email and password
export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Save user information in Firestore
    await setDoc(doc(db, 'users', uid), {
      uid,
      name,
      email,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: 'Usuario registrado exitosamente.',
      user: userCredential.user,
    };
  } catch (error: unknown) {
    console.error('Error registering user: ', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al registrar el usuario. Inténtelo de nuevo.';
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Function to log in a user with email and password
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      message: 'Inicio de sesión exitoso.',
      user: userCredential.user,
    };
  } catch (error: unknown) {
    console.error('Error logging in user: ', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión. Inténtelo de nuevo.';
    return {
      success: false,
      message: errorMessage,
    };
  }
};
