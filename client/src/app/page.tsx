'use client'

import { OceanTheme } from "@/theme/ocean"
import { Theme } from "@/theme/Theme"
import React from "react"
import styled, { css, ThemeProvider } from "styled-components"

// DASHBOARD EXAMPLE: https://xd.adobe.com/ideas/wp-content/uploads/2020/10/7-Tips-for-Dashboard-UX-UI-3.jpg

export default function Home() {
  const [theme, setTheme] = React.useState<Theme>(OceanTheme)

  return (
    <ThemeProvider theme={theme}>
      <Container>
        
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.main`
  ${({ theme }) => css`
    width: 100vw;
    height: 100vh;
    overflow: auto;

    background-color: ${theme.bgColor};
    color: ${theme.labelColor};

    * {
      color: ${theme.labelColor};
    }
  `}
`
