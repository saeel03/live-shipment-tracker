import { Link } from "react-router-dom";
import type { FlightData } from "../../../data";
import styles from "./ShipmentPopoverContent.module.scss";

interface ShipmentPopoverContentProps {
  data: FlightData;
}

const ShipmentPopoverContent = ({ data }: ShipmentPopoverContentProps) => (
  <div className={styles.tooltipContent}>
    {data.originCountryCode && (
      <img
        src={`https://flagcdn.com/w40/${data.originCountryCode.toLowerCase()}.png`}
        alt={`${data.originCountryCode} flag`}
        className={styles.tooltipFlag}
        style={{ display: "inline-block" }}
      />
    )}
    <div className={styles.tooltipCompany}>{data.company || data.ident}</div>
    <Link 
      to={`/flight/${data.shipmentId || data.fa_flight_id}`}
      className={styles.tooltipIdLink}
    >
      {data.shipmentId || data.fa_flight_id}
    </Link>
    <div className={styles.tooltipRoute}>
      {data.origin.code} → {data.destination.code}
    </div>
  </div>
);

export default ShipmentPopoverContent;
