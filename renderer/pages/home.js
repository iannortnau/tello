import React, {useEffect, useState} from "react";
import { ipcRenderer } from "electron";
import Head from "next/head";
import Tello from "tello-drone";
import {exec} from "child_process";

let drone = null;

let x = 0;
let y = 0;
let z = 0;
let r = 0;

let p1 = 0;

export default function Home() {
    const [isConnected,setIsConnected] = useState(false);
    const [estado,setEstado] = useState(0); //0=desconectado 1=conectando 2=conectado
    const [videoLigado,setVideoLigado] = useState(false);
    let [velocidade,setVelocidade] = useState(50);
    const [bateria,setBateria] = useState(0);
    const [wifi,setWifi] = useState(0);
    const [dados,setDados] = useState([]);
    const [videoUrl,setVideoUrl] = useState("");
    const [modo,setModo] = useState(1);
    const [temp,setTemp] = useState(0);
    const [h,setH] = useState(0);
    const [baro,setBaro] = useState(0);
    const [tof,setTof] = useState(0);

    useEffect(function (){

        return function () {
            if(p1){
                p1.kill();
            }
        }
    },[])

    useEffect(function(){
        if(estado === 2){

        }
    },[estado]);

    async function connect() {
        setEstado(1);

        drone = new Tello({skipOk: false});
        eventos();
    }

    function eventos() {
        drone.on("connection", () => {
            console.log("Connected to drone");
            try {
                drone.send("wifi?");
                setIsConnected(true);
                setEstado(2);
                eventos();
                document.addEventListener('keydown', function (event) {
                    keyDown(event.key);
                });
                document.addEventListener('keyup', function (event) {
                    keyUp(event.key);
                });
                videoOn();
            }catch (e) {
                setTimeout(function () {
                    setEstado(0);
                },2000);
                process.exit();
            }
        });

        drone.on("error", () => {
            console.log("aaa");
        });

        drone.on("state", state => {
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

        if(key === "w" && y!== 1){
           y=1;
           sendRc();
        }
        if(key === "s" && y!== -1){
            y=-1
            sendRc();
        }
        if(key === "a" && r!== 1){
            r=-1;
            sendRc();
        }
        if(key === "d" && r!== -1){
            r=1
            sendRc();
        }
        if(key === "arrowup" && x!== 1){
            x=1;
            sendRc();
        }
        if(key === "arrowdown" && x!== -1){
            x=-1;
            sendRc();
        }
        if(key === "arrowleft" && z!== 1){
            z=-1;
            sendRc();
        }
        if(key === "arrowright" && z!== -1){
            z=1;
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
        console.log("rc "+(z*velocidade)+" "+(x*velocidade)+" "+(y*velocidade)+" "+(r*velocidade));
        drone.forceSend("rc "+(z*velocidade)+" "+(x*velocidade)+" "+(y*velocidade)+" "+(r*velocidade));
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

    return (
        <React.Fragment>
            <Head>
                <title>Tello</title>
            </Head>
            <div className={"corpo"}>
                {estado===0&&
                    <button onClick={connect} className={"botao w3-ripple"}>Connect</button>
                }
                {estado===1&&
                    <button className={"botao w3-ripple w3-spin"}>Connecting</button>
                }
                {estado===2&&
                    <div>
                        <button className={"botao w3-ripple w3-red"}>{velocidade}</button>
                        <button className={"botao w3-ripple w3-red"}>{temp}°c</button>
                        <button className={"botao w3-ripple w3-red"}>{h}cm</button>
                        <button className={"botao w3-ripple w3-red"}>{tof}°cm</button>
                        <button className={"botao w3-ripple w3-red"}>{baro}°cm</button>
                        <button className={"botao w3-ripple w3-red"}>{bateria}%</button>
                    </div>
                }
            </div>
        </React.Fragment>
    );
};
/*
ffmpeg -i udp://0.0.0.0:11111 -r 30 -s 960x720 -codec:v mpeg1video -b 800k -f mpegts udp://192.168.10.3:11111
fflplay f mpegts udp://192.168.10.3:11111
 */