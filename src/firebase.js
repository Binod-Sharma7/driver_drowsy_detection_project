
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDhS06ZsH1U2EeCH20ofxRDeyVpegVvJ54",
  authDomain: "esp32-80300.firebaseapp.com",
  databaseURL: "https://esp32-80300-default-rtdb.firebaseio.com",
  projectId: "esp32-80300",
  storageBucket: "esp32-80300.firebasestorage.app",
  messagingSenderId: "942016972843",
  appId: "1:942016972843:web:bec7b8708994332485026e"
};

export const app = initializeApp(firebaseConfig);
