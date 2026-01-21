import { Form, Input, Button } from "antd";
import { useFlightFormStore, type FlightFormData } from "./store/useFlightFormStore";

const FlightForm = () => {
  const { setFormData } = useFlightFormStore();

  const onFinish = (values: FlightFormData) => {
    setFormData(values);
    console.log("Saved");
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="ID"
        name="id"
        rules={[{ required: true, message: "Please enter ID" }]}
      >
        <Input placeholder="Required Field" />
      </Form.Item>

      <Form.Item
        label="Company"
        name="company"
        rules={[{ required: true, message: "company name is required" }]}
      >
        <Input placeholder="Please enter company name" />
      </Form.Item>

      <Form.Item
        label="Shipment ID"
        name="shipmentId"
        rules={[{ required: true, message: "shipment ID is required" }]}
      >
        <Input placeholder="Please enter shipment ID" />
      </Form.Item>
    
        <Form.Item
        label="Origin"
        name="origin"
        rules={[{ required: true, message: "origin is required" }]}
      >
        <Input placeholder="Please enter origin" />
      </Form.Item>

      <Form.Item
        label="Destination"
        name="destination"
        rules={[{ required: true, message: "Please enter destination" }]}
      >
        <Input placeholder="Please enter destination" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default FlightForm;
