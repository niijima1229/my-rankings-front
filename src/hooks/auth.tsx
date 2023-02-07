import axios from 'axios'
import Config from 'config'

function useAuth(): boolean {
    const result = refresh()
    console.log(result)
    return false
}

async function refresh(): Promise<boolean> {
    const url = Config.apiLoginUrl + '/refresh'
    const token = localStorage.getItem('token') ?? ''
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    try {
        const response = await axios.post(url, {}, { headers })
        localStorage.setItem('token', response.data.authorization.token)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export default useAuth
