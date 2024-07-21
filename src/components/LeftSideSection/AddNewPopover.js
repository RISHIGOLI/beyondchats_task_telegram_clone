import { Grid, makeStyles } from '@material-ui/core'
import Popover from '@mui/material/Popover'
import { CiUser } from "react-icons/ci";
import { FiPlayCircle } from "react-icons/fi";
import { RiSettings3Line } from "react-icons/ri";
import { RxMoon } from "react-icons/rx";
import { MdAnimation } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";
import { GoBug } from "react-icons/go";
import { MdAddCircleOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
    popover: {
        top: 'unset !important',
        bottom: '-1.5rem !important',
        right: '1.5rem !important',
        left: 'unset !important',
        borderRadius: '10px !important',
        width: '225px !important',
        height: 'max-content !important',
        // opacity: '0.8 !important',
        background: 'rgb(255,255,255,0.533) !important',
        backdropFilter: 'blur(10px)',
        minWidth: '13.5rem !important',
        maxHeight: 'calc(100 * 6.41px - 3.75rem)',
        padding: '0.25rem 0',
        [theme.breakpoints.up(767)]:{
            right: 'unset !important',
            left: '8.5rem !important',
            bottom: '-2rem !important'
        }
    },
    popoverItem: {
        fontSize: '.875rem',
        margin: '.125rem .25rem',
        padding: '.25rem',
        paddingInlineEnd: '.75rem',
        borderRadius: '.375rem',
        paddingTop: '0.5rem',
        width: 'auto',
        fontWeight: 500,
        transform: 'scale(1)',
        transition: '.15s ease-in-out transform',
        display: 'flex',
        justifyContent: 'flex-start',
        '&:hover': {
            background: 'rgb(0,0,0,0.067)',
            cursor: 'pointer'
        }
    },
    itemIcon: {
        fontSize: '1.25rem', color: 'rgb(112,117,121)', fontWeight: '900'
    }
}))

function AddNewPopover({ open, onClose }) {
    const classes = useStyles()
    const items = Array(12).fill(1)
    const popoverItems = [
        {
            icon: <FaRegUser className={classes.itemIcon} />,
            title: 'New Channel'
        },
        {
            icon: <FiPlayCircle className={classes.itemIcon} />,
            title: 'New Group'
        },
        {
            icon: <RiSettings3Line className={classes.itemIcon} />,
            title: 'New Message'
        }
    ]
    return (
        <Popover
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            style={{ bottom: '6rem' }}
            classes={{ paper: classes.popover }}
        >
            <Grid style={{ display: 'flex', flexDirection: 'column' }}>
                {
                    popoverItems.map((item, index) => (
                        <Grid
                            className={classes.popoverItem}
                            key={index}
                        >
                            <Grid style={{
                                maxWidth: '1.25rem',
                                marginInline: '.5rem 1.25rem'
                            }}>
                                {item.icon}
                            </Grid>
                            <Grid >
                                {item.title}
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        </Popover >
    )
}

export default AddNewPopover