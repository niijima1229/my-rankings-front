interface _Config {
    apiUrl: string
    apiLoginUrl: string
}

const Config: _Config = {
    apiUrl: process.env.REACT_APP_API_URL ?? '',
    apiLoginUrl: process.env.REACT_APP_API_LOGIN_URL ?? '',
}

export default Config
