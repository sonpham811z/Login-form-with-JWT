import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { API_ROOT } from '~/utils/constants'
import gifCat from '~/assets/gifcat.gif'
import authorizedAxios from '~/utils/authorizedAxios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { handleLogOutAPI } from '~/apis'

function Dashboard() {
  const [user, setUser] = useState(null)
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await authorizedAxios.get(`${API_ROOT}/v1/dashboards/access`)

      setUser(res.data)
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const res = await authorizedAxios.get(`${API_ROOT}/v1/dashboards/access`)

      setUser(res.data)
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const res = await authorizedAxios.get(`${API_ROOT}/v1/dashboards/access`)

      setUser(res.data)
    }
    fetchData()
  }, [])

  const handleLogOut = async () => {
    await handleLogOutAPI()
    Navigate('/login')
  }


  if (!user) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      marginTop: '10em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 1em',
      width: '100%'

    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
        marginBottom: '2em'
      }}>
        <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
          User 
          <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}> {user?.email}</Typography>
          &nbsp; đã đăng nhập thành công vào Dashboard. 
        </Alert>
        <br />
        <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
          Now! Enjoy my web page
        </Alert>

      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15
      }}>
        <img src={gifCat} style={{ width: '30%' }} alt='Meow Meow'/>

        <Button onClick={handleLogOut}
          variant="contained"
          size='large'
          color = 'primary'
        >Log out</Button>
      </Box>

    </Box>
  )
}

export default Dashboard
