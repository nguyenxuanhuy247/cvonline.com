import { Component } from 'react';
import 'reset-css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from '~/routes/AppRoutes.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCBMhTjamDINNFc9_qoPDPWEoJ5KiRzfVE',
    authDomain: 'cvonline-f7b5f.firebaseapp.com',
    projectId: 'cvonline-f7b5f',
    storageBucket: 'cvonline-f7b5f.appspot.com',
    messagingSenderId: '53801283021',
    appId: '1:53801283021:web:07315c8ffb8a62c635a884',
    measurementId: 'G-C8FK4649PN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
class App extends Component {
    render() {
        return (
            <div>
                <AppRoutes />

                <ToastContainer
                    position="top-right"
                    autoClose={3500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    style={{
                        width: 'fit-content',
                        minWidth: '300px',
                        margin: 0,
                        textAlign: 'center',
                    }}
                />
            </div>
        );
    }
}

export default App;
