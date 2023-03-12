import { db, auth, signInWithGoogle, signOut } from '../lib/firebaseConfig';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Image from 'next/image';
import HistoryChart from './components/HistoryChart';

export interface IDate {
  seconds: number;
  nanoseconds: number;
}

export interface IItem {
  day: Date;
  created: IDate;
  id: string;
  label: string;
  count: number;
  lastUpdate: IDate;
}

export default function Home() {
  const [items, setItems] = useState<IItem[] | undefined>(undefined);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    const q = query(
      collection(db, 'items'),
      where('day', '==', new Date(new Date().toDateString())),
      where('author_uid', '==', auth.currentUser.uid),
      orderBy('lastUpdate', 'desc')
    );

    onSnapshot(
      q,
      (snapshot) => {
        setItems(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          }) as IItem[]
        );
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {};
  }, [auth.currentUser]);

  return (
    <>
      <Header user={user} signIn={signInWithGoogle} signOut={signOut} />
      {auth.currentUser ? (
        <HistoryChart />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-1/2 flex items-center justify-center">
            <Image
              className="cursor-pointer"
              src="/btn_google_signin_dark_normal_web.png"
              alt="me"
              width="191"
              height="46"
              onClick={signInWithGoogle}
            />
          </div>
        </div>
      )}
    </>
  );
}
