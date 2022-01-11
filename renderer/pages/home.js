import React, {useEffect, useRef, useState} from "react";
import { ipcRenderer } from "electron";
import Head from "next/head";
import Tello from "tello-drone";
import {exec} from "child_process";
import kill from "kill-port";
import dynamic from "next/dynamic";
import Drone from "../components/Drone";
import {XYPlot, LineSeries, YAxis, VerticalBarSeries} from 'react-vis';

const Canvas = dynamic(
    ()=>import('@react-three/fiber').then((mod) => mod.Canvas),
    {ssr: false}
)

let drone = null;

let x = 0;
let y = 0;
let z = 0;
let r = 0;

let p1 = 0;
export default function Home() {
    const [isConnected,setIsConnected] = useState(false);
    const [estadoC1,setEstadoC1] = useState(0); //0=desconectado 1=conectando 2=conectado
    const [estadoC2,setEstadoC2] = useState(0); //0=desconectado 1=conectando 2=conectado
    const [estadoC3,setEstadoC3] = useState(0); //0=desconectado 1=conectando 2=conectado
    const [videoLigado,setVideoLigado] = useState(false);
    let [velocidade,setVelocidade] = useState(50);
    const [bateria,setBateria] = useState(0);
    const [consumoBat,setConsumoBat] = useState(0);
    const [autonomia,setAutonomia] = useState(0);
    const [wifi,setWifi] = useState(0);
    const [dados,setDados] = useState([]);
    const [videoUrl,setVideoUrl] = useState("");
    const [sensibilidade,setSensibilidade] = useState(0);
    const [modo,setModo] = useState(1);
    const [time,setTime] = useState(0);
    const [temp,setTemp] = useState(0);
    const [h,setH] = useState(0);
    const [baro,setBaro] = useState(0);
    const [tof,setTof] = useState(0);
    const [pitch,setPitch] = useState(0);
    const [roll,setRoll] = useState(0);
    const [yaw,setYaw] = useState(0);

    useEffect(function (){

        return function () {
            if(p1){
                p1.kill();
            }
        }
    },[])

    useEffect(function(){
        if(estadoC2 === 2){

        }
    },[estadoC2]);

    async function connect() {
        setEstadoC2(1);

        drone = await  new Tello({skipOk: true});

        setTimeout(function () {
            if(drone.connected){
                eventos();

                setIsConnected(true);
                setEstadoC2(2);

                document.addEventListener('keydown', function (event) {
                    keyDown(event.key);
                });
                document.addEventListener('keyup', function (event) {
                    keyUp(event.key);
                });

                videoOn();
            }else{
                ipcRenderer.send("reload");
            }
        },1000);
    }

    function eventos() {
        drone.on("connection", () => {
        });

        drone.on("error", () => {
            console.log("aaa");
        });

        drone.on("state", state => {
            setPitch(state.pitch);
            setRoll(state.roll);
            setYaw(state.yaw);
            setH(state.h);
            setTemp(state.temph);
            setBaro(state.baro);
            setBateria(state.bat);
            setTof(state.tof);
        });

        drone.on("send", (err, length) => {
            if (err) console.log(err);

            console.log(`Sent command is ${length} long`);
        });

        drone.on("message", message => {
            console.log("Recieved Message > ", message);
        });
    }

    function keyDown(key) {
        key = key.toLowerCase();

        if(key === "w" && y!== velocidade){
           y=velocidade;
           sendRc();
        }
        if(key === "s" && y!== -velocidade){
            y=-velocidade
            sendRc();
        }
        if(key === "a" && r!== velocidade){
            r=-velocidade;
            sendRc();
        }
        if(key === "d" && r!== -velocidade){
            r=velocidade
            sendRc();
        }
        if(key === "arrowup" && x!== velocidade){
            x=velocidade;
            sendRc();
        }
        if(key === "arrowdown" && x!== -velocidade){
            x=-velocidade;
            sendRc();
        }
        if(key === "arrowleft" && z!== velocidade){
            z=-velocidade;
            sendRc();
        }
        if(key === "arrowright" && z!== -velocidade){
            z=velocidade;
            sendRc();
        }
        if(key === " "){
            drone.send("emergency");
        }
        if(key === "pageup"){
            setVelocidade(100);

        }
        if(key === "pagedown"){
            setVelocidade(50);
        }
        if(key === "r"){
            drone.send("takeoff");
        }
        if(key === "f"){
            drone.send("land");
        }
    }

    function keyUp(key) {
        key = key.toLowerCase();
        if(key === "w"){
            y=0;
            sendRc();
        }
        if(key === "s"){
            y=0;
            sendRc();
        }
        if(key === "a"){
            r=0;
            sendRc();
        }
        if(key === "d"){
            r=0;
            sendRc();
        }
        if(key === "arrowup"){
            x=0;
            sendRc();
        }
        if(key === "arrowdown"){
            x=0;
            sendRc();
        }
        if(key === "arrowleft"){
            z=0;
            sendRc();
        }
        if(key === "arrowright"){
            z=0;
            sendRc();
        }
    }

    function sendRc() {
        console.log("rc "+(z)+" "+(x)+" "+(y)+" "+(r));
        drone.forceSend("rc "+(z)+" "+(x)+" "+(y)+" "+(r));
        return 0;
    }

    async function videoOn() {
        await drone.send("streamon");

        p1 = exec('gst-launch-1.0 -v udpsrc port=11111 ! decodebin ! videoconvert ! autovideosink');

        setVideoLigado(true);
    }

    async function videoOff() {
        drone.send("streamoff")

        ipcRenderer.send("decode","kill");

        ipcRenderer.removeListener("decode-resp", function () {});

        setVideoLigado(false);
    }

    const data = [
        {x: 1, y: 20, y0: 0},
    ];

    return (
        <React.Fragment>
            <Head>
                <title>Tello</title>
            </Head>
            <div className={"corpo"}>
                <div className={"colunaB"}>

                </div>
                <div className={"colunaA"}>
                    <div className={"linha space-between"} style={{width:"100%",height:"69%"}}>
                        <div className={"linha center painel"} style={{width:"8%",height:"100%"}}>
                            <XYPlot
                                margin={{left:32,to:0,bottom:5}}
                                width={20}
                                height={336.5}
                                yDomain={[0,10]}
                            >
                                <VerticalBarSeries
                                    data={[{x:0,y:((h/100)+0.20),y0:((h/100)-0.20)}]}
                                />
                                <YAxis/>
                            </XYPlot>
                        </div>
                        <div className={"coluna"} style={{width:"80%",height:"100%"}}>
                            <Canvas className={"canvas"}>
                                <ambientLight intensity={0.9}/>
                                <Drone
                                    scale={10}
                                    rotation={[(pitch*Math.PI/180)*-1, (yaw*Math.PI/180)*-1, roll*Math.PI/180]}
                                    position={[0, -0.5, 0]}
                                />
                            </Canvas>
                        </div>
                        <div className={"linha center painel"} style={{width:"8%",height:"100%"}}>
                            <XYPlot
                                margin={{left:32,to:0,bottom:5}}
                                width={20}
                                height={336.5}
                                yDomain={[0,10]}
                            >
                                <VerticalBarSeries
                                    data={[{x:0,y:((tof/100)+0.20),y0:((tof/100)-0.20)}]}
                                />
                                <YAxis/>
                            </XYPlot>
                        </div>
                    </div>
                    <div className={"linha center painel"} style={{width:"100%",height:"29%"}}>
                        {estadoC2===0&&
                            <div className={"bloco"}>
                                <button onClick={connect} className={"botao w3-ripple"}>Connect</button>
                            </div>
                        }
                        {estadoC2===1&&
                            <div className={"bloco"}>
                                <button className={"botao w3-ripple"}>Connecting</button>
                            </div>
                        }
                        {estadoC2===2&&
                            <div className={"bloco"}>
                                <p>pitch:{pitch} roll:{roll} yaw:{yaw} h:{h} baro:{baro} tof:{tof} bat:{bateria}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className={"colunaB"}>

                </div>
            </div>
        </React.Fragment>
    );
};
/*
ffmpeg -i udp://0.0.0.0:11111 -r 30 -s 960x720 -codec:v mpeg1video -b 800k -f mpegts udp://192.168.10.3:11111
fflplay f mpegts udp://192.168.10.3:11111
 */