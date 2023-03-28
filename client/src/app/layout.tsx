"use client";

import { OceanTheme } from "@/theme/ocean";
import { Theme } from "@/theme/Theme";
import React from "react";
import styled, { css, ThemeContext, ThemeProvider } from "styled-components";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [theme, setTheme] = React.useState<Theme>(OceanTheme);

	return (
		<html lang="en">
      <ThemeContext.Provider value={{current: theme, set: setTheme}}>
			<ThemeProvider theme={theme}>
				<Container>{children}</Container>
			</ThemeProvider>
      </ThemeContext.Provider>
		</html>
	);
}

const Container = styled.body`
	${({ theme }) => css`
		background-color: ${theme.bgColor};
		color: ${theme.labelColor};
		overflow: hidden;

		*,
		*::before,
		*::after {
			margin: 0;
			padding: 0;
			box-sizing: border-box;

			color: ${theme.labelColor};
		}
	`}
`;
