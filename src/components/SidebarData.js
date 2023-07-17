import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Crear Servicio',
    path: '/servicio-crear',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Mi Calendario',
    path: '/calendario',
    icon: <BsIcons.BsCalendarDate/>,
    cName: 'nav-text'
  },
  {
    title: 'ejemplo',
    path: '/ejemplo',
    icon: <BsIcons.BsCalendarDate/>,
    cName: 'nav-text'
  }
];