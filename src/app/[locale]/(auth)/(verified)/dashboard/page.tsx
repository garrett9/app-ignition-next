import { useTranslations } from 'next-intl';

import LandingCards from '../../../../../components/LandingCards';

export default function Dashboard() {
  const t = useTranslations('Dashboard');

  return <LandingCards title={t('heading')} subtitle={t('subtext')} />;
}
