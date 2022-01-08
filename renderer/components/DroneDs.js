import React, {useEffect, useState , useRef} from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';

export function DroneDs() {
    const [drone,setDrone] = useState({});
    const [load,setLoad] = useState(false);
    useEffect(async function () {
        const auxdrone = await useFBX("../images/drone.FBX");
        setDrone(auxdrone);
        setLoad(!load);
    },[])

    return(
        <Canvas key={load}>
            <ambientLight />
            <Model/>
        </Canvas>
    );

}

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
    nodes: {
        polySurface44: THREE.Mesh
        polySurface45: THREE.Mesh
        polySurface38: THREE.Mesh
        polySurface39: THREE.Mesh
        pCube9: THREE.Mesh
        pCube6: THREE.Mesh
        polySurface35: THREE.Mesh
        polySurface33: THREE.Mesh
        pCube35: THREE.Mesh
        pCylinder9: THREE.Mesh
        polySurface34: THREE.Mesh
        pCylinder7: THREE.Mesh
        polySurface28: THREE.Mesh
        polySurface27: THREE.Mesh
        polySurface25: THREE.Mesh
        pCube29: THREE.Mesh
        polySurface26: THREE.Mesh
        pCube2: THREE.Mesh
        polySurface23: THREE.Mesh
        pCube27: THREE.Mesh
        pCylinder4: THREE.Mesh
        pCube28: THREE.Mesh
        pCylinder5: THREE.Mesh
        polySurface22: THREE.Mesh
        pCube26: THREE.Mesh
        pCube5: THREE.Mesh
        pCube25: THREE.Mesh
        polySurface21: THREE.Mesh
        polySurface42: THREE.Mesh
        polySurface41: THREE.Mesh
        polySurface43: THREE.Mesh
        pCube9_1: THREE.Mesh
        pCube6_1: THREE.Mesh
        polySurface35_1: THREE.Mesh
        polySurface33_1: THREE.Mesh
        pCube35_1: THREE.Mesh
        pCylinder9_1: THREE.Mesh
        polySurface34_1: THREE.Mesh
        pCylinder7_1: THREE.Mesh
        polySurface28_1: THREE.Mesh
        polySurface27_1: THREE.Mesh
        polySurface25_1: THREE.Mesh
        pCube29_1: THREE.Mesh
        polySurface26_1: THREE.Mesh
        pCube2_1: THREE.Mesh
        polySurface23_1: THREE.Mesh
        pCube27_1: THREE.Mesh
        pCylinder4_1: THREE.Mesh
        pCube28_1: THREE.Mesh
        pCylinder5_1: THREE.Mesh
        polySurface22_1: THREE.Mesh
        pCube26_1: THREE.Mesh
        pCube5_1: THREE.Mesh
        pCube25_1: THREE.Mesh
        polySurface21_1: THREE.Mesh
        polySurface42_1: THREE.Mesh
        polySurface41_1: THREE.Mesh
        polySurface43_1: THREE.Mesh
        polySurface8: THREE.Mesh
        pCube10: THREE.Mesh
        polySurface18: THREE.Mesh
        polySurface20: THREE.Mesh
        pCube19: THREE.Mesh
        pCube18: THREE.Mesh
        pCube22: THREE.Mesh
        pCube17: THREE.Mesh
        pCube16: THREE.Mesh
        pCube15: THREE.Mesh
        pCube21: THREE.Mesh
        Sphere001: THREE.Mesh
        Sphere002: THREE.Mesh
        Sphere003: THREE.Mesh
    }
    materials: {
        ['PVC FurnGrad Middle Gray']: THREE.MeshBasicMaterial
            ['PVC FurnGrad Charcoal Gray']: THREE.MeshBasicMaterial
    ['Material #25']: THREE.MeshBasicMaterial
    ['Special Stainless Steel Satin 1']: THREE.MeshBasicMaterial
blinn1: THREE.MeshBasicMaterial
    ['Material #27']: THREE.MeshBasicMaterial
    ['PVC FurnGrad Black']: THREE.MeshBasicMaterial
    ['Glass Flint 5']: THREE.MeshBasicMaterial
}
}

function Model(props: JSX.IntrinsicElements['group']) {
    const group = useRef<THREE.Group>()
    const { nodes, materials } = useGLTF('/drone.glb') as GLTFResult
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh geometry={nodes.polySurface44.geometry} material={nodes.polySurface44.material} />
            <mesh geometry={nodes.polySurface45.geometry} material={nodes.polySurface45.material} position={[0, 0, -0.09]} />
            <group position={[0, 0.02, 0.02]}>
                <mesh
                    geometry={nodes.polySurface38.geometry}
                    material={nodes.polySurface38.material}
                    position={[0, -0.02, -0.02]}
                />
                <mesh
                    geometry={nodes.polySurface39.geometry}
                    material={materials['Material #25']}
                    position={[0, -0.02, -0.02]}
                />
            </group>
            <mesh geometry={nodes.pCube9.geometry} material={nodes.pCube9.material} position={[-0.09, 0.06, -0.13]} />
            <mesh geometry={nodes.pCube6.geometry} material={nodes.pCube6.material} position={[-0.1, 0, 0.04]} />
            <mesh
                geometry={nodes.polySurface35.geometry}
                material={nodes.polySurface35.material}
                position={[-0.08, 0.01, 0.02]}
            />
            <mesh
                geometry={nodes.polySurface33.geometry}
                material={nodes.polySurface33.material}
                position={[-0.09, 0.05, -0.13]}
            />
            <mesh geometry={nodes.pCube35.geometry} material={nodes.pCube35.material} position={[-0.06, 0.02, 0.01]} />
            <mesh geometry={nodes.pCylinder9.geometry} material={nodes.pCylinder9.material} position={[-0.09, 0.06, -0.13]} />
            <mesh geometry={nodes.polySurface34.geometry} material={nodes.polySurface34.material} />
            <mesh geometry={nodes.pCylinder7.geometry} material={nodes.pCylinder7.material} position={[-0.09, 0.06, 0.02]} />
            <mesh
                geometry={nodes.polySurface28.geometry}
                material={nodes.polySurface28.material}
                position={[-0.08, 0.01, -0.12]}
            />
            <mesh
                geometry={nodes.polySurface27.geometry}
                material={nodes.polySurface27.material}
                position={[-0.09, 0.05, 0.02]}
            />
            <mesh
                geometry={nodes.polySurface25.geometry}
                material={nodes.polySurface25.material}
                position={[-0.08, 0.01, -0.14]}
            />
            <mesh geometry={nodes.pCube29.geometry} material={nodes.pCube29.material} position={[-0.09, 0.05, -0.13]} />
            <mesh geometry={nodes.polySurface26.geometry} material={nodes.polySurface26.material} position={[0, 0, -0.11]} />
            <mesh geometry={nodes.pCube2.geometry} material={nodes.pCube2.material} position={[-0.06, 0.02, -0.12]} />
            <mesh
                geometry={nodes.polySurface23.geometry}
                material={nodes.polySurface23.material}
                position={[-0.09, 0.03, 0.02]}
            />
            <mesh geometry={nodes.pCube27.geometry} material={nodes.pCube27.material} position={[-0.09, 0.06, 0.02]} />
            <mesh geometry={nodes.pCylinder4.geometry} material={nodes.pCylinder4.material} position={[-0.09, 0.02, 0.02]} />
            <mesh geometry={nodes.pCube28.geometry} material={nodes.pCube28.material} position={[-0.09, 0.05, -0.13]} />
            <mesh geometry={nodes.pCylinder5.geometry} material={nodes.pCylinder5.material} position={[-0.09, 0.02, -0.13]} />
            <mesh
                geometry={nodes.polySurface22.geometry}
                material={nodes.polySurface22.material}
                position={[-0.08, 0.01, 0.01]}
            />
            <mesh geometry={nodes.pCube26.geometry} material={nodes.pCube26.material} position={[-0.09, 0.05, 0.02]} />
            <mesh geometry={nodes.pCube5.geometry} material={nodes.pCube5.material} position={[-0.09, 0.05, 0.02]} />
            <mesh geometry={nodes.pCube25.geometry} material={nodes.pCube25.material} position={[-0.1, 0, -0.15]} />
            <mesh
                geometry={nodes.polySurface21.geometry}
                material={nodes.polySurface21.material}
                position={[-0.09, 0.03, -0.13]}
            />
            <mesh geometry={nodes.polySurface42.geometry} material={nodes.polySurface42.material} />
            <mesh
                geometry={nodes.polySurface41.geometry}
                material={nodes.polySurface41.material}
                position={[-0.03, 0.01, -0.06]}
            />
            <mesh
                geometry={nodes.polySurface43.geometry}
                material={nodes.polySurface43.material}
                position={[-0.04, 0.01, -0.06]}
            />
            <mesh geometry={nodes.pCube9_1.geometry} material={nodes.pCube9_1.material} position={[0.09, 0.06, -0.13]} />
            <mesh geometry={nodes.pCube6_1.geometry} material={nodes.pCube6_1.material} position={[0.1, 0, 0.04]} />
            <mesh
                geometry={nodes.polySurface35_1.geometry}
                material={nodes.polySurface35_1.material}
                position={[0.08, 0.01, 0.02]}
            />
            <mesh
                geometry={nodes.polySurface33_1.geometry}
                material={nodes.polySurface33_1.material}
                position={[0.09, 0.05, -0.13]}
            />
            <mesh geometry={nodes.pCube35_1.geometry} material={nodes.pCube35_1.material} position={[0.06, 0.02, 0.01]} />
            <mesh
                geometry={nodes.pCylinder9_1.geometry}
                material={nodes.pCylinder9_1.material}
                position={[0.09, 0.06, -0.13]}
            />
            <mesh geometry={nodes.polySurface34_1.geometry} material={nodes.polySurface34_1.material} />
            <mesh
                geometry={nodes.pCylinder7_1.geometry}
                material={nodes.pCylinder7_1.material}
                position={[0.09, 0.06, 0.02]}
            />
            <mesh
                geometry={nodes.polySurface28_1.geometry}
                material={nodes.polySurface28_1.material}
                position={[0.08, 0.01, -0.12]}
            />
            <mesh
                geometry={nodes.polySurface27_1.geometry}
                material={nodes.polySurface27_1.material}
                position={[0.09, 0.05, 0.02]}
            />
            <mesh
                geometry={nodes.polySurface25_1.geometry}
                material={nodes.polySurface25_1.material}
                position={[0.08, 0.01, -0.14]}
            />
            <mesh geometry={nodes.pCube29_1.geometry} material={nodes.pCube29_1.material} position={[0.09, 0.05, -0.13]} />
            <mesh
                geometry={nodes.polySurface26_1.geometry}
                material={nodes.polySurface26_1.material}
                position={[0, 0, -0.11]}
            />
            <mesh geometry={nodes.pCube2_1.geometry} material={nodes.pCube2_1.material} position={[0.06, 0.02, -0.12]} />
            <mesh
                geometry={nodes.polySurface23_1.geometry}
                material={nodes.polySurface23_1.material}
                position={[0.09, 0.03, 0.02]}
            />
            <mesh geometry={nodes.pCube27_1.geometry} material={nodes.pCube27_1.material} position={[0.09, 0.06, 0.02]} />
            <mesh
                geometry={nodes.pCylinder4_1.geometry}
                material={nodes.pCylinder4_1.material}
                position={[0.09, 0.02, 0.02]}
            />
            <mesh geometry={nodes.pCube28_1.geometry} material={nodes.pCube28_1.material} position={[0.09, 0.05, -0.13]} />
            <mesh
                geometry={nodes.pCylinder5_1.geometry}
                material={nodes.pCylinder5_1.material}
                position={[0.09, 0.02, -0.13]}
            />
            <mesh
                geometry={nodes.polySurface22_1.geometry}
                material={nodes.polySurface22_1.material}
                position={[0.08, 0.01, 0.01]}
            />
            <mesh geometry={nodes.pCube26_1.geometry} material={nodes.pCube26_1.material} position={[0.09, 0.05, 0.02]} />
            <mesh geometry={nodes.pCube5_1.geometry} material={nodes.pCube5_1.material} position={[0.09, 0.05, 0.02]} />
            <mesh geometry={nodes.pCube25_1.geometry} material={nodes.pCube25_1.material} position={[0.1, 0, -0.15]} />
            <mesh
                geometry={nodes.polySurface21_1.geometry}
                material={nodes.polySurface21_1.material}
                position={[0.09, 0.03, -0.13]}
            />
            <mesh geometry={nodes.polySurface42_1.geometry} material={nodes.polySurface42_1.material} />
            <mesh
                geometry={nodes.polySurface41_1.geometry}
                material={nodes.polySurface41_1.material}
                position={[0.03, 0.01, -0.06]}
            />
            <mesh
                geometry={nodes.polySurface43_1.geometry}
                material={nodes.polySurface43_1.material}
                position={[0.04, 0.01, -0.06]}
            />
            <mesh geometry={nodes.polySurface8.geometry} material={materials['Material #27']} />
            <mesh geometry={nodes.pCube10.geometry} material={nodes.pCube10.material} position={[0, 0, -0.04]} />
            <mesh geometry={nodes.polySurface18.geometry} material={nodes.polySurface18.material} />
            <mesh
                geometry={nodes.polySurface20.geometry}
                material={nodes.polySurface20.material}
                position={[0, 0.03, -0.07]}
                scale={[1.5, 1, 1]}
            />
            <mesh geometry={nodes.pCube19.geometry} material={nodes.pCube19.material} position={[0, 0, -0.04]} />
            <mesh geometry={nodes.pCube18.geometry} material={nodes.pCube18.material} position={[-0.01, 0, -0.04]} />
            <mesh geometry={nodes.pCube22.geometry} material={nodes.pCube22.material} position={[0.01, 0, -0.04]} />
            <mesh geometry={nodes.pCube17.geometry} material={nodes.pCube17.material} position={[-0.01, 0, -0.04]} />
            <mesh geometry={nodes.pCube16.geometry} material={nodes.pCube16.material} position={[0.02, 0, -0.04]} />
            <mesh geometry={nodes.pCube15.geometry} material={nodes.pCube15.material} position={[-0.02, 0, -0.04]} />
            <mesh geometry={nodes.pCube21.geometry} material={nodes.pCube21.material} position={[0.01, 0, -0.04]} />
            <mesh
                geometry={nodes.Sphere001.geometry}
                material={nodes.Sphere001.material}
                position={[0, 0.02, 0.02]}
                scale={[0.16, 0.16, 0.08]}
            />
            <mesh
                geometry={nodes.Sphere002.geometry}
                material={nodes.Sphere002.material}
                position={[-0.01, 0, -0.09]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[0.23, 0.23, 0.07]}
            />
            <mesh
                geometry={nodes.Sphere003.geometry}
                material={nodes.Sphere003.material}
                position={[0.02, 0, -0.09]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[0.23, 0.23, 0.07]}
            />
        </group>
    )
}

useGLTF.preload('/drone.glb')