



import { Drawer } from "antd";
import type { FlightData } from "../../data";
import { UserData } from "./UserData";
import FlightForm from "./FlightForm/FlightForm";
import PhotoCapture from "./PhotoCapture/PhotoCapture";

interface FlightDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  data: FlightData | null;
}

const FlightDetailsDrawer = ({ open, onClose }: FlightDetailsDrawerProps) => {
  const handlePhotoChange = (photo: string | null) => {
    console.log("Photo updated:", photo);
  };

  return (
    <div>
      <UserData />
      <Drawer
        title="Flight Details"
        placement="right"
        onClose={onClose}
        open={open}
        size={400}
      >
        <FlightForm />
        <PhotoCapture onPhotoChange={handlePhotoChange} /> 
      </Drawer>
    </div>
  );
};

export default FlightDetailsDrawer;
