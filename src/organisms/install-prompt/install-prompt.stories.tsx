import { useEffect } from "react";

import InstallPrompt from ".";

import { useStore } from "@/ions/store";

function Template({ open }) {
	useEffect(() => {
		useStore.getState().set({ installPromptOpen: open });
	}, [open]);
	return <InstallPrompt />;
}
export const Default = Template.bind({});

Default.args = {
	open: true,
};

Default.parameters = {};

const story = {
	title: "Organisms / InstallPrompt",
	component: InstallPrompt,
};

export default story;
