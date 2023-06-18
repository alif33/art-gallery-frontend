import React from "react"
import { BsCardImage } from "react-icons/bs"
import { TfiSearch, TfiHeart } from "react-icons/tfi"
import ShowMore from "../assets/icons/ShowMore"
import { Link } from "react-router-dom"

const Layout = ({ children })=>{

    return(
        <div className="main">
            <div className="header">
                <select>
                    <option>Featured</option>
                </select>
                <div className="catalog">
                    <BsCardImage/><BsCardImage/><BsCardImage/>
                </div>
            </div>
            <div className="body-container">
                { children }
            </div>
            <div className="navbar">
                <div>
                    <Link to="/artworks">
                        <span><BsCardImage fontSize={20}/></span>
                        <h2>Artworks</h2>
                    </Link> 
                </div>
                <div>
                    <Link to="/artists">
                        <span><BsCardImage fontSize={20}/></span> 
                        <h2>Artists</h2>
                    </Link>
                </div>
                <div>
                    <Link to="/explore">
                        <span><TfiSearch fontSize={20}/></span> 
                        <h2>Explore</h2>
                    </Link>
                </div>
                <div>
                    <Link to="/favorites">
                        <span><TfiHeart fontSize={20}/></span>
                        <h2>Favorites</h2>
                    </Link>
                </div>
                <div>
                    <Link to="/more">
                        <span><ShowMore fontSize={20}/></span>
                        <h2>More</h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Layout