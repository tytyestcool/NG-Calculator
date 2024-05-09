import {Link} from "react-router-dom";

function NavBar() {

    return (
        <div className='Navbar'>
            <h1 className="Title">NG Calculator</h1>
            <Link to={"calculator"}>Calculator</Link>
        </div>
    )
}

export default NavBar