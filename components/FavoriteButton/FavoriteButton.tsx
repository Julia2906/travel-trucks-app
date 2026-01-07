"use client";
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
      <Heart className={css.icon} />
    </button>
  );
}
