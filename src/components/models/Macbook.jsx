import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import useMacbookStore from "../../store/index.js";
import { noChangeParts } from "../../constants/index.js";
import * as THREE from "three";
import gsap from "gsap";

// Seamless non-suspending VideoTexture hook to eliminate frame drops & unmounting
function useSeamlessVideo(videoUrl) {
    const videoRef = useRef(null);
    const [texture, setTexture] = useState(null);

    useEffect(() => {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.crossOrigin = "anonymous";
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.generateMipmaps = false;

        videoRef.current = video;

        const onReady = () => {
            setTexture(videoTexture);
        };

        video.addEventListener("loadeddata", onReady, { once: true });
        video.play().catch(() => {});

        return () => {
            video.removeEventListener("loadeddata", onReady);
            video.pause();
            video.removeAttribute("src");
            video.load();
            videoTexture.dispose();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !videoUrl) return;

        if (video.src !== videoUrl && !video.src.endsWith(videoUrl)) {
            video.src = videoUrl;
            video.play().catch(() => {});
        }
    }, [videoUrl]);

    return texture;
}

export default function MacbookModel(props) {
    const { color, texture } = useMacbookStore();
    const { nodes, materials, scene } = useGLTF("/models/macbook-transformed.glb");
    const screenTexture = useSeamlessVideo(texture);

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
        <group {...props} dispose={null}>
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
                {screenTexture && <meshBasicMaterial map={screenTexture} />}
            </mesh>
            <mesh geometry={nodes.Object_127.geometry} material={materials.ZCDwChwkbBfITSW} rotation={[Math.PI / 2, 0, 0]} />
        </group>
    );
}

useGLTF.preload("/models/macbook-transformed.glb");
