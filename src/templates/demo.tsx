import { QueryKey } from "@/ions/constants/query-key";
import { useQueryState, useQueryStates } from "@/ions/hooks/query-state";
import { useStore } from "@/ions/store";
import { decodeJSON, encodeJSON } from "@/ions/utils/hash";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";

const Demo = () => {
	const { t } = useTranslation(["common"]);
	const modal = useStore(state => state.modal);
	const setModal = useStore(state => state.setModal);
	const [data, setData] = useQueryState(QueryKey.data, {
		parse: decodeJSON,
		serialize: encodeJSON,
		fallback: useMemo(
			() => ({
				greeting: "Hello",
				name: "World",
				random: 10,
			}),
			[]
		),
	});
	const [state, setState] = useQueryStates({ foo: "foo", bar: "bar", random: 11 });
	return (
		<Stack spacing={2}>
			<Card>
				<CardContent>
					<Typography variant="h1">{t("common:hello")} Progressive Webapp</Typography>
					<Typography variant="h1">
						{data.greeting} {data.name}
					</Typography>
					<Stack direction="row" spacing={2} my={2}>
						<Button
							variant="outlined"
							onClick={() => {
								void setData({
									greeting: "Hi",
									name: "Friend",
									random: Math.round(Math.random() * 100),
								});
							}}
						>
							{t("common:set-data")} 1
						</Button>
						<Button
							variant="outlined"
							onClick={() => {
								void setState({
									foo: "FOO",
									bar: "BAR",
									random: Math.round(Math.random() * 100),
								});
							}}
						>
							{t("common:set-data")} 2
						</Button>
						<Button
							color="secondary"
							variant="outlined"
							onClick={() => {
								setModal(true);
							}}
						>
							{t("common:open-dialog")}
						</Button>
					</Stack>
					<pre>
						<code>{JSON.stringify(data, null, 4)}</code>
					</pre>
					<pre>
						<code>{JSON.stringify(state, null, 4)}</code>
					</pre>
				</CardContent>
			</Card>
			<Dialog
				fullWidth
				open={modal}
				onClose={() => {
					setModal(false);
				}}
			>
				<DialogTitle>{t("common:dialog.title")}</DialogTitle>
				<DialogContent>
					<DialogContentText>{t("common:dialog.content")}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						color="inherit"
						onClick={() => {
							setModal(false);
						}}
					>
						{t("common:close")}
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
};

export default Demo;
