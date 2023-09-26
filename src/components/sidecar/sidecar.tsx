import React, { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { FaBars } from 'react-icons/fa';

interface LayoutProps {
    children: ReactNode;
}

function Sidecar({ children, ...props }: LayoutProps) {
    const title = 'BOOKS 42';
    const[isOpen ,setIsOpen] = useState(false);

    const toggle = () => setIsOpen (!isOpen);

    return (
        <div className="containers">
            <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">{title}</h1>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    SidebarData.map((item, index)=>(
                        <NavLink to={item.link} key={index} className="link" aria-activedescendant="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.title}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
}

export default Sidecar;
