import { Avatar, Box, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { useGetInitial } from 'hooks/initial'
import { FC } from 'react'
import { User } from 'types/user'

const Profile: FC = () => {
    const user: User = JSON.parse(localStorage.getItem('user') ?? '')
    return (
        <Box
            sx={{
                width: { sm: '50%' },
                height: '100vh',
                backgroundColor: 'white',
                borderRight: 'solid 1px rgba(0, 0, 0, 0.12)',
                p: 4,
            }}
        >
            <Typography variant="h4" color="initial" sx={{ mb: 2 }}>
                プロフィール
            </Typography>
            <Avatar sx={{ bgcolor: red[500], mb: 2 }}>
                {useGetInitial(user.name)}
            </Avatar>
            <Typography variant="h6" color="initial">
                名前：{user.name}
            </Typography>
            <Typography variant="h6" color="initial">
                メールアドレス：{user.email}
            </Typography>
        </Box>
    )
}

export default Profile
