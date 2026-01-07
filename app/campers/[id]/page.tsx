import { getCamperById} from "@/lib/api";
import CamperInfoBlock from "@/components/CamperInfoBlock/CamperInfoBlock";
import Features from "@/components/Features/Features";
import Reviews from "@/components/Reviews/Reviews";
import BookingForm from "@/components/BookingForm/BookingForm";

type Props = {
   params:{id: string} 
}

const Details = async({ params} : Props ) => {

    const { id } = await params;
    const camper = await getCamperById(id)


console.log('campers', camper)
  return (
      <section>
          <div className="container">
              <h1>Camper Detail</h1>
              <CamperInfoBlock camper={camper}/>
              <Features camper={camper}/>
              <Reviews camper={camper}/>
              <BookingForm/>
          </div>

    </section>
  );
};

export default Details;