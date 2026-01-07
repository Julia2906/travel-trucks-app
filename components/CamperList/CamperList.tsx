import { Camper } from "@/lib/api";
import CamperCard from "../CamperCard/CamperCard";

type Props = {
  campers: Camper[];
};

const CamperList = ({ campers }: Props) => {
  return (
    <ul>
      {campers.map((camper) => (
        <CamperCard key={camper.id} item={camper} />
      ))}
    </ul>
  );
};

export default CamperList;
