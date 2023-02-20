import { Grid } from '@mui/material'
import RankingCard from 'components/RankingCard'
import { FC } from 'react'
import { Ranking } from 'types/ranking'

interface Props {
    rankings: Ranking[]
}

const Rankings: FC<Props> = ({ rankings }) => {
    return (
        <Grid
            container
            alignItems="left"
            direction="column"
            sx={{
                width: { sm: '50%' },
                minHeight: '100vh',
                borderLeft: 'solid 1px rgba(0, 0, 0, 0.12)',
                borderRight: 'solid 1px rgba(0, 0, 0, 0.12)',
            }}
        >
            {rankings.map((ranking) => (
                <Grid item key={ranking.id}>
                    <RankingCard
                        id={ranking.id}
                        title={ranking.title}
                        user={ranking.user}
                        createdAt={ranking.createdAt}
                        rankingItems={ranking.rankingItems}
                    ></RankingCard>
                </Grid>
            ))}
        </Grid>
    )
}

export default Rankings
