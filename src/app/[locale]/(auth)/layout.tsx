import { ReactNode } from 'react';

import { Box } from '@mui/material';

import { authMiddleware } from '../../../lib/server/authMiddleware';

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await authMiddleware(['auth']);

  return <Box>{children}</Box>;
}
