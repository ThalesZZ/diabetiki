import { OceanTheme } from '@/themes/ocean'
import React from 'react'
import styled, { css, ThemeContext, ThemeProvider } from 'styled-components'

// DASHBOARD EXAMPLE: https://xd.adobe.com/ideas/wp-content/uploads/2020/10/7-Tips-for-Dashboard-UX-UI-3.jpg

export default function Home() {
  const [theme, setTheme] = React.useState(OceanTheme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme}>
        <Container>
        </Container>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

const Container = styled.main`
  ${({ theme }) => css`
  width: 100vw;
  height: 100vh;
      background-color: ${theme.bgColor};
  `}
`