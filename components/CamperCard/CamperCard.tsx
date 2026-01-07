import css from './CamperCard.module.css'
import { Camper } from "@/lib/api";
import Image from 'next/image';
import FeatureChips from '../FeatureChips/FeatureChips';

type Props = {
    item: Camper;
}

const CamperCard = ({ item }: Props) => {
    const img = item.gallery?.[0]?.thumb;
    return (
        <li>
            <Image src={img} alt={item.name} width='292' height='320'/>
            <h3 className={css.name}>{item.name}</h3>
            <p>€{item.price}</p>
            <p>{item.location}</p>
            <p>{item.description}</p>
            <FeatureChips item={item } />
            <button>Show more</button>
    </li>
)
}

export default CamperCard;