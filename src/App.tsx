import React, { FC, useEffect, useState } from 'react'
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
import MyPage from 'pages/MyPage'
import RankingAdmin from 'pages/RankingAdmin'
import SignUp from 'pages/SignUp'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    SpeedDial,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Config from 'config'
import useAuth from 'hooks/auth'

interface FormInputs {
    title: string
    rankingItem: string[]
}

const drawerWidth = 240

const App: FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        const fetchAuth: any = async () => {
            const response = await useAuth()
            setIsAuthenticated(response)
        }

        fetchAuth()
    }, [])
    const [mobileOpen, setMobileOpen] = useState(false)
    const [open, setOpen] = React.useState(false)

    const handleClickOpen: any = () => {
        setOpen(true)
    }

    const handleClose: any = () => {
        setOpen(false)
    }

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
            text: 'マイページ',
            icon: <AccountCircleIcon />,
            link: '/my-page',
        },
    ]

    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<FormInputs>({
        mode: 'onChange',
        defaultValues: {
            title: '',
            rankingItem: ['', '', ''],
        },
    })

    const onSubmit: any = (data: FormInputs) => {
        const url = Config.apiUrl + '/ranking/create'
        axios
            .post(url, {
                title: data.title,
                rankingItem: data.rankingItem,
            })
            .then(() => {
                window.location.href = '/'
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    alert('ユーザーが存在しません')
                } else if (error.response.status === 422) {
                    alert('入力形式に誤りがあります')
                } else {
                    alert('予期せぬエラーが発生しました')
                }
            })
        setIsFormSubmitted(true)
    }

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
                <Button
                    variant="contained"
                    sx={{
                        mx: 'auto',
                        display: isAuthenticated ? 'block' : 'none',
                        width: '80%',
                        borderRadius: 50,
                    }}
                    onClick={handleClickOpen}
                >
                    作成する
                </Button>
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
                        <Route path="/ranking-admin" element={<AuthGuard />}>
                            <Route
                                path="/ranking-admin"
                                element={<RankingAdmin />}
                            ></Route>
                        </Route>
                        <Route path="/my-page" element={<AuthGuard />}>
                            <Route path="/my-page" element={<MyPage />}></Route>
                        </Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/sign-up" element={<SignUp />}></Route>
                    </Routes>
                </Router>
                <Divider orientation="vertical" flexItem></Divider>
            </Box>

            <SpeedDial
                ariaLabel="display form"
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    display: isAuthenticated
                        ? { xs: 'block', sm: 'none' }
                        : 'none',
                }}
                onClick={handleClickOpen}
                icon={<EditIcon />}
            />
            <Dialog open={open} onClose={handleClose}>
                <form
                    action="post"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <DialogTitle>ランキング作成</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="タイトル"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register('title', { required: true })}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="rankingItem1"
                            label="１位"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register('rankingItem.0', { required: true })}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="rankingItem2"
                            label="２位"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register('rankingItem.1', { required: true })}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="rankingItem3"
                            label="３位"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register('rankingItem.2', { required: true })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>キャンセル</Button>
                        <Button
                            type="submit"
                            disabled={
                                isFormSubmitted || !isValid || !isAuthenticated
                            }
                        >
                            作成
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    )
}
export default App
