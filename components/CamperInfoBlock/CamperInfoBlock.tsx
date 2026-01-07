import css from "./CamperInfoBlock.module.css";
import { Camper } from "@/lib/api";
import RatingSummary from "../RatingStars/RatingSummary";

type Props = { camper: Camper };

const CamperInfoBlock = ({ camper }: Props) => {
  return (
    <div>
      <h2>CamperInfoBlock</h2>
      <div className={css.wrapperInfo}>
        <div className={css.wrapperFirst}>
          <h3 className={css.name}>{camper.name}</h3>

          <div className={css.wrapperSecond}>
            <RatingSummary
              rating={camper.rating}
              reviewsCount={camper.reviews.length}
            />
            <div className={css.location}>
              <svg width="16" height="16" aria-hidden="true">
                <use href="/sprite.svg#map" />
              </svg>
              <p>{camper.location}</p>
            </div>
                      <p className={css.price}>€{camper.price}</p>
                      <ul>
                          <li></li>
                      </ul>
                      <p className={css.description}>{camper.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperInfoBlock;
