import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { FC } from 'react'
import axios from 'axios'
import Config from 'config'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage } from '@hookform/error-message'

interface FormInputs {
    email: string
    password: string
    apiError: string
}

const Login: FC = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormInputs>()
    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        const url = Config.apiLoginUrl + '/login'
        axios
            .post(url, {
                email: data.email,
                password: data.password,
            })
            .then((response) => {
                localStorage.setItem('token', response.data.authorization.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                navigate('/')
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setError('apiError', {
                        type: 'auth',
                        message: '入力していただいたユーザーは存在しません',
                    })
                } else if (error.response.status === 422) {
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
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
                        fullWidth
                        id="email"
                        label="メールアドレス"
                        autoComplete="email"
                        error={errors.email != null}
                        helperText={errors.email?.message}
                        autoFocus
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
                    {/* ユーザーのログイン情報保存機能実装時に解除 */}
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        {/* パスワードリセット機能実装時に解除 */}
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login
