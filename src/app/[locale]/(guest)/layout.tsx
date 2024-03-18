import { ReactNode } from 'react';

import { Grid } from '@mui/material';

import { authMiddleware } from '../../../lib/server/authMiddleware';

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await authMiddleware(['guest']);

  return (
    <Grid container>
      <Grid item xs={0} md={3} />
      <Grid item xs={12} md={6}>
        {children}
      </Grid>
    </Grid>
  );
}
