import { Player } from "@lottiefiles/react-lottie-player";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import CenterBox from "@/molecules/box/center";

export default function Page() {
	return (
		<CenterBox maxWidth={"100%"} maxHeight={"50%"}>
			<Box
				sx={{
					"&, .lf-player-container": {
						display: "contents",
					},
				}}
			>
				<Player
					autoplay
					loop
					style={{ height: "100%", width: "100%" }}
					src="https://assets10.lottiefiles.com/packages/lf20_uvgjmjf2.json"
				/>
			</Box>
			<Container>
				<Typography>
					Illustration by{" "}
					<MuiLink
						href="https://lottiefiles.com/katiedaw"
						target="_blank"
						rel="noreferrer,nofollow"
					>
						Katie Daw
					</MuiLink>
				</Typography>
				<Link legacyBehavior passHref href="/">
					<MuiLink>Home</MuiLink>
				</Link>
			</Container>
		</CenterBox>
	);
}
