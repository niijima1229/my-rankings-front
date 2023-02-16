import Crown from 'components/Crown'
import { FC } from 'react'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import { red, grey } from '@mui/material/colors'
import dayjs from 'dayjs'
import { Ranking } from 'types/ranking'

const RankingCard: FC<Ranking> = ({ title, user, createdAt, rankingItems }) => {
    function userInitial(name: string): string {
        return name.charAt(0)
    }
    return (
        <Card
            sx={{
                width: '100%',
                borderRadius: '0',
                px: { lg: '50px' },
            }}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {userInitial(user.name)}
                    </Avatar>
                }
                title={title}
                subheader={dayjs(createdAt).format('MMMM d, YYYY')}
            />
            <CardContent sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    {rankingItems.map((item) => (
                        <Box key={item.id} sx={{ position: 'relative' }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                }}
                            >
                                <Crown rank={item.rank} />
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <Paper
                                    variant="outlined"
                                    sx={{ textAlign: 'center', pl: '30px' }}
                                >
                                    <Typography
                                        color={grey[900]}
                                        variant="body2"
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        {item.name}
                                    </Typography>
                                </Paper>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default RankingCard
