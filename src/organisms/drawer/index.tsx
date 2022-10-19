import { PermanentDrawer, TemporaryDrawer } from "./components";

export default function Drawer({ drawerWidth }: { drawerWidth: number }) {
	return (
		<>
			<TemporaryDrawer />
			<PermanentDrawer drawerWidth={drawerWidth} />
		</>
	);
}
