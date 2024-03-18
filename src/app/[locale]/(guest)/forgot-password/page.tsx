'use client';

import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslations } from 'next-intl';

import { useFetch } from '../../../../hooks/useFetch';

interface ForgotPasswordCredentials {
  email: string;
}

export default function Login() {
  const [creds, setCreds] = useState<ForgotPasswordCredentials>({
    email: '',
  });
  const t = useTranslations();
  const { $fetch, inProgress, succeeded, errors } = useFetch<
    void,
    ForgotPasswordCredentials
  >({
    path: '/forgot-password',
    init: {
      body: creds,
    },
  });

  return (
    <Card component="form" onSubmit={$fetch}>
      <CardHeader
        sx={{ textAlign: 'center' }}
        title={t('ForgotPassword.heading')}
      />
      <CardContent
        sx={{
          textAlign: 'center',
        }}
      >
        <Stack>
          {succeeded && (
            <Alert color="success">{t('ForgotPassword.success')}</Alert>
          )}
          <TextField
            required
            type="email"
            error={!!errors.email}
            helperText={errors.email?.[0]}
            onChange={(e) =>
              setCreds({
                ...creds,
                email: e.target.value,
              })
            }
            label={t('Forms.email')}
            placeholder={t('Forms.email')}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <LoadingButton loading={inProgress} type="submit" variant="contained">
          {t('ForgotPassword.cta')}
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
