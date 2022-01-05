import React from "react";

const MobileNav =() =>{
    return (
        <>
            <h1>This is navbar</h1>
        </>
    )
};

const Navbar =()=>{
    return (
        <>
            <nav className="">
                <MobileNav />
            </nav>
        </>
    )
}

export default Navbar;