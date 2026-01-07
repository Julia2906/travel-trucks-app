"use client";
import { useState } from "react";
import css from "./FavoriteButton.module.css";

type Props = {
  initial?: boolean;
  onToggle?: (value: boolean) => void;
};

export default function FavoriteButton({ initial = false, onToggle }: Props) {
  const [active, setActive] = useState(initial);

  const toggle = () => {
    const next = !active;
    setActive(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Add to favorites"
      className={`${css.btn} ${active ? css.active : ""}`}
    >
          <svg className={css.icon} width='26' height='24' aria-hidden='true'>
              <use href="/sprite.svg#heart"/>
      </svg>
    </button>
  );
}
