import { User } from 'types/user'

export interface RankingItem {
    id: number
    name: string
    rank: number
    score: number
}

export interface Ranking {
    id: number
    title: string
    user: User
    createdAt: string
    rankingItems: RankingItem[]
}
