export const styles = (theme) => ({
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: 300,
        background: '#333',
        [theme.breakpoints.up('sm')]: {
            height: 400,
        },
    },
    cropButton: {
        flexShrink: 0,
        marginLeft: 16,
    },
    controls: {
        padding: 16,
        alignItems: 'stretch',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    sliderContainer: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
    },
    sliderLabel: {
        display: 'inline-block',
        fontSize: '16px',
        minWidth: '80px',
    },
    slider: {
        padding: '22px 0px',
        marginLeft: 32,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: '0 16px',
        },
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '12px',
        columnGap: '20px',
    },
    button: {
        minWidth: '110px',
        fontSize: '1.6rem',
        padding: '10px 20px',
        borderRadius: '8px',
    },
    finish: {
        backgroundColor: 'var(--primary-color)',
    },
});
