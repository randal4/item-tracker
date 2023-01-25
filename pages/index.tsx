import { db, auth, signInWithGoogle, signOut } from '../config/firebaseConfig';
import {
  doc,
  collection,
  addDoc,
  limit,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  where,
  updateDoc,
  increment,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ItemButton from './components/ItemButton';
import ItemsTable from './components/ItemsTable';
import ItemLast from './components/ItemLast';
import ItemsTotal from './components/ItemsTotal';
import Header from './components/Header';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import HistoryChart from './components/HistoryChart';
import AddItemModal from './components/AddItemModal';
import { updateCurrentUser } from 'firebase/auth';

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

export interface IItemType {
  label: string;
}

export interface IUserDetails {
  id: string;
  authProvider: string;
  email: string;
  itemTypes: string[];
  lastLogin: Date;
  name: string;
  uid;
  string;
}

export default function Home() {
  const [items, setItems] = useState<IItem[] | undefined>(undefined);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState<IUserDetails | undefined>(
    undefined
  );
  const [showAddItemType, setShowAddItemType] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    getUserDetails();

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

  const getUserDetails = () => {
    console.log('uid:', auth.currentUser.uid);
    const userDocRef = doc(db, 'users', auth.currentUser.uid);

    onSnapshot(userDocRef, (userDocSnap) => {
      if (userDocSnap.exists()) {
        console.log('userDetails:', userDocSnap.data());
        setUserDetails({
          ...userDocSnap.data(),
        } as IUserDetails);
      }
    });
  };

  const addData = async (itemLabel: string) => {
    try {
      const q = query(
        collection(db, 'items'),
        where('day', '==', new Date(new Date().toDateString())),
        where('label', '==', itemLabel),
        where('author_uid', '==', auth.currentUser.uid),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        console.log(`found querySnapshot`);
        const docRef = querySnapshot.docs[0].ref;
        console.log(`updating querySnapshot ${querySnapshot.docs[0].id}`);
        await updateDoc(docRef, {
          count: increment(1),
          lastUpdate: serverTimestamp(),
        });
      } else {
        console.log(`did not find querySnapshot, adding new`);
        const docNewRef = await addDoc(collection(db, 'items'), {
          created: serverTimestamp(),
          day: new Date(new Date().toDateString()),
          label: itemLabel,
          count: 1,
          lastUpdate: serverTimestamp(),
          author_uid: auth.currentUser.uid,
        });

        console.log('Document written with ID: ', docNewRef.id);
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const addDataType = (itemType: IItemType) => {
    const userDocRef = doc(db, 'users', auth.currentUser.uid);

    setDoc(userDocRef, {
      ...userDetails,
      itemTypes: [...(userDetails.itemTypes || []), itemType.label],
    });

    setShowAddItemType(false);
  };

  return (
    <>
      <Header user={user} signIn={signInWithGoogle} signOut={signOut} />
      {auth.currentUser ? (
        <div className="flex flex-col items-center h-full mt-3">
          <ItemLast lastItem={items ? items[0] : null} />
          <hr className="my-2 mx-auto w-5/6 h-1 bg-gray-100 rounded border-0 md:my-10" />

          <div className="flex flex-wrap justify-center">
            {userDetails?.itemTypes?.map((itemType) => {
              return (
                <ItemButton key={itemType} addData={addData} label={itemType} />
              );
            })}
            <ItemButton addData={() => setShowAddItemType(true)} label="+" />
          </div>
          <hr className="my-4 mx-auto w-5/6 h-1 bg-gray-100 rounded border-0 md:my-10" />
          <div className="p-6  border-slate-200 border-solid border-2 flex flex-col items-center max-w-[300px] w-2/5">
            <div>Total</div>
            <div>{items ? <ItemsTotal items={items} /> : <></>}</div>
          </div>

          <hr className="my-4 mx-auto w-5/6 h-1 bg-gray-100 rounded border-0 md:my-10" />

          <div className="flex flex-grow flex-shrink-0 w-5/6">
            <ItemsTable items={items} />
          </div>
          {showAddItemType ? (
            <AddItemModal
              showModal={setShowAddItemType}
              addItemType={addDataType}
            />
          ) : (
            <></>
          )}
        </div>
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
      {/* <HistoryChart /> */}
    </>
  );
}
