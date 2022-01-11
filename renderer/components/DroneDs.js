import React, {useEffect, useState , useRef , Suspense} from "react";
import dynamic from "next/dynamic";
import Drone from "./Drone";
import {useFrame} from "@react-three/fiber";

const Canvas = dynamic(
    ()=>import('@react-three/fiber').then((mod) => mod.Canvas),
    {ssr: false}
)

export default function DroneDs(props) {
    const isConnected = props.isConnected;
    const [girando,setGirando] = useState(false);
    const [x,setx] = useState(0);
    const [y,sety] = useState(-1);
    const [z,setz] = useState(0);
    const [rx,setrx] = useState(0);
    const [ry,setry] = useState(0);
    const [rz,setrz] = useState(0);
    const [s,sets] = useState(10);

    useState(function (){
        console.log("aaaa");
    },[props.pitch, props.yaw,props.roll]);

    /*
    console.log(Math.PI/1);

    useEffect(function () {
        if(!girando && isConnected){
            setGirando(true);
            giraDrone(rx,rz);
        }
    })

    function giraDrone(rx,rz){
        if(isConnected){
            let aux1 = rx;
            let aux2 = rz;
            if(aux1<3.14){
                aux1 = aux1 + 0.005;
            }
            if(aux2<3.14){
                aux2 = aux2 + 0.01;
            }
            console.log(aux1);
            console.log(aux2);
            setrx(aux1);
            setrz(aux2);
            setTimeout(function(){
                if(aux1<3.14 || aux2<3.14){
                    giraDrone(aux1,aux2);
                }
            },1);
        }
    }
    */
    return(
        <Canvas style={{top: 0,width:400,height:400}}>
            <ambientLight intensity={0.9}/>
            <Drone
                scale={s}
                rotation={[rx, ry, rz]}
                position={[x, y, z]}
            />
        </Canvas>
    );
}
