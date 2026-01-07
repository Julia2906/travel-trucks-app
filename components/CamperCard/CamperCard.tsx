import css from "./CamperCard.module.css";
import { Camper } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import FeatureChips from "../FeatureChips/FeatureChips";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import RatingSummary from "../RatingStars/RatingSummary";

type Props = {
  item: Camper;
};

const CamperCard = ({ item }: Props) => {
  const img = item.gallery?.[0]?.thumb;
  return (
    <li className={css.wrapper}>
      <Image src={img} alt={item.name} width="292" height="320" />
      <div className={css.wrapperInfo}>
        <div className={css.wrapperFirst}>
          <h3 className={css.name}>{item.name}</h3>
          <div className={css.priceAndFav}>
            <p className={css.price}>€{item.price}</p>
            <FavoriteButton />
          </div>
        </div>
        <div className={css.wrapperSecond}>
          <RatingSummary
            rating={item.rating}
            reviewsCount={item.reviews.length}
          />
          <div className={css.location}>
            <svg width="16" height="16" aria-hidden="true">
              <use href="/sprite.svg#map" />
            </svg>
            <p>{item.location}</p>
          </div>
        </div>

        <p className={css.description}>{item.description}</p>
        <FeatureChips item={item} />
        <Link href={`/campers/${item.id}`} className={css.button}>
          Show more
        </Link>
      </div>
    </li>
  );
};

export default CamperCard;
