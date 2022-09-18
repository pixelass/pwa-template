import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";
import Head from "next/head";

export default function Template() {
	return (
		<>
			<Head>
				<title>PWA Template</title>
				<meta name="description" content="PWA template with Next.js and MUI" />
			</Head>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<Stack
					component="form"
					spacing={2}
					sx={{ width: 300 }}
					onSubmit={event => {
						event.preventDefault();
						const formData = new FormData(event.target as HTMLFormElement);
						const formObject: Record<string, string> = {};
						formData.forEach((value: string, key) => {
							formObject[key] = value;
						});

						void signIn("credentials", formObject);
					}}
				>
					<TextField required label="Username" type="text" name="username" />
					<TextField required label="Password" type="password" name="password" />
					<Button type="submit" variant="contained" size="large">
						Sign In
					</Button>
				</Stack>
			</Box>
		</>
	);
}
