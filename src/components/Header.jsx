import React from 'react';
import logo from '../assets/logo.svg';
import group_logo from '../assets/Group 20399.svg';
function Header() {

    return (
        <div>
            <img src={group_logo} alt={"company logo"} style={{position: "absolute", marginLeft:"1.04vw", height:"5.7vh", width:"19vw"}} />
           <div>
            <img src={logo} alt={"hrc_logo"} style={{ display:"block", marginTop: " 2.47vh", height: "5.7vh", width:"14.8vw", marginLeft:"auto", marginRight:"auto" }} />
            </div>
        </div>
)
}
export default Header;