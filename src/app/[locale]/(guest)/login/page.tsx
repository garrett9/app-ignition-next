'use client';

import { ChangeEvent, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useFetch } from '../../../../hooks/useFetch';
import { clientFetch } from '../../../../lib/client/clientFetch';
import { useAuth } from '../../../../providers/AuthProvider';
import { User } from '../../../../types/api';

interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const t = useTranslations();
  const [_, setUser] = useAuth();
  const router = useRouter();
  const [creds, setCreds] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember: false,
  });

  const {
    $fetch: login,
    errors,
    inProgress,
  } = useFetch<void, LoginCredentials>({
    path: '/login',
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
    <Card component="form" onSubmit={login}>
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
            label={t('Forms.email')}
            placeholder={t('Forms.email')}
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
            label={t('Forms.password')}
            placeholder={t('Forms.password')}
            type="password"
            onChange={(e) =>
              setCreds({
                ...creds,
                password: e.target.value,
              })
            }
          />
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              value={creds.remember}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCreds({
                  ...creds,
                  remember: e.target.checked,
                })
              }
            />
          }
          label="Remember me"
        />
        <LoadingButton loading={inProgress} type="submit">
          {t('Login.cta')}
        </LoadingButton>
      </CardActions>
      <Divider
        sx={{
          mx: 3,
        }}
        variant="fullWidth"
      />
      <CardActions
        sx={{
          py: 3,
        }}
      >
        <Button
          component={Link}
          href="/forgot-password"
          fullWidth
          variant="text"
        >
          {t('Login.forgotPassword')}
        </Button>
      </CardActions>
    </Card>
  );
}
