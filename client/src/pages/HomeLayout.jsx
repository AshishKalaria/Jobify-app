import { Outlet } from "react-router-dom";

const HomeLayout = () => {
	return (
		<>
			<nav>Navbar</nav>
			<Outlet />
		</>
	);
};
export default HomeLayout;
