import * as React from "react";
import axios from "axios";
import {useEffect, useState} from 'react';

export const Traslados = () => {

    const [solicitudes,setSolicitudes] = useState([]);

    useEffect(()=>{
        axios.get("https://backcamilleros-production.up.railway.app/requests")
            .then((res)=>{
                setSolicitudes(res.data.filter(filterRequests))
            }).catch((error)=>{
                console.log(error)
        })
    },[setTimeout(3000)])


    const filterRequests=(req)=>{
        return req.status!=="CLOSED"
    }

    const getColor=(urgency)=>{
        if(urgency==="LOW")return "#25ff2f"
        else if(urgency==="MEDIUM")return "#fff200"
        return "#ff2a22"
    }

        return (
            solicitudes.length>0 &&
            <div style={{height:"100",overflowY:"auto",overflowX:"hidden",width:"100vw"}}>
                <div style={{display:"flex",width:"100%",background:"lightgrey",height:"50px",alignItems:"center"}}>
                    <div style={{width:"20%",textAlign:"center"}}>ORIGEN</div>
                    <div style={{width:"20%",textAlign:"center"}}>DESTINO</div>
                    <div style={{width:"20%",textAlign:"center"}}>ID PACIENTE</div>
                    <div style={{width:"20%",textAlign:"center"}}>STATUS</div>
                    <div style={{width:"20%",textAlign:"center"}}>URGENCIA</div>
                </div>
                {solicitudes.map((s)=>{
                            return(
                                <div key={s.id} style={{display:"flex",width:"100%",background:getColor(s.levelOfUrgency),height:"50px",alignItems:"center",border:"1px solid black"}}>
                                    <div style={{width:"20%",textAlign:"center"}}>{s.areaFrom}</div>
                                    <div style={{width:"20%",textAlign:"center"}}>{s.areaTo}</div>
                                    <div style={{width:"20%",textAlign:"center"}}>{s.patientId}</div>
                                    <div style={{width:"20%",textAlign:"center"}}>{s.status}</div>
                                    <div style={{width:"20%",textAlign:"center"}}>{s.levelOfUrgency}</div>
                                </div>
                            )
                        })}
            </div>

          );
}