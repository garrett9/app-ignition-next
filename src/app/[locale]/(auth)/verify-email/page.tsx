'use client';

import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';

import { useFetch } from '../../../../hooks/useFetch';

export default function VerifyEmail() {
  const t = useTranslations('VerifyEmail');
  const { $fetch, succeeded, inProgress } = useFetch({
    path: '/email/verification-notification',
    init: {
      method: 'POST',
    },
  });

  return (
    <Card component="form" onSubmit={$fetch}>
      <CardContent>
        <Stack>
          <Typography>{t('heading')}</Typography>
          {succeeded && <Alert color="success">{t('resendSuccess')}</Alert>}
        </Stack>
      </CardContent>
      <CardActions>
        <LoadingButton type="submit" loading={inProgress}>
          {t('cta')}
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
