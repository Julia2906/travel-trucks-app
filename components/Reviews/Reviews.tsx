'use client';

import css from './Reviews.module.css';
import { useQuery } from '@tanstack/react-query';
import { getCamperById } from '@/lib/api';
import type { Camper } from '@/types/camper';

type Props = { id: string };

const MAX_STARS = 5;

function getInitial(name?: string) {
  const first = (name ?? '').trim()[0];
  return first ? first.toUpperCase() : '?';
}

function clampRating(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(MAX_STARS, Math.max(0, value));
}

export default function Reviews({ id }: Props) {
  const { data: camper, isLoading, isError } = useQuery<Camper>({
    queryKey: ['camper', id],
    queryFn: () => getCamperById(id),
    enabled: Boolean(id),
  });

  if (isLoading) return null;
  if (isError || !camper) return null;

  const reviews = camper.reviews; // тут вже типізовано

  return (
    <ul className={css.list}>
      {reviews.map((r, idx) => {
        const name = r.reviewer_name.trim();
        const rating = clampRating(r.reviewer_rating);
        const comment = r.comment;

        return (
          <li key={`${name}-${idx}`} className={css.item}>
            <div className={css.header}>
              <div className={css.avatar} aria-hidden="true">
                {getInitial(name)}
              </div>

              <div className={css.meta}>
                <p className={css.name}>{name}</p>

                <div className={css.stars} aria-label={`Rating: ${rating} out of ${MAX_STARS}`}>
                  {Array.from({ length: MAX_STARS }).map((_, i) => (
                    <svg
                      key={i}
                      className={`${css.star} ${i < rating ? css.starFilled : css.starEmpty}`}
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#star" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <p className={css.comment}>{comment}</p>
          </li>
        );
      })}
    </ul>
  );
}
