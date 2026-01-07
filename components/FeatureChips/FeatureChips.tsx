import css from "./FeatureChips.module.css";
import type { Camper } from "@/lib/api";

// 1) мапа булевих фіч
const booleanFeatures: Array<{
  key: keyof Camper;
  label: string;
  icon: React.ReactNode; // якщо додаси іконки
}> = [
    {
    key: "kitchen",
    label: "Kitchen",
    icon: (
      <svg width={20} height={20} aria-hidden="true">
        <use href="/sprite.svg#cup-hot" />
      </svg>
    ),
  },
  {
    key: "AC",
    label: "AC",
    icon: (
      <svg width={20} height={20} aria-hidden="true">
        <use href="/sprite.svg#wind" />
      </svg>
    ),
  },

  // {
  //   key: "bathroom",
  //   label: "Bathroom",
  //   icon: (
  //     <svg width={20} height={20} aria-hidden="true">
  //       <use href="/sprite.svg#ph_shower" />
  //     </svg>
  //   ),
  // },
  // {
  //   key: "TV",
  //   label: "TV",
  //   icon: (
  //     <svg width={20} height={20} aria-hidden="true">
  //       <use href="/sprite.svg#tv" />
  //     </svg>
  //   ),
  // },
  // {
  //   key: "radio",
  //   label: "Radio",
  //   icon: (
  //     <svg width={20} height={20} aria-hidden="true">
  //       <use href="/sprite.svg#radio" />
  //     </svg>
  //   ),
  // },
  // {
  //   key: "refrigerator",
  //   label: "Refrigerator",
  //   icon: (
  //     <svg width={20} height={20} aria-hidden="true">
  //       <use href="/sprite.svg#solar_fridge-outline" />
  //     </svg>
  //   ),
  // },
  // {
  //   key: "microwave",
  //   label: "Microwave",
  //   icon: (
  //     <svg width={20} height={20} aria-hidden="true">
  //       <use href="/sprite.svg#lucide_microwave" />
  //     </svg>
  //   ),
  // },
  // {
  //   key: "gas",
  //   label: "Gas",
  //   icon: (
  //     <svg width={20} height={20} aria-hidden="true">
  //       <use href="/sprite.svg#hugeicons_gas-stove" />
  //     </svg>
  //   ),
  // },
  // {
  //   key: "water",
  //   label: "Water",
  //   icon: (
  //     <svg width={20} height={20} aria-hidden="true">
  //       <use href="/sprite.svg#ion_water-outline" />
  //     </svg>
  //   ),
  // },
];

type Chip = { label: string; icon: React.ReactNode };

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
    item.transmission
      ? {
          label: formatTransmission(item.transmission),
          icon: (
            <svg width={20} height={20} aria-hidden="true">
              <use href="/sprite.svg#diagram" />
            </svg>
          ),
        }
      : null,
    item.engine
      ? {
          label: formatEngine(item.engine),
          icon: (
            <svg width={20} height={20} aria-hidden="true">
              <use href="/sprite.svg#fuel" />
            </svg>
          ),
        }
      : null,
  ].filter(Boolean) as Chip[];

  const boolChips = booleanFeatures
    .filter((f) => Boolean(item[f.key]))
    .map((f) => ({ label: f.label, icon: f.icon })) as Chip[];

  const chips: Chip[] = [...textChips, ...boolChips];
  return (
    <ul className={css.list}>
      {chips.map((chip) => (
        <li key={chip.label} className={css.chip}>
          <span className={css.icon}>{chip.icon}</span>
          <span className={css.text}>{chip.label}</span>
        </li>
      ))}
    </ul>
  );
}
