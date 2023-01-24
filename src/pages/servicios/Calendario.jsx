import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ModalDescripcionEventos from './ModalDescripcionEventos';
import { FcCalendar } from "react-icons/fc";

function Calendario() {
    const [calendarPlugins, setCalendarPlugins] = useState([dayGridPlugin, timeGridPlugin, listPlugin]);

    const [events, setEvents] = useState([])
    const [estadoModalObservaciones, setEstadoModalObservaciones] = useState(false);
    const [tituloEvento, setTituloEvento] = useState("");
    const [detallesDelEvento, setDetallesDelEvento] = useState({});
    const servicio = 'https://api.fonasa.cl/cmdb-api/pasos-a-produccion';

    const datosDelEvento = {
        titulo: "",
        id: "",
        fechaInicio: "",
        fechaTermino: "",
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(date).toLocaleDateString('es-CL', options)
    }

    const handleEventClick = (info) => {
        for (let i = 0; i < events.length; i++) {
            if (events[i].id === info.event.id) {
                datosDelEvento.titulo = events[i].title;
                datosDelEvento.id = events[i].id;
                datosDelEvento.fechaInicio = formatDate(events[i].start);
                datosDelEvento.fechaTermino = formatDate(events[i].end);
            }
        }
        console.table(datosDelEvento);
        setDetallesDelEvento(datosDelEvento);
        console.log("-----dd");
        console.log(detallesDelEvento);
        console.log("-----");
        setEstadoModalObservaciones(!estadoModalObservaciones)
        setTituloEvento(info.event.title);
    }

    useEffect(() => {
        fetch(servicio)
            .then(response => response.json())
            .then(data => {
                // los objetos lo guardo en la lista
                setEvents(data)
            })
    }, [])

    return (
        <div className='container'>
            <div className="d-block" style={{width: "90%"}}>
                <h1>Calendario de Pasos a Producción</h1>
                <FullCalendar
                    plugins={calendarPlugins}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    eventClick={handleEventClick}
                    events={events}
                />
            </div>
            <ModalDescripcionEventos
                estado={estadoModalObservaciones}
                cambiarEstado={setEstadoModalObservaciones}
                tituloEvento={tituloEvento}
                contenidoDelEvento={detallesDelEvento}
            />
        </div>
    )
}

export default Calendario