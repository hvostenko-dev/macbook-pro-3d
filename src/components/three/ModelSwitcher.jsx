import { useRef, useEffect } from "react";
import { PresentationControls, useGLTF, useTexture } from "@react-three/drei";
import useMacbookStore from "../../store";
import { noChangeParts } from "../../constants/index.js";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function ProductMacbookModel() {
    const { color } = useMacbookStore();
    const { nodes, materials, scene } = useGLTF("/models/macbook-transformed.glb");
    const screenTexture = useTexture("/screen.webp", (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
    });

    useEffect(() => {
        const targetColor = new THREE.Color(color);
        scene.traverse((child) => {
            if (child.isMesh && !noChangeParts.includes(child.name) && child.name !== "Object_123") {
                if (child.material?.color) {
                    gsap.to(child.material.color, {
                        r: targetColor.r,
                        g: targetColor.g,
                        b: targetColor.b,
                        duration: 0.35,
                        ease: "power2.out",
                    });
                }
            }
        });
    }, [color, scene]);

    return (
        <group dispose={null}>
            <mesh geometry={nodes.Object_10.geometry} material={materials.PaletteMaterial001} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_16.geometry} material={materials.zhGRTuGrQoJflBD} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_20.geometry} material={materials.PaletteMaterial002} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_22.geometry} material={materials.lmWQsEjxpsebDlK} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_30.geometry} material={materials.LtEafgAVRolQqRw} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_32.geometry} material={materials.iyDJFXmHelnMTbD} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_34.geometry} material={materials.eJObPwhgFzvfaoZ} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_38.geometry} material={materials.nDsMUuDKliqGFdU} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_42.geometry} material={materials.CRQixVLpahJzhJc} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_48.geometry} material={materials.YYwBgwvcyZVOOAA} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_54.geometry} material={materials.SLGkCohDDelqXBu} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_58.geometry} material={materials.WnHKXHhScfUbJQi} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_66.geometry} material={materials.fNHiBfcxHUJCahl} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_74.geometry} material={materials.LpqXZqhaGCeSzdu} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_82.geometry} material={materials.gMtYExgrEUqPfln} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_96.geometry} material={materials.PaletteMaterial003} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_107.geometry} material={materials.JvMFZolVCdpPqjj} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.Object_123.geometry} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial map={screenTexture} />
            </mesh>
            <mesh geometry={nodes.Object_127.geometry} material={materials.ZCDwChwkbBfITSW} rotation={[Math.PI / 2, 0, 0]} />
        </group>
    );
}

const ModelSwitcher = ({ scale }) => {
    const groupRef = useRef(null);

    // Smoothly animate scale transition between 14" and 16"
    useGSAP(() => {
        if (groupRef.current) {
            gsap.to(groupRef.current.scale, {
                x: scale,
                y: scale,
                z: scale,
                duration: 0.55,
                ease: "power2.out",
            });
        }
    }, [scale]);

    const controlsConfig = {
        global: false,
        cursor: true,
        snap: true,
        speed: 1.3,
        zoom: 1,
        polar: [-Math.PI / 5, Math.PI / 4],
        azimuth: [-Infinity, Infinity],
        config: { mass: 1, tension: 170, friction: 26 },
    };

    return (
        <PresentationControls {...controlsConfig}>
            <group ref={groupRef} scale={scale} position={[0, -0.6, 0]}>
                <ProductMacbookModel />
            </group>
        </PresentationControls>
    );
};

export default ModelSwitcher;

useGLTF.preload("/models/macbook-transformed.glb");
useTexture.preload("/screen.webp");
