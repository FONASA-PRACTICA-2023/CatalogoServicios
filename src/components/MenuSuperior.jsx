import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoFonasa from "../assets/logo-fonasa.svg";
import constantes from "./constantes.json";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function MenuSuperior({ user, sidebar, setSidebar }) { 
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    console.log(`Sidebar ${sidebar ? 'abierto' : 'cerrado'}`);
    setEstado(sidebar);
    console.log(estado);

  }, [sidebar]);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar'>
        {user && (
          <div className="nav navbar-nav navbar-right hidden-xs text-light position-absolute top-0 end-0">
            <span className="pull-left user-top">
              <p className="mT10 ng-binding ng-scope">
                <span className="fw-semibold">Bienvenido/a, </span>
                {user.nombre}
              </p>
              <p>
                <span className="fw-semibold">RUN: </span> {user.run}
              </p>
              <p>
                <Link className="link-light" to={constantes.logout}>
                  Cerrar Sesión
                </Link>
              </p>
            </span>
          </div>
        )}
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      {user && (
        <>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link className="navbar-brand" to="/">
                  <img
                    src={logoFonasa}
                    alt="Fonasa"
                    className="logo-fonasa img-fluid"
                  />
                </Link>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path} onClick={(e) => {

                      }}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </ul>
          </nav>
          <div className={sidebar ? 'content-shifted' : ''}>
          </div>
        </>
      )
      }
    </IconContext.Provider >
  );
}

export default MenuSuperior;
