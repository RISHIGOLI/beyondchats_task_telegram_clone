import { makeStyles, Grid, Box } from '@material-ui/core'
import ChatWindow from './ChatWindow'

const useStyles = makeStyles((theme) => ({
    rightSideMessagesSection: {
        width: 'calc(100% - 16rem)', height: '100%',
        [theme.breakpoints.down(767)]: {
            display: 'none'
        }
    }
}))

function RightSideMessagesSection() {
    const classes = useStyles()
    return (
        <Grid className={classes.rightSideMessagesSection}>
            <ChatWindow />
        </Grid>
    )
}

export default RightSideMessagesSection