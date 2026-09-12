import React, { useRef, useState, useEffect } from 'react';

export default function WebCameraComponent({ onCapture, onCancel }) {
  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);

  useEffect(() => {
    // Access browser media layer using clean HTML5 hardware protocols
    navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }, 
      audio: false 
    })
    .then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreamActive(true);
      }
    })
    .catch(err => {
      console.error("Camera access blocked by browser privacy controls:", err);
      alert("Please toggle and enable camera permissions inside your web browser settings dashboard.");
    });

    // Cleanup: Shut down webcam hardware instantly when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleWebSnapshot = () => {
    if (!streamActive) return;
    
    // Draw current frame into a high-fidelity data string canvas
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    // Output clean Base64 data string payload for server processing
    const base64Image = canvas.toDataURL('image/jpeg');
    onCapture(base64Image);
  };

  return (
    <div className="w-full h-full relative bg-cyberBlack flex flex-col justify-between items-center p-10 z-10">
      <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" />
      
      {/* HUD Elements */}
      <div className="w-full z-20 flex justify-between items-center">
        <button onClick={onCancel} className="w-10 h-10 rounded-full bg-cyberBlack/60 text-white font-bold border border-white/10 flex justify-center items-center text-sm cursor-pointer">✕</button>
        <h2 className="text-white text-xs font-black tracking-widest text-center">ALIGN YOUR IDENTITY</h2>
        <div className="w-10" /> {/* Spacer element for alignment symmetry */}
      </div>

      {/* Cyber-Teal Dashed Target Oval Anchor Guide Frame */}
      <div className="absolute w-[220px] h-[290px] border-2 border-dashed border-cyberTeal rounded-[50%] bg-transparent top-[25%] z-20 pointer-events-none shadow-[0_0_20px_rgba(0,255,204,0.15)] animate-pulse" />

      {/* Capture Action Shutter Layout Trigger */}
      <button onClick={handleWebSnapshot} className="w-[74px] h-[74px] rounded-full border-4 border-white bg-transparent flex justify-center items-center z-20 cursor-pointer active:scale-90 transition-transform">
        <div className="w-[58px] h-[58px] rounded-full bg-white" />
      </button>
    </div>
  );
}
