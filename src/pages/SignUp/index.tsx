import { ErrorMessage } from '@hookform/error-message'
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Link,
} from '@mui/material'
import axios from 'axios'
import Config from 'config'
import { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Logo from 'components/Logo'
import { deepOrange } from '@mui/material/colors'

interface FormInputs {
    name: string
    email: string
    password: string
    apiError: string
}

const SignUp: FC = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormInputs>()
    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        const url = Config.apiLoginUrl + '/register'
        axios
            .post(url, {
                name: data.name,
                email: data.email,
                password: data.password,
            })
            .then((response) => {
                localStorage.setItem('token', response.data.authorization.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                navigate('/')
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setError('apiError', {
                        type: 'auth',
                        message: '入力形式に誤りがあります',
                    })
                } else {
                    setError('apiError', {
                        type: 'auth',
                        message: '予期せぬエラーが発生しました',
                    })
                }
            })
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: deepOrange[500] }}>
                    <Logo />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <ErrorMessage
                        errors={errors}
                        name="apiError"
                        render={({ message }) => (
                            <Typography sx={{ color: 'red' }}>
                                {message}
                            </Typography>
                        )}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="ユーザー名"
                        type="name"
                        id="name"
                        autoFocus
                        autoComplete="current-name"
                        {...register('name', {
                            required: '必須項目です',
                        })}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="メールアドレス"
                        autoComplete="email"
                        error={errors.email != null}
                        helperText={errors.email?.message}
                        {...register('email', {
                            required: '必須項目です',
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message:
                                    'メールアドレスの入力形式が正しくありません。',
                            },
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="パスワード"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register('password', {
                            required: '必須項目です',
                            min: {
                                value: 6,
                                message: 'パスワードは６文字以上です',
                            },
                        })}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Box>
                        <Link href="/login" variant="body2">
                            {'If you already have an account. Sign In'}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default SignUp
