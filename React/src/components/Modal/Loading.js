import { PureComponent } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

class Loading extends PureComponent {
    render() {
        return (
            <div
                style={{
                    ...this.props.styles,
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

export default Loading;
