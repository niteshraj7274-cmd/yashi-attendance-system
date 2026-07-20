import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw } from 'lucide-react';
import { compressImage } from '../utils/imageCompression';

interface LiveCameraProps {
  onCapture: (base64Url: string) => void;
  onCancel: () => void;
}

export default function LiveCamera({ onCapture, onCancel }: LiveCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState('');
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser.');
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false
      });
      setError('');
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error(err);
      setError('Camera permission denied or capture failed. You cannot submit attendance without a selfie.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      setError('Video stream not ready or unavailable. Please wait or check your camera.');
      return;
    }
    const canvas = canvasRef.current;
    
    // Draw exactly 640x640 (or aspect correct)
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 640;
    canvas.height = 640;
    
    // Crop center
    const size = Math.min(video.videoWidth, video.videoHeight);
    const startX = (video.videoWidth - size) / 2;
    const startY = (video.videoHeight - size) / 2;
    
    ctx.drawImage(video, startX, startY, size, size, 0, 0, 640, 640);
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    
    try {
      // Compress to ensure 80-100KB
      const compressedUrl = await compressImage(dataUrl, 20, 30, 0.4, 640);
      stopCamera();
      onCapture(compressedUrl);
    } catch(err) {
      stopCamera();
      onCapture(dataUrl); // Fallback
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      <div className="flex justify-between items-center p-4 text-white z-10 bg-gradient-to-b from-black/50 to-transparent">
        <h2 className="font-bold tracking-wider uppercase text-sm">Live Selfie</h2>
        <button onClick={() => { stopCamera(); onCancel(); }} className="p-2 bg-white/20 rounded-full hover:bg-white/30">
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {error ? (
          <div className="text-white text-center p-6">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={startCamera} className="px-4 py-2 bg-white/20 rounded-lg flex items-center gap-2 mx-auto">
              <RefreshCw size={16} /> Retry
            </button>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      <div className="p-8 bg-gradient-to-t from-black to-transparent flex justify-center pb-12">
        <button 
          onClick={handleCapture}
          disabled={!!error}
          className="w-20 h-20 rounded-full bg-white border-4 border-slate-300 flex items-center justify-center shadow-2xl active:scale-95 transition-transform disabled:opacity-50"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center">
             <Camera size={32} className="text-slate-800" />
          </div>
        </button>
      </div>
    </div>
  );
}
