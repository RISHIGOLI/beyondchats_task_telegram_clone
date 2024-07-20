import React, { useState, useRef, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux'
import { fetchChats } from '../../store/logic/chats/ChatsSlice';
import { fetchMessages } from '../../store/logic/messages/MessagesSlice';

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
    const [chatId, setChatId] = useState(null)
    const { loading, error, success, pageNumber, lastPageNumber } = useSelector((state) => state.chats)
    const classes = useStyles()
    const chat = {
        creator: {
            name: 'Nobel CHAT',
            phone: '12332235234'
        }
    }
    const chats = Array(20).fill(chat)
    const [value, setValue] = useState(0);
    const tabs = ['All', 'Equities', 'Insider Trades', 'All', 'Equities', 'Insider Trades', 'All', 'Equities', 'Insider Trades']
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

    function handleClick(chatId){
        setChatId(chatId)
        dispatch(fetchMessages({chatId: chatId}))
    }

    return (
        <Grid style={{ height: 'calc(100% - 3.5rem)', display: 'flex', flexDirection: 'column', width: '100%' }} >
            <Grid style={{width: '100%', overflowX: 'auto'}}>
            <Tabs
                value={value}
                onChange={handleChange}
                // indicatorColor="secondary"
                // variant="scrollable"
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
            </Grid>

            <Grid style={{ width: '100%', height: 'inherit', display: 'flex', flexDirection: 'column' }}>
                <Grid style={{ overflowY: 'auto', padding: '5px' }} ref={gridRef} onScroll={(event) => handleScroll(event)}>
                    {
                        chats?.map((chat, index) => (
                            <Grid style={{ height: '72px', width: '100%', marginBottom: '5px', backgroundColor: chatId === chat.id && 'rgb(51,144,236)', borderRadius: '1rem', color: chatId === chat.id && 'white' }} key={chat.id} onClick={() => handleClick(chat.id)}>
                                <Chat chat={chat} selected={chatId === chat.id}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Chats