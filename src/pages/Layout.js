import { useRef } from 'react';
import { makeStyles, Grid } from '@material-ui/core'
import LeftSideChatsSection from '../components/LeftSideSection/LeftSideChatsSection';
import RightSideMessagesSection from '../components/RightSection/RightSideMessagesSection';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-start',
        overflow: 'hidden'
    },
    resizable: {
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid lightgray',
        width: '24rem', /* Initial width */
        minWidth: '15rem', /* Minimum width */
        maxWidth: '35rem', /* Maximum width */
        resize: 'horizontal',
        overflow: 'auto',
        position: 'relative',
        [theme.breakpoints.down(767)]:{
            width: '100vw',
            overflow: 'hidden'
        }
    },
    resizer: {
        width: '5px',
        cursor: 'ew-resize',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent' /* Change this for better visibility */
    },
    rightSide: {
        height: '100%',
        flex: 1, /* Flex-grow to take the remaining space */
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down(767)]:{
            display: 'none',
        }
    }
}))

function Layout() {
    const classes = useStyles()
    const leftSideRef = useRef();

    const onMouseDown = (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        const newWidth = e.clientX;
        if (newWidth > 240 && newWidth < 560) { // Enforce min and max width
            leftSideRef.current.style.width = `${newWidth}px`;
        }
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    return (
        <Grid className={classes.container}>
            <Grid className={classes.resizable} ref={leftSideRef}>
                <LeftSideChatsSection />
                <Grid className={classes.resizer} onMouseDown={onMouseDown}></Grid>
            </Grid>
            <Grid className={classes.rightSide}>
                <RightSideMessagesSection />
            </Grid>
        </Grid>
    );
}

export default Layout;