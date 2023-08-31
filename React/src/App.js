import { Component } from 'react';
import 'reset-css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from '~/routes/AppRoutes.js';
class App extends Component {
    render() {
        return (
            <div>
                <AppRoutes />

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    style={{ width: 'fit-content', textAlign: 'center' }}
                />
            </div>
        );
    }
}

export default App;
