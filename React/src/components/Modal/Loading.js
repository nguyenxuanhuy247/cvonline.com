import { PureComponent } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

class Modal extends PureComponent {
    render() {
        const { className } = this.props;

        return (
            <div
                className={className}
                style={{
                    inset: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress color="success" />
            </div>
        );
    }
}

export default Modal;
