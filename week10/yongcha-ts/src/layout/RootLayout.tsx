import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
            <div>YONGCHA</div>
            <Outlet />
        </>
    )
}

export default RootLayout;