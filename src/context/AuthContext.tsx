'use client';

import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { onAuthStateChanged, User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
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
      try {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setAppUser(userSnap.data() as User);
          } else {
            // This case is for users that existed before firestore integration
            // or if doc creation failed during registration.
            const newUser: User = {
              id: user.uid,
              name: user.displayName || 'Nuevo Usuario',
              email: user.email!,
              role: 'Cliente',
              avatar: user.photoURL || `https://placehold.co/100x100.png`,
              objectives: 'Definir mis objetivos.'
            };
            await setDoc(userRef, newUser);
            setAppUser(newUser);
          }
        } else {
          setAppUser(null);
        }
      } catch (error) {
        console.error("Firebase Auth Error: Could not get user document.", error);
        // This is a critical error, likely due to Firestore rules.
        // We will sign the user out to prevent an inconsistent state.
        setAppUser(null);
        await signOut(auth);
      } finally {
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
      objectives: 'Definir mis objetivos.'
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
        router.push('/login');
    });
  };

  return (
    <AuthContext.Provider value={{ firebaseUser, appUser, loading, registerUser, loginUser, logoutUser, setAppUser }}>
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
