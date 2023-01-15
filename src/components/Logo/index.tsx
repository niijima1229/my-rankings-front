import { FC } from 'react'
import LogoImg from 'assets/logo.webp'

const Logo: FC = () => {
    return (
        <img
            style={{ width: '40px', height: '40px' }}
            src={LogoImg}
            alt="ロゴ"
        />
    )
}

export default Logo
