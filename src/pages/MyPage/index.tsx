import axios from 'axios'
import Rankings from 'components/Rankings'
import Config from 'config'
import { FC, useEffect, useState } from 'react'
import { Ranking } from 'types/ranking'

const MyPage: FC = () => {
    const [rankings, setRankings] = useState<Ranking[]>([])

    useEffect(() => {
        const getRankings: any = async () => {
            const url = Config.apiUrl + '/my-rankings'
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
        <>
            <Rankings rankings={rankings} />
        </>
    )
}

export default MyPage
