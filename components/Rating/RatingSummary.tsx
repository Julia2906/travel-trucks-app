import css from "./RatingSummary.module.css";

type Props = {
  rating: number;
  reviewsCount: number;
};

export default function RatingSummary({ rating, reviewsCount }: Props) {
  return (
    <div className={css.wrap}>
      <svg width='16' height='16' aria-hidden='true'>
        <use href="/sprite.svg#Property1Pressed"/>
      </svg>
      <span className={css.value}>{rating.toFixed(1)}</span>
      <span className={css.count}>({reviewsCount} Reviews)</span>
    </div>
  );
}

