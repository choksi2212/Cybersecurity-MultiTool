import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ScrollArea = ({ children }) => (
    <div className="h-48 overflow-y-auto border rounded-md p-4">{children}</div>
  );
  

const ImageForensicsApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [outputText, setOutputText] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageLoad = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
      addOutputText(`Loaded Image: ${file.name}`);
    }
  };

  const addOutputText = (text) => {
    setOutputText(prev => [...prev, text]);
  };

  const extractMetadata = () => {
    if (!selectedImage) {
      addOutputText("Please load an image first");
      return;
    }

    // In a real application, you'd use a library like exif-js
    const metadata = {
      fileName: selectedImage.name,
      fileSize: `${(selectedImage.size / 1024).toFixed(2)} KB`,
      fileType: selectedImage.type,
      lastModified: new Date(selectedImage.lastModified).toLocaleString(),
    };

    addOutputText("Metadata Information:");
    Object.entries(metadata).forEach(([key, value]) => {
      addOutputText(`${key}: ${value}`);
    });
  };

  const generateHistogram = () => {
    if (!selectedImage) {
      addOutputText("Please load an image first");
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Calculate histogram data
      const histogramData = Array(256).fill(0);
      for (let i = 0; i < data.length; i += 4) {
        const brightness = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
        histogramData[brightness]++;
      }

      // Convert to format suitable for recharts
      const chartData = histogramData.map((value, index) => ({
        brightness: index,
        count: value,
      }));

      setHistogramData(chartData);
    };
  };

  const [histogramData, setHistogramData] = useState(null);

  const calculateChecksum = async () => {
    if (!selectedImage) {
      addOutputText("Please load an image first");
      return;
    }

    const buffer = await selectedImage.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    addOutputText("Checksum (SHA-256):");
    addOutputText(hashHex);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Advanced Image Forensics Tool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Image Display */}
          <div className="border-2 border-gray-300 rounded-lg p-4 text-center">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Selected" 
                className="max-h-96 mx-auto"
              />
            ) : (
              <div className="h-96 flex items-center justify-center bg-gray-100">
                <p>No Image Loaded</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => fileInputRef.current.click()}
              className="w-full"
            >
              Load Image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageLoad}
              accept="image/*"
              className="hidden"
            />
            
            <Button onClick={extractMetadata} className="w-full">
              Extract Metadata
            </Button>
            
            <Button onClick={generateHistogram} className="w-full">
              Show Histogram
            </Button>
            
            <Button onClick={calculateChecksum} className="w-full">
              Calculate Checksum
            </Button>
          </div>

          {/* Histogram Display */}
          {histogramData && (
            <div className="mt-4 p-4 border rounded">
              <h3 className="text-lg font-semibold mb-2">Image Histogram</h3>
              <LineChart width={600} height={300} data={histogramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="brightness" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </div>
          )}

          {/* Output Display */}
          <ScrollArea className="h-48 border rounded-md p-4">
            {outputText.map((text, index) => (
              <p key={index} className="text-sm">
                {text}
              </p>
            ))}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageForensicsApp;