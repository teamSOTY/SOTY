// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyNAU6KpV9NjN6KqGWcT7XTSOk8eQRoGg",
  authDomain: "team-soty.firebaseapp.com",
  projectId: "team-soty",
  storageBucket: "team-soty.firebasestorage.app",
  messagingSenderId: "440316961595",
  appId: "1:440316961595:web:8f49073e00389626190d1e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
