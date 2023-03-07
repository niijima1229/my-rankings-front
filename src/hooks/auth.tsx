import axios from 'axios'
import Config from 'config'

async function useAuth(): Promise<boolean> {
    const url = Config.apiLoginUrl + '/is-auth'
    const token = localStorage.getItem('token') ?? ''
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    try {
        await axios.post(url, {}, { headers })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export default useAuth
