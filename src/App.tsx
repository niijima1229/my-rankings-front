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
import Login from 'pages/Login'
import AuthGuard from 'providers/AuthGuard'
import Profile from 'pages/Profile'

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
            link: '/',
        },
        {
            text: '審査',
            icon: <GavelIcon />,
            link: '/judge',
        },
        {
            text: 'ランキング管理',
            icon: <LeaderboardIcon />,
            link: '/ranking-admin',
        },
        {
            text: 'プロフィール',
            icon: <AccountCircleIcon />,
            link: '/profile',
        },
    ]

    const drawer = (
        <Box sx={{ height: '100vh' }}>
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
                        link={item.link}
                    ></SidebarListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <AppBar
                color="inherit"
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    boxShadow: 'none',
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
                <Divider />
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
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/profile" element={<AuthGuard />}>
                            <Route
                                path="/profile"
                                element={<Profile />}
                            ></Route>
                        </Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </Router>
                <Divider orientation="vertical" flexItem></Divider>
            </Box>
        </Box>
    )
}
export default App
