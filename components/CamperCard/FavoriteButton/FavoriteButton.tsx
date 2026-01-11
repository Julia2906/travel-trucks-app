"use client";

import css from "./FavoriteButton.module.css";
import { useCampersStore } from "@/lib/store/camperStore";
import type { Camper } from "@/types/camper";

type Props = {
  camper: Camper;
};

export default function FavoriteButton({ camper }: Props) {
  const isFavorite = useCampersStore((s) => s.isFavorite(camper.id));
  const addFavorite = useCampersStore((s) => s.addFavorite);
  const removeFavorite = useCampersStore((s) => s.removeFavorite);

  const onToggle = () => {
    if (isFavorite) {
      removeFavorite(camper.id);
    } else {
      addFavorite(camper);
    }
  };

  return (
    <button
      type="button"
      className={css.button}
      aria-pressed={isFavorite}
      onClick={onToggle}
    >
      <svg width="24" height="21" aria-hidden="true">
        <use href={`/sprite.svg#${isFavorite ? "red_heart" : "heart"}`} />
      </svg>
    </button>
  );
}
