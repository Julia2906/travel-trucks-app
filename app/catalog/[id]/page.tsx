import css from './page.module.css'
import { getCamperById } from '@/lib/api';
import CamperInfoBlock from '@/components/CamperInfoBlock/CamperInfoBlock';
import CamperTabs from '@/components/CamperTabs/CamperTabs';
import BookingForm from '@/components/BookingForm/BookingForm';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Details({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['camper', id],
    queryFn: () => getCamperById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperInfoBlock />
      <section>
        <div className={` container ${css.wrapper}`}><CamperTabs id={id} />
      <BookingForm /></div>
              
      </section>
    </HydrationBoundary>
  );
}
