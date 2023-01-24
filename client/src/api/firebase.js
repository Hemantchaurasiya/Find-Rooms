import { initializeApp } from 'firebase/app';
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBT-I68lx39-mIVGmcx7WQUFKdeSv-F624",
  authDomain: "room-a4e51.firebaseapp.com",
  projectId: "room-a4e51",
  storageBucket: "room-a4e51.appspot.com",
  messagingSenderId: "360107602988",
  appId: "1:360107602988:web:b950c54c6c80d0730ccd89",
  measurementId: "G-Q4ZCBXMHLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var storage = getStorage(app);

export default storage;