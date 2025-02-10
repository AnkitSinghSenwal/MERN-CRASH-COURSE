// import { baseTheme } from '@chakra-ui/theme'
// import { Provider} from '@chakra-ui/react/provider'
// import './App.css'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'

function App() {

  return (
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}> 
        <Navbar /> {/* Navbar */}
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/create' element={<CreatePage/>} />
        </Routes>
      </Box>
  )
}

export default App
