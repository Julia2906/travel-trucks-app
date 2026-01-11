'use client';

import css from './Features.module.css';
import { useQuery } from '@tanstack/react-query';
import { getCamperById } from '@/lib/api';
import { Camper } from '@/types/camper';

type Props = { id: string };

const DETAILS: Array<{ key: keyof Camper; label: string }> = [
  { key: 'form', label: 'Form' },
  { key: 'length', label: 'Length' },
  { key: 'width', label: 'Width' },
  { key: 'height', label: 'Height' },
  { key: 'tank', label: 'Tank' },
  { key: 'consumption', label: 'Consumption' },
];

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <li className={css.chip}>
      <svg className={css.chipIcon} width="20" height="20" aria-hidden="true">
        <use href={`/sprite.svg#${icon}`} />
      </svg>
      <span className={css.chipText}>{text}</span>
    </li>
  );
}

export default function Features({ id }: Props) {
  const { data: camper, isLoading, isError } = useQuery<Camper>({
    queryKey: ['camper', id],
    queryFn: () => getCamperById(id),
  });

  if (isLoading) return null;
  if (isError || !camper) return null;

  const chips = [
    camper.transmission ? { icon: 'diagram', text: camper.transmission } : null,
    camper.AC ? { icon: 'wind', text: 'AC' } : null,
    camper.engine ? { icon: 'fuel', text: camper.engine } : null,
    camper.kitchen ? { icon: 'cup-hot', text: 'Kitchen' } : null,
    camper.radio ? { icon: 'radio', text: 'Radio' } : null,
  ].filter(Boolean) as Array<{ icon: string; text: string }>;

  return (
    <section className={css.wrapper} aria-label="Camper features">
      <h3 className="visually-hidden">Features</h3>

      <ul className={css.chips}>
        {chips.map((c) => (
          <FeatureItem key={`${c.icon}-${c.text}`} icon={c.icon} text={c.text} />
        ))}
      </ul>

      <div className={css.details}>
        <h4 className={css.detailsTitle}>Vehicle details</h4>
        <div className={css.divider} />

        <dl className={css.detailsList}>
          {DETAILS.map(({ key, label }) => {
            const value = camper[key];
            if (!value) return null;

            return (
              <div key={String(key)} className={css.detailsRow}>
                <dt className={css.detailsKey}>{label}</dt>
                <dd className={css.detailsValue}>{String(value)}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
