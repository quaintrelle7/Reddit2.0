// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"
import "@fontsource/open-sans"
import { Button } from "./button"

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3c00",
      // ...
      900: "#1a202c",
    },
  },

  fonts:{
    body:"Open Sans, sans-serif"
  },

  styles:{
    global: ()=>({
      body:{
        bg:"gray.200"
      },
    }),
  },

  components:{
    Button
  }
})

