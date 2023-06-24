import { Link, useLocation } from "react-router-dom"
import { TbUsers } from "react-icons/tb"
import { HiPencil } from "react-icons/hi"
import { RxDrawingPinFilled } from "react-icons/rx"
import { BsArrowClockwise } from "react-icons/bs"
import { Toaster } from "react-hot-toast"

const Layout = ({ children })=> {

    const location = useLocation()
    const lastPath = location.pathname

    return(
        <div className="d-flex flex-row">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="sidebar">
                <div className="top-sidebar">
                    <h5>Art Gallery</h5> 
                    <span></span>
                </div>
                <div className="sidebar-nav mt-3">
                    <ul>
                        <li className={`${lastPath==="/"? "active": "" }`}><Link className={`${lastPath==="/"? "active": "" }`} to="/"><TbUsers size={20}/><span>Users</span></Link></li>
                        <li className={`${lastPath==="/artists"? "active": "" }`}><Link className={`${lastPath==="/artists"? "active": "" }`} to="/artists"><RxDrawingPinFilled/><span>Artists</span></Link></li>
                        <li className={`${lastPath==="/arts"? "active": "" }`}><Link className={`${lastPath==="/arts"? "active": "" }`} to="/arts"><HiPencil className="pr-2"/><span>Arts</span></Link></li>
                        <li className={`${lastPath==="/funfacts"? "active": "" }`}><Link className={`${lastPath==="/funfacts"? "active": "" }`} to="/funfacts"><BsArrowClockwise/><span>Fun facts</span></Link></li>
                    </ul>
                </div>
            </div>
            <div className="main-body">
                <div className="body-header"></div>
                {children}
            </div>
        </div>
    )
}

export default Layout