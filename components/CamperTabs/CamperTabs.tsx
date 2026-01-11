'use client';

import { useState } from 'react';
import Features from '@/components/Features/Features';
import Reviews from '@/components/Reviews/Reviews';
import css from './CamperTabs.module.css';

type TabType = 'features' | 'reviews';

type Props = {
  id: string;
};

export default function CamperTabs({ id }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('features');

  return (
    <section>
      <div className={css.tabs}>
        <button
          type="button"
          className={`${css.tab} ${activeTab === 'features' ? css.active : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>

        <button
          type="button"
          className={`${css.tab} ${activeTab === 'reviews' ? css.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={css.content}>
        {activeTab === 'features' && <Features id={id} />}
        {activeTab === 'reviews' && <Reviews id={id} />}
      </div>
    </section>
  );
}
