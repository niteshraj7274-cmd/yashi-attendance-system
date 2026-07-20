import fs from 'fs';
let code = fs.readFileSync('src/components/LiveCamera.tsx', 'utf8');

code = code.replace(
  /const video = videoRef\.current;\s*const canvas = canvasRef\.current;/,
  `const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      setError('Video stream not ready or unavailable. Please wait or check your camera.');
      return;
    }
    const canvas = canvasRef.current;`
);

fs.writeFileSync('src/components/LiveCamera.tsx', code);
