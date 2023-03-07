import { FC } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const CircularIndeterminate: FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
                pt: 3,
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default CircularIndeterminate
