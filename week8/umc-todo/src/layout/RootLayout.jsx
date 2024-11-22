import CenterDiv from "../components/CenterDiv"
import NavBar from "../components/NavBar"
import {Outlet} from "react-router-dom";

const RootLayout = () => {
    return (
        <CenterDiv>
            <NavBar />
                <Outlet/>
        </CenterDiv>
    )
}

export default RootLayout;