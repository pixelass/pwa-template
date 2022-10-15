import { PermanentDrawer, TemporaryDrawer } from "./components";

export default function Drawers({ drawerWidth }: { drawerWidth: number }) {
	return (
		<>
			<TemporaryDrawer />
			<PermanentDrawer drawerWidth={drawerWidth} />
		</>
	);
}
