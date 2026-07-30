import { Link } from "react-router-dom"

function Sidebar(){
    return(
        <div className="col-2 bg-light vh-100">
            <Link to="/dashboard"> Dashboard </Link>

            <br/>

            <Link to="/usuarios"> Usuários</Link>

        </div>
    )
}

export default Sidebar