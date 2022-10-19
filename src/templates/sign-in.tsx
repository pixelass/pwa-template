import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import CenterBox from "@/molecules/box/center";

export default function Template() {
	const { t } = useTranslation(["common", "form", "errors", "auth"]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { query } = useRouter();
	const onSubmit = data => {
		void signIn("credentials", data);
	};
	return (
		<CenterBox>
			<Stack
				component="form"
				spacing={2}
				sx={{ width: "100%" }}
				onSubmit={handleSubmit(onSubmit)}
			>
				{query.error && <Typography>{t(`auth:signIn.errors.${query.error}`)}</Typography>}
				<Typography variant="h3" component="h1">
					{t("auth:signIn.headline")}
				</Typography>
				<TextField
					label={t("forms:username")}
					type="text"
					error={Boolean(errors.username)}
					helperText={errors.username?.message as string}
					{...register("username", { required: t("errors:fieldRequired") })}
				/>
				<TextField
					label={t("forms:password")}
					type="password"
					error={Boolean(errors.password)}
					helperText={errors.password?.message as string}
					{...register("password", { required: t("errors:fieldRequired") })}
				/>
				<Button type="submit" variant="contained" size="large">
					{t("common:signIn")}
				</Button>
			</Stack>
		</CenterBox>
	);
}
