"use client";

import { CloudsTheme } from "@/theme/clouds";
import React from "react";
import styled, { css, ThemeContext } from "styled-components";

// DASHBOARD EXAMPLE: https://xd.adobe.com/ideas/wp-content/uploads/2020/10/7-Tips-for-Dashboard-UX-UI-3.jpg

export default function Home() {
  const theme = React.useContext(ThemeContext)

	return (
		<Container>
			{theme.name}
      <button onClick={() => theme.set(CloudsTheme)}>asdassadsadas</button>
		</Container>
	);
}

const Container = styled.main`
	${({ theme }) => css``}
`;
