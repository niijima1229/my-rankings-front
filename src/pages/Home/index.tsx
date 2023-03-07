import { FC, useState, useEffect } from 'react'
import axios from 'axios'
import Config from 'config'
import { Ranking } from 'types/ranking'
import Rankings from 'components/Rankings'

const Home: FC = () => {
    const [rankings, setRankings] = useState<Ranking[]>([])

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

    return <Rankings rankings={rankings} />
}
export default Home
