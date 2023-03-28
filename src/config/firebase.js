import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyCjRjZZ-vvTjB4EBmzoO_jfm45hXDnon-8',
   authDomain: 'test-9b9af.firebaseapp.com',
   projectId: 'test-9b9af',
   storageBucket: 'test-9b9af.appspot.com',
   messagingSenderId: '824890236682',
   appId: '1:824890236682:web:a9714adf79d573114c24f3',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
