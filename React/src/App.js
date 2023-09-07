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
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    style={{ width: 'fit-content', minWidth: '300px', textAlign: 'center' }}
                />
            </div>
        );
    }
}

export default App;
