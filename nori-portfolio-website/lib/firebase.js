import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, addDoc, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCItaFZa6qwA2_JWiFBHus5VVvqy_pbTcU",
    authDomain: "noti-portfolio.firebaseapp.com",
    projectId: "noti-portfolio",
    storageBucket: "noti-portfolio.appspot.com",
    messagingSenderId: "791807822860",
    appId: "1:791807822860:web:419c6ab60bce0ff0c1f229",
};


// Firebaseアプリを一度だけ初期化する
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);

//authの初期化確認
console.log("auth object initialized:", auth);  // Firebase Authオブジェクトが正しく初期化されているか確認


// Googleログイン
export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Logged in user:", user);
    } catch (error) {
        console.error("Error during login:", error);
    }
};
//ログアウト
export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User logged out ");
    } catch (error) {
        console.log("Error during logout:", error);
    }
};

// メタデータを保存する関数
export const saveMediaMetadata = async (mediaData) => {
    try {
        await addDoc(collection(db, "media"), mediaData);
        console.log("Media metadata saved successfully!");
    } catch (error) {
        console.error("Error saving media metadata:", error);
    }
};
// Firestoreからメディアデータを取得する関数
export const fetchMediaData = async (id) => {
    const mediaCollection = collection(db, "media");
    const mediaSnapshot = await getDocs(mediaCollection);
    const mediaList = mediaSnapshot.docs.map(doc => doc.data());
    return mediaList;
};


// Firestoreから特定のIDに基づいてメディアデータを取得する関数
export const fetchMediaDataById = async (id) => {
    const mediaDoc = doc(db, "media", id);  // Firestore内の特定のドキュメントを指定
    const mediaSnapshot = await getDoc(mediaDoc);

    if (mediaSnapshot.exists()) {
        return mediaSnapshot.data();  // ドキュメントデータを返す
    } else {
        console.error("No such document!");
        return null;
    }
};