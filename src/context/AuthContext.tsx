'use client';

import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { onAuthStateChanged, User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  appUser: User | null;
  loading: boolean;
  registerUser: (email: string, pass: string, name: string, role: User['role']) => Promise<any>;
  loginUser: (email: string, pass: string) => Promise<any>;
  logoutUser: () => Promise<any>;
  sendPasswordReset: (email: string) => Promise<void>;
  setAppUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setAppUser(userSnap.data() as User);
          } else {
            // Document doesn't exist, create it. This is for first-time logins or new registrations.
            const newUser: User = {
              id: user.uid,
              name: user.displayName || 'Nuevo Usuario',
              email: user.email!,
              role: 'Cliente',
              avatar: user.photoURL || `https://placehold.co/100x100.png`,
              objectives: 'Definir mis objetivos.',
              points: 0,
              profileCompleted: false,
            };
            await setDoc(userRef, newUser);
            setAppUser(newUser);
          }
        } catch (error) {
          console.error("Error al obtener el perfil de Firestore:", error);
          // Fallback mechanism: If Firestore is inaccessible (e.g., rules issue),
          // create a temporary user profile from auth data to prevent a logout loop.
          // This keeps the user logged in and the app functional.
          const fallbackUser: User = {
            id: user.uid,
            name: user.displayName || 'Usuario Temporal',
            email: user.email!,
            role: 'Cliente',
            avatar: user.photoURL || `https://placehold.co/100x100.png`,
            objectives: 'No se pudieron cargar los datos del perfil. La información no se guardará.',
            points: 0,
            profileCompleted: false,
          };
          setAppUser(fallbackUser);
        } finally {
          setLoading(false);
        }
      } else {
        // User is signed out.
        setAppUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const registerUser = async (email: string, pass: string, name: string, role: User['role']) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    const photoURL = `https://placehold.co/100x100.png`;
    await updateProfile(user, { displayName: name, photoURL });

    const newUser: User = {
      id: user.uid,
      name,
      email,
      role,
      avatar: photoURL,
      objectives: 'Definir mis objetivos.',
      points: 0,
      profileCompleted: false,
    };
    await setDoc(doc(db, "users", user.uid), newUser);
    
    setAppUser(newUser);
    return userCredential;
  };

  const loginUser = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };
  
  const logoutUser = () => {
    return signOut(auth).then(() => {
        router.push('/');
    });
  };

  const sendPasswordReset = (email: string) => {
    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: true,
    };
    return sendPasswordResetEmail(auth, email, actionCodeSettings);
  };

  return (
    <AuthContext.Provider value={{ firebaseUser, appUser, loading, registerUser, loginUser, logoutUser, sendPasswordReset, setAppUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
