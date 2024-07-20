import { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import AddNewPopover from './AddNewPopover';

const useStyles = makeStyles((theme) => ({
    button: {
        height: '50px',
        width: '50px',
        backgroundColor: 'rgb(51,144,236)',
        borderRadius: '50%',
        cursor: 'pointer',
        minWidth: 'unset',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: 'rgb(51,144,236)',
            color: 'white'
        }
    },
    iconWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
    },
    iconHidden: {
        opacity: 0
    },
    iconVisible: {
        opacity: 1,
        transform: 'rotate(0deg)',
    }
}));

function AddNew({ isEdit, handleClick }) {
    const classes = useStyles()
    const [openAddNewPopover, setOpenAddNewPopover] = useState(false)

    return (
        <>
            <Button className={classes.button} onClick={() => { setOpenAddNewPopover(true); handleClick() }}>
                <div className={classes.iconWrapper}>
                    <MdEdit fontSize={'1.5rem'} className={`${classes.icon} ${isEdit ? classes.iconVisible : classes.iconHidden}`} />
                    <IoClose fontSize={'1.5rem'} className={`${classes.icon} ${isEdit ? classes.iconHidden : classes.iconVisible}`} />
                </div>
            </Button>
            <AddNewPopover open={openAddNewPopover} onClose={() => { setOpenAddNewPopover(false); handleClick() }} />
        </>
    );
}

export default AddNew;
