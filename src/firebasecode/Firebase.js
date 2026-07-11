import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-project-2e24c.firebaseapp.com",
  projectId: "react-project-2e24c",
  storageBucket: "react-project-2e24c.firebasestorage.app",
  messagingSenderId: "159893641433",
  appId: "1:159893641433:web:2056e34713e1b2af7b46c8"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

// ---- AUTH ----
export const loginAdmin = async (email, password) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const signupAdmin = async (email, password) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const handleLogout = async () => {
  await signOut(auth);
};

export { auth, onAuthStateChanged };

// ---- ASSETS ----
export const addAsset = async (assetData) => {
  const docRef = await addDoc(collection(db, "assets"), {
    ...assetData,
    status: "Operational",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getAllAssets = async () => {
  const snapshot = await getDocs(collection(db, "assets"));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getAssetById = async (id) => {
  const docSnap = await getDoc(doc(db, "assets", id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
};

export const updateAssetStatus = async (id, status) => {
  await updateDoc(doc(db, "assets", id), { status });
};

// ---- ISSUES ----
export const addIssue = async (issueData) => {
  const docRef = await addDoc(collection(db, "issues"), {
    ...issueData,
    status: "Reported",
    createdAt: serverTimestamp(),
  });
  await updateAssetStatus(issueData.assetId, "Issue Reported");
  return docRef.id;
};

export const getIssuesByAsset = async (assetId) => {
  const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((issue) => issue.assetId === assetId);
};

export const getAllIssues = async () => {
  const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateIssueStatus = async (issueId, status, assetId) => {
  await updateDoc(doc(db, "issues", issueId), { status });

  const statusMap = {
    "Inspection Started": "Under Inspection",
    "Maintenance In Progress": "Under Maintenance",
    "Resolved": "Operational",
  };
  if (statusMap[status] && assetId) {
    await updateAssetStatus(assetId, statusMap[status]);
  }
};