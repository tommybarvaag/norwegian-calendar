"use client";

import createGlobe from "cobe";
import { FC, useEffect, useRef } from "react";

const locationToAngles = (lat, long) => {
  return [
    Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
};

const Cobe: FC<{ latitude: number; longitude: number }> = ({
  latitude,
  longitude,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const focusRef = useRef([0, 0]);

  useEffect(() => {
    if (!canvasRef.current) return;

    let height = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;

    const onResize = () =>
      canvasRef.current && (height = canvasRef.current.offsetHeight);

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2,
      height: 800 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 80000,
      mapBrightness: 1.5,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.5, 1, 0.5],
      glowColor: [0.5, 0.5, 0.5],
      markers: [{ location: [latitude, longitude], size: 0.05 }],
      onRender: (state) => {
        state.width = height * 2;
        state.height = height * 2;

        // animated move
        state.phi = currentPhi;
        state.theta = currentTheta;
        const [focusPhi, focusTheta] = focusRef.current;
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi; // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08;
        } else {
          currentPhi -= distNegative * 0.08;
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
      },
    });

    const timeout = setTimeout(() => {
      const [focusPhi, focusTheta] = locationToAngles(latitude, longitude);
      focusRef.current = [focusPhi, focusTheta];
    }, 500);

    return () => {
      clearTimeout(timeout);
      globe.destroy();
    };
  }, [latitude, longitude]);

  return (
    <canvas
      className="aspect-square h-auto w-full max-w-full overflow-hidden"
      ref={canvasRef}
    />
  );
};

export { Cobe };
