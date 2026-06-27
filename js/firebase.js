// ===========================================================
// MEDINI WELFARE SOCIETY — firebase.js
//
// SETUP REQUIRED before this works — see README.md "Admin / Login setup"
// section for full step-by-step instructions. Summary:
//   1. Create a free Firebase project at console.firebase.google.com
//   2. Enable Authentication → Sign-in method → Email/Password
//   3. Add yourself as a user under Authentication → Users
//   4. Create a Firestore database (production mode)
//   5. Paste your project's config values into firebaseConfig below
// ===========================================================

const firebaseConfig = {
  apiKey: "AIzaSyDr7VN2yWs7t5YJTiRLcd71IuBwV_nZDAY",
  authDomain: "medini-welfare.firebaseapp.com",
  projectId: "medini-welfare",
  storageBucket: "medini-welfare.firebasestorage.app",
  messagingSenderId: "991915166748",
  appId: "1:991915166748:web:8014f9f6faf6142921a3d9"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ---------- AUTH HELPERS ----------

function adminLogin(email, password){
  return auth.signInWithEmailAndPassword(email, password);
}

function adminLogout(){
  return auth.signOut();
}

function onAdminAuthChange(callback){
  return auth.onAuthStateChanged(callback);
}

// ---------- BLOG POST HELPERS (Firestore) ----------
// Posts live in a Firestore collection called "posts".
// Each document: { title, slug, author, category, image, excerpt, body, date }

async function fetchPostsFromDB(){
  const snap = await db.collection('posts').orderBy('date', 'desc').get();
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function fetchPostBySlugFromDB(slug){
  const snap = await db.collection('posts').where('slug', '==', slug).limit(1).get();
  if(snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
}

async function savePostToDB(post, existingId){
  if(existingId){
    await db.collection('posts').doc(existingId).set(post, { merge: true });
    return existingId;
  } else {
    const ref = await db.collection('posts').add(post);
    return ref.id;
  }
}

async function deletePostFromDB(id){
  await db.collection('posts').doc(id).delete();
}
