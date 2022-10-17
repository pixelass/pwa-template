import IconLink from "./";

import { navigation } from "@/ions/configs/navigation";

function Template() {
	return <IconLink link={navigation[0]} />;
}
export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};

const story = {
	title: "Molecules / IconLink",
	component: IconLink,
};

export default story;
