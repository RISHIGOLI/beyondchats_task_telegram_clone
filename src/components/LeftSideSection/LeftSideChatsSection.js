import { makeStyles, Grid, Box } from '@material-ui/core'
import { useEffect, useState } from 'react'
import AddNew from './AddNew'
import Chats from './Chats'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
    leftSideChatsSectionContainer: {
        height: '100%', width: 'auto', backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRight: '1px solid lightgray', position: 'relative',
        [theme.breakpoints.down(767)]: {
            width: '100vw'
        }
    },
    addNewContainer: {
        position: 'absolute',
        right: '0.5rem',
        bottom: '0.5rem',
        transform: 'translateY(100%)',
        display: 'none',
        opacity: 0,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
    },
    addNewContainerVisible: {
        transform: 'translateY(0)',
        opacity: 1,
        display: 'block'
    }
}))

function LeftSideChatsSection() {
    const classes = useStyles()
    const [chats, setChats] = useState([])
    const [showAddNew, setShowAddNew] = useState(false)
    const [isEdit, setIsEdit] = useState(true)

    function handleClick() {
        setIsEdit(!isEdit);
    }

    return (
        <Grid className={classes.leftSideChatsSectionContainer} onMouseEnter={() => setShowAddNew(true)} onMouseLeave={() => { setShowAddNew(false); setIsEdit(true) }}>
            <Header />
            <Chats />
            <Grid className={`${classes.addNewContainer} ${showAddNew ? classes.addNewContainerVisible : ''}`}>
                <AddNew isEdit={isEdit} handleClick={handleClick} />
            </Grid>
        </Grid>
    )
}

export default LeftSideChatsSection