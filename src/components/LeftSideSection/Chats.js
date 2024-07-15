import React, { useState, useRef, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux'
import { fetchChats } from '../../store/logic/chats/ChatsSlice';

const useStyles = makeStyles((theme) => ({
    tabsContainer: {
        // '& .MuiTab-textColorPrimary': {
        //   color: 'red', // change the tab text color
        // },
        borderBottom: '3px solid lightgray',
        position: 'sticky',
        top: 0,
        backgroundColor: theme.palette.background.paper,
        zIndex: theme.zIndex.appBar,
        minHeight: 'unset',
        height: '42px',
        '& .MuiTab-root': {
            textTransform: 'none'
        },
        '& .MuiTab-root.Mui-selected': {
            // color: 'rgb(127, 12, 134)', // change the selected tab text color
            // backgroundColor: 'rgb(232, 232, 232)',
            // borderTopLeftRadius: '10px',
            // borderTopRightRadius: '10px',
            '&:hover': {
                backgroundColor: 'rgb(232, 232, 232)',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px'
            }
        },
        '& .MuiTabs-indicator': {
            // backgroundColor: 'rgb(127, 12, 134)', // change the indicator color
            height: '4px'
        },
        '& .MuiTab-root:not(.Mui-selected)': {
            '&:hover': {
                backgroundColor: 'rgb(232, 232, 232)',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px'
            }
        }
    }
}))

function Chats(props) {
    const gridRef = useRef(null)
    const dispatch = useDispatch()
    const { loading, error, success, chats, pageNumber, lastPageNumber } = useSelector((state) => state.chats)
    const classes = useStyles()
    const [value, setValue] = useState(0);
    const tabs = ['All', 'Equities', 'Insider Trades']
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function handleScroll(e) {
        const div = e.target
        if (div.scrollTop >= (div.scrollHeight - div.clientHeight)) {
            if (pageNumber < lastPageNumber) {
                dispatch(fetchChats({ pageNumber: pageNumber + 1 }))
                console.log('reached to the bottom portion')
            }
        }
    }

    useEffect(() => {
        dispatch(fetchChats({ pageNumber: 1 }))
    }, [])
    return (
        <Grid style={{ height: 'calc(100% - 3.5rem)', display: 'flex', flexDirection: 'column' }} >
            <Tabs
                value={value}
                onChange={handleChange}
                // indicatorColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                // textColor="secondary"
                aria-label="secondary tabs example"
                className={classes.tabsContainer}
            >
                {
                    tabs.map((tab, index) => (
                        <Tab
                            label={tab}
                            key={index}
                            className={classes.customTab}
                            disableFocusRipple={true}
                            disableRipple={true}
                        />
                    ))
                }
            </Tabs>

            <Grid style={{ width: '100%', height: 'inherit', display: 'flex', flexDirection: 'column' }}>
                <Grid style={{ overflowY: 'auto', padding: '5px' }} ref={gridRef} onScroll={(event) => handleScroll(event)}>
                    {
                        chats?.map((chat, index) => (
                            <Grid style={{ height: '72px', width: '100%', marginBottom: '5px' }} key={chat.id}>
                                <Chat chat={chat} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Chats