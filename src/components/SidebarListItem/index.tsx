import { FC } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

interface Props {
    text: string
    icon: JSX.Element
    link: string
}

const SidebarListItem: FC<Props> = ({ text, icon, link }) => {
    return (
        <a href={link}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        </a>
    )
}

export default SidebarListItem
