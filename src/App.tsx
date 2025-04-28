import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Tools } from './pages/Tools'

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#0a0a0a',
        color: '#00ff00'
      }
    }
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  }
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Tools />
    </ChakraProvider>
  )
}

export default App
