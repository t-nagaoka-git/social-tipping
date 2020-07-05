import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCXFyD814y43adY79r5_AwqLbWVrJvFyZo',
  authDomain: 'mysocialtippingproject.firebaseapp.com',
  databaseURL: 'https://mysocialtippingproject.firebaseio.com',
  projectId: 'mysocialtippingproject',
  storageBucket: 'mysocialtippingproject.appspot.com',
  messagingSenderId: '867786685702',
  appId: '1:867786685702:web:8215ac995fc80e4703f287',
  measurementId: 'G-4L64J2SQ5J',
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
