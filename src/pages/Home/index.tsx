import { FC, useState, useEffect } from 'react'
import axios from 'axios'
import Config from 'config'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import { red, grey } from '@mui/material/colors'
import Crown from 'components/Crown'
import dayjs from 'dayjs'

interface User {
    id: number
    name: string
}

interface RankingItem {
    id: number
    name: string
    rank: number
    score: number
}

interface Ranking {
    id: number
    title: string
    user: User
    createdAt: string
    rankingItems: RankingItem[]
}

const Home: FC = () => {
    const [rankings, setRankings] = useState<Ranking[]>([])

    function userInitial(name: string): string {
        return name.charAt(0)
    }

    useEffect(() => {
        const getRankings: any = async () => {
            const url = Config.apiUrl + '/rankings'
            await axios
                .get(url)
                .then((response) => {
                    setRankings(response.data)
                })
                .catch(() => {
                    console.log('エラーです！')
                })
        }
        getRankings()
    }, [])

    return (
        <Grid
            container
            alignItems="left"
            justifyContent="center"
            direction="column"
        >
            {rankings.map((ranking) => (
                <Grid item key={ranking.id} sx={{ mb: 2 }}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ bgcolor: red[500] }}
                                    aria-label="recipe"
                                >
                                    {userInitial(ranking.user.name)}
                                </Avatar>
                            }
                            title={ranking.title}
                            subheader={dayjs(ranking.createdAt).format(
                                'MMMM d, YYYY',
                            )}
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <Stack spacing={1}>
                                {ranking.rankingItems.map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{ position: 'relative' }}
                                    >
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
                                                sx={{ textAlign: 'center' }}
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
                </Grid>
            ))}
        </Grid>
    )
}
export default Home
