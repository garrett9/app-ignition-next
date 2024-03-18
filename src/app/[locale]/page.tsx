import { useTranslations } from 'next-intl';

import LandingCards from '../../components/LandingCards';

export default function Home() {
  const t = useTranslations('Landing');

  return <LandingCards title={t('title')} />;
}
