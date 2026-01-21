import { useState, useRef, useEffect } from "react";
import { Button, Modal } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import styles from "./PhotoCapture.module.scss";

interface PhotoCaptureProps {
  onPhotoChange?: (photo: string | null) => void;
}

const PhotoCapture = ({ onPhotoChange }: PhotoCaptureProps) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null); //to on and off the camera

  //helps to turn on the camera and show live video on the screen
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" },
        audio: false 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  //Freeze the live video frame and convert it into an image
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current; //how
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL('image/webp');
        setPhoto(photoData);
        onPhotoChange?.(photoData);
        stopCamera();
      }
    }
  };

  const handleAddPhoto = () => {
    startCamera();
  };

  const handleCameraClose = () => {
    stopCamera();
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    onPhotoChange?.(null);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        Please take a photo of the sealed box
      </h3>
      <p className={styles.description}>
        Make sure the label is clearly visible in the photo
      </p>

      <Button
        variant="dashed"
        onClick={handleAddPhoto}
        className={styles.addPhotoBox}
      >
        <CameraOutlined className={styles.cameraIcon} />
        <span className={styles.addPhotoText}>Add Photo</span>
      </Button>

      {photo && (
        <div className={styles.photoContainer}>
          <img
            src={photo}
            alt="Sealed box"
            className={styles.photoImage}
          />
          <Button
            danger
            onClick={handleRemovePhoto}
            className={styles.removeButton}
          >
            Remove Photo
          </Button>
        </div>
      )}

      <Modal
        title="Take Photo"
        open={isCameraOpen}
        onCancel={handleCameraClose}
        footer={[
          <Button key="cancel" onClick={handleCameraClose}>
            Cancel
          </Button>,
          <Button key="capture" type="primary" onClick={capturePhoto}>
            Capture Photo
          </Button>,
        ]}
        width={600}
      >
        <div className={styles.modalContent}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={styles.videoElement}
          />
          <canvas ref={canvasRef} className={styles.canvasElement} />
        </div>
      </Modal>
    </div>
  );
};

export default PhotoCapture;
