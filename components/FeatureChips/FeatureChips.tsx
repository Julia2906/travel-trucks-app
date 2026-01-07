import css from "./FeatureChips.module.css";
import type { Camper } from "@/lib/api";

// 1) мапа булевих фіч
const booleanFeatures: Array<{
  key: keyof Camper;
  label: string;
  // icon?: React.ReactNode; // якщо додаси іконки
}> = [
  { key: "AC", label: "AC" },
  { key: "kitchen", label: "Kitchen" },
  { key: "bathroom", label: "Bathroom" },
  { key: "TV", label: "TV" },
  { key: "radio", label: "Radio" },
  { key: "refrigerator", label: "Refrigerator" },
  { key: "microwave", label: "Microwave" },
  { key: "gas", label: "Gas" },
  { key: "water", label: "Water" },
];

function formatTransmission(v: string) {
  if (!v) return "";
  return v[0].toUpperCase() + v.slice(1); // automatic -> Automatic
}

function formatEngine(v: string) {
  if (!v) return "";
  return v[0].toUpperCase() + v.slice(1); // diesel -> Diesel
}

export default function FeatureChips({ item }: { item: Camper }) {
  // 2) текстові “чіпи”
  const textChips = [
    item.transmission ? { label: formatTransmission(item.transmission) } : null,
    item.engine ? { label: formatEngine(item.engine) } : null,
  ].filter(Boolean) as Array<{ label: string }>;

  // 3) булеві “чіпи”
  const boolChips = booleanFeatures
    .filter(f => Boolean(item[f.key]))
    .map(f => ({ label: f.label }));

  const chips = [...textChips, ...boolChips];

  return (
    <ul className={css.list}>
      {chips.map(chip => (
        <li key={chip.label} className={css.chip}>
          {/* <span className={css.icon}>{chip.icon}</span> */}
          <span className={css.text}>{chip.label}</span>
        </li>
      ))}
    </ul>
  );
}
