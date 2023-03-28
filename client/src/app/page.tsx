"use client";

import { Theme } from "@/theme/Theme";
import styled, { css, useTheme } from "styled-components";

// DASHBOARD EXAMPLE: https://xd.adobe.com/ideas/wp-content/uploads/2020/10/7-Tips-for-Dashboard-UX-UI-3.jpg

export default function Home() {
	const theme = useTheme() as Theme;

	return (
		<Container>
			{theme.name}
		</Container>
	);
}

const Container = styled.main`
	${({ theme }) => css``}
`;
