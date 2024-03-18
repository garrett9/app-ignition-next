'use client';

import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useFetch } from '../../../../../hooks/useFetch';

interface ResetPasswordCredentials {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

export default function PasswordReset() {
  const router = useRouter();
  const t = useTranslations();

  const params = useParams<{ token: string }>();
  const searchParams = useSearchParams();

  const [creds, setCreds] = useState<ResetPasswordCredentials>({
    email: searchParams.get('email') || '',
    password: '',
    password_confirmation: '',
    token: params.token.toString(),
  });
  const { $fetch, errors, inProgress } = useFetch<
    void,
    ResetPasswordCredentials
  >({
    path: '/reset-password',
    init: {
      body: creds,
    },
    onSuccess: () => {
      router.push('/login');
    },
  });

  return (
    <Card component="form" onSubmit={$fetch}>
      <CardHeader
        sx={{ textAlign: 'center' }}
        title={t('ResetPassword.heading')}
      />
      <CardContent
        sx={{
          textAlign: 'center',
        }}
      >
        <Stack>
          <TextField
            required
            value={creds.email}
            label={t('Forms.email')}
            placeholder={t('Forms.email')}
            type="email"
            error={!!errors.email}
            helperText={errors.email?.[0]}
            onChange={(e) =>
              setCreds({
                ...creds,
                email: e.target.value,
              })
            }
          />
          <TextField
            required
            value={creds.password}
            label={t('Forms.password')}
            placeholder={t('Forms.password')}
            type="password"
            error={!!errors.password}
            helperText={errors.password?.[0]}
            onChange={(e) =>
              setCreds({
                ...creds,
                password: e.target.value,
              })
            }
          />
          <TextField
            required
            value={creds.password_confirmation}
            label={t('Forms.confirmPassword')}
            placeholder={t('Forms.confirmPassword')}
            type="password"
            onChange={(e) =>
              setCreds({
                ...creds,
                password_confirmation: e.target.value,
              })
            }
          />
        </Stack>
      </CardContent>
      <CardActions>
        <LoadingButton loading={inProgress} type="submit" variant="contained">
          {t('ResetPassword.cta')}
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
