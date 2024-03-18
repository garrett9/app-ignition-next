'use client';

import { useState } from 'react';

import {
  Button,
  Link as MuiLink,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../providers/AuthProvider';

export function AppToolbar() {
  const t = useTranslations();
  const router = useRouter();
  const [anchor, setAnchor] = useState<HTMLElement>();
  const [user, setUser] = useAuth();
  const { $fetch: logout } = useFetch({
    path: '/logout',
    onSuccess: () => {
      setUser(undefined);
      setAnchor(undefined);
      router.refresh();
    },
  });

  return (
    <Toolbar>
      <MuiLink component={Link} href="/" variant="h6" sx={{ flexGrow: 1 }}>
        {process.env.NEXT_PUBLIC_APP_NAME}
      </MuiLink>
      <Stack direction="row" alignItems="center">
        {!user && (
          <>
            <Button
              component={Link}
              variant="text"
              color="inherit"
              href="/login"
            >
              {t('Common.login')}
            </Button>
            <Button
              component={Link}
              variant="text"
              color="inherit"
              href="/register"
            >
              {t('Common.register')}
            </Button>
          </>
        )}
        {user && (
          <>
            <Button
              color="inherit"
              variant="text"
              onClick={(e) => setAnchor(e.currentTarget)}
            >
              {user.name}
            </Button>
            <Menu
              open={!!anchor}
              anchorEl={anchor}
              onClose={() => setAnchor(undefined)}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Stack>
    </Toolbar>
  );
}
