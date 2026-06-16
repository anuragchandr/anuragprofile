import { useEffect, useRef } from "react";

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // Load three.js first
    const loadThree = document.createElement("script");
    loadThree.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js";
    loadThree.onload = () => {
      // After three.js is ready, load Vanta
      const loadVanta = document.createElement("script");
      loadVanta.src = "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js";
      loadVanta.onload = () => {
        if (!vantaEffect.current && window.VANTA) {
          vantaEffect.current = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            color: 0x6e00ff, // accent line color (deep violet)
            backgroundColor: 0x0f0f0f, // nearly black
            spacing: 20,
            maxDistance: 25,
          });

        }
      };
      document.body.appendChild(loadVanta);
    };
    document.body.appendChild(loadThree);

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: -1,
        position: "fixed",
      }}
    />
  );
};

export default VantaBackground;
