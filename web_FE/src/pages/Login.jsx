/*eslint-disable*/
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import cat from '~/assets/cat.png'
import { useForm } from 'react-hook-form'
import { Alert } from '@mui/material'
import { API_ROOT } from '~/utils/constants'
import authorizedAxios from '~/utils/authorizedAxios'
import { useNavigate } from 'react-router-dom'

function LoginForm() {

  const { register, handleSubmit, formState: { errors }} = useForm()
  const Navigate = useNavigate()

  const submitLogIn = async (data) => {

    const res = await authorizedAxios.post(`${API_ROOT}/v1/users/login`, data)
    const userInfo = {
      id: res.data.id,
      email: res.data.email
    }
    // localStorage.setItem('refreshToken', res.data.refreshToken)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))

    Navigate('/dashboard')
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: 'url("src/assets/login-register-bg.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
    }}>
      <form onSubmit={handleSubmit(submitLogIn)}>
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <MuiCard sx={{ 
            minWidth: 380, maxWidth: 380, marginTop: '10em',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            backdropFilter: 'blur(8px)', // Làm mờ nền phía sau
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <Box sx={{
              margin: '2em 2em 0 2em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1
            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Login</Typography>
              <img src={cat} alt="Cat Gif" style={{ width: '30px', height: '40px' }} />


            </Box>
            <Box sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex'
            }}>
              <Typography variant="h6" sx={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.8em' }}>SonPham811@gmail.com / </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.8em' }}>SonPham8112005</Typography>
            </Box>
            <Box sx={{ padding: '0 1em 1em 1em' }}>
              <Box sx={{ marginTop: '1em' }}>
                <TextField
                  // autoComplete="nope"
                  autoFocus
                  fullWidth
                  label="Email..."
                  type="text"
                  variant="outlined"
                  error={!!errors['email']}
                  {...register('email', {
                    required: 'This field is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Invalid email address (example@abc.com)'
                    }
                  })}
                />
                { errors['email'] && 
                  <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>  
                    {errors['email']?.message}
                  </Alert>
                  }

              </Box>
              <Box sx={{ marginTop: '1em' }}>
                <TextField
                  fullWidth
                  label="Password..."
                  type="password"
                  variant="outlined"
                  error={!!errors['password']}
                  {...register('password', {
                    required: 'This field is required',
                  })}
                />
                {
                  errors['password'] && 
                  <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>  
                    {errors['password']?.message}
                  </Alert>
                }

              </Box>
            </Box>
            <CardActions sx={{ padding: '0 1em 1em 1em' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Login
              </Button>
            </CardActions>
          </MuiCard>
        </Zoom>
      </form>
    </Box>
  )
}

export default LoginForm
