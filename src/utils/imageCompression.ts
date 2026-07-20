export const compressImage = async (
  imageSource: string | File, 
  targetMinKB = 15, 
  targetMaxKB = 30, 
  minQuality = 0.2, 
  maxWidth = 640
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let src = '';
    let isFile = false;
    let fileName = 'compressed.jpg';
    
    if (imageSource instanceof File) {
      src = URL.createObjectURL(imageSource);
      isFile = true;
      fileName = imageSource.name;
    } else {
      src = imageSource;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = async () => {
      try {
        if (isFile) URL.revokeObjectURL(src);

        let width = img.width;
        let height = img.height;

        if (width === 0 || height === 0) {
           reject(new Error("Image width or height is 0"));
           return;
        }

        let currentMaxWidth = maxWidth;
        let bestDataUrl = '';
        let pass = 0;
        const targetMinBytes = targetMinKB * 1024;
        const targetMaxBytes = targetMaxKB * 1024;
        
        while (pass < 3) {
          let loopWidth = width;
          let loopHeight = height;

          if (loopWidth > currentMaxWidth) {
            loopHeight = Math.floor((loopHeight * currentMaxWidth) / loopWidth);
            loopWidth = currentMaxWidth;
          }

          const canvas = document.createElement('canvas');
          canvas.width = loopWidth;
          canvas.height = loopHeight;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          ctx.drawImage(img, 0, 0, loopWidth, loopHeight);
          await new Promise(r => setTimeout(r, 0));

          let minQ = minQuality;
          let maxQ = 0.95;
          let currentQ = 0.8;
          let localBestDataUrl = canvas.toDataURL('image/jpeg', currentQ);
          let bestDiff = Infinity;

          for (let i = 0; i < 7; i++) {
            const dataUrl = canvas.toDataURL('image/jpeg', currentQ);
            const sizeBytes = Math.round((dataUrl.length - 'data:image/jpeg;base64,'.length) * 3 / 4);
            
            if (sizeBytes >= targetMinBytes && sizeBytes <= targetMaxBytes) {
              localBestDataUrl = dataUrl;
              break; 
            }
            
            const diff = Math.abs(sizeBytes - ((targetMinBytes + targetMaxBytes) / 2));
            if (diff < bestDiff && sizeBytes <= targetMaxBytes) {
              bestDiff = diff;
              localBestDataUrl = dataUrl;
            } else if (bestDiff === Infinity) {
              localBestDataUrl = dataUrl;
            }

            if (sizeBytes > targetMaxBytes) {
              maxQ = currentQ;
              currentQ = (minQ + maxQ) / 2;
            } else {
              minQ = currentQ;
              currentQ = (minQ + maxQ) / 2;
            }
            
            if (currentQ < minQuality) {
               break;
            }
            await new Promise(r => setTimeout(r, 0));
          }

          const finalSize = Math.round((localBestDataUrl.length - 'data:image/jpeg;base64,'.length) * 3 / 4);
          bestDataUrl = localBestDataUrl;
          if (finalSize <= targetMaxBytes) {
            break; 
          }
          
          currentMaxWidth = Math.floor(currentMaxWidth * 0.7);
          pass++;
        }

        resolve(bestDataUrl);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (err) => {
      if (isFile) URL.revokeObjectURL(src);
      reject(err);
    };
    img.src = src;
  });
};

export const dataUrlToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
