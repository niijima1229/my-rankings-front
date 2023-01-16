import { FC, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import GavelIcon from '@mui/icons-material/Gavel'
import Logo from 'components/Logo'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SidebarListItem from 'components/SidebarListItem'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'

const drawerWidth = 240

const App: FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle: any = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawerMenuItems = [
        {
            text: 'ホーム',
            icon: <HomeIcon />,
        },
        {
            text: '審査',
            icon: <GavelIcon />,
        },
        {
            text: 'ランキング管理',
            icon: <LeaderboardIcon />,
        },
        {
            text: 'プロフィール',
            icon: <AccountCircleIcon />,
        },
    ]

    const drawer = (
        <>
            <Toolbar>
                <Logo />
            </Toolbar>
            <Divider />
            <List>
                {drawerMenuItems.map((item, index) => (
                    <SidebarListItem
                        key={item.text}
                        text={item.text}
                        icon={item.icon}
                    ></SidebarListItem>
                ))}
            </List>
        </>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                color="inherit"
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { sm: 'none' },
                        }}
                    >
                        <Logo />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        My Rankings
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                    </Routes>
                </Router>
            </Box>
        </Box>
    )
}
export default App