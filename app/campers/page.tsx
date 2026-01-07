import { getCampers } from "@/lib/api";
import CamperList from "@/components/CamperList/CamperList";

const Campers = async () => {
  const res = await getCampers();
console.log('campers', res)
  return (
    <section>
      <h1>Camper List</h1>
      {res.items.length > 0 && <CamperList campers={res.items} />}
    </section>
  );
};

export default Campers;
