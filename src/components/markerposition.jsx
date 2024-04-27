import React from 'react';
import { Marker , Popup, useMap} from "react-leaflet"
import icon from './icon';
import { useEffect } from "react";

export default function MarkerPosition ({address}) {

    const position = [address.location.lat , address.location.lng]
    const map = useMap()

    useEffect(() => {
        map.flyTo(position , 16 , {
            animate : true
        })
    },[map, position])


    return ( 
        <>
        <Marker icon={icon} position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </>
    )
}