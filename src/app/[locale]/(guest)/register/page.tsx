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
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useFetch } from '../../../../hooks/useFetch';
import { clientFetch } from '../../../../lib/client/clientFetch';
import { useAuth } from '../../../../providers/AuthProvider';
import { User } from '../../../../types/api';

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function Login() {
  const t = useTranslations();
  const router = useRouter();
  const [_, setUser] = useAuth();
  const [creds, setCreds] = useState<RegisterCredentials>({
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
  });

  const {
    $fetch: register,
    errors,
    inProgress,
  } = useFetch<void, RegisterCredentials>({
    path: '/register',
    init: {
      body: creds,
    },
    onSuccess: async () => {
      const response = await clientFetch<User>('/api/user');
      setUser(response);
      router.refresh();
    },
  });

  return (
    <Card component="form" onSubmit={register}>
      <CardHeader
        sx={{ textAlign: 'center' }}
        title={process.env.NEXT_PUBLIC_APP_NAME}
      />
      <CardContent
        sx={{
          textAlign: 'center',
        }}
      >
        <Stack>
          <TextField
            required
            value={creds.name}
            label={t('Register.name')}
            placeholder={t('Register.name')}
            error={!!errors.name}
            helperText={errors.name?.[0]}
            onChange={(e) =>
              setCreds({
                ...creds,
                name: e.target.value,
              })
            }
          />
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
        <LoadingButton loading={inProgress} type="submit">
          {t('Register.cta')}
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
