import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment } from 'firebase/firestore'

// ✅ Firebase configuration (Make sure to use your actual Firebase keys)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_REACT_APP_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

// ✅ Initialize Firebase (Ensure it's only initialized once)
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const views = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { slug } = req.query;
  if (!slug) {
    return res.status(400).json({ error: 'Missing slug parameter' });
  }

  try {
    const viewsRef = doc(db, 'views', slug);
    const docSnap = await getDoc(viewsRef);

    if (docSnap.exists()) {
      await updateDoc(viewsRef, { count: increment(1) });
      res.status(200).json({ views: docSnap.data().count + 1 });
    } else {
      await setDoc(viewsRef, { count: 1 });
      res.status(200).json({ views: 1 });
    }
  } catch (error) {
    console.error('Firestore error:', error);

    if (error.code === 'unavailable') {
      return res.status(503).json({ error: 'Firestore is temporarily unavailable. Please try again.' });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export default views