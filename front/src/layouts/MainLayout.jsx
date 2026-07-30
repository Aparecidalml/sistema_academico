import { Fragment } from "react";
import Header from "../components/Header.jsx"
import Sidebar from "../components/Sidebar.jsx"

function MainLayout({children}){
    return(
        <Fragment>

            <Header/>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>
                    <main className="col">
                        {children}
                    </main>
                </div>
            </div>
        </Fragment>

    )
}

export default MainLayout