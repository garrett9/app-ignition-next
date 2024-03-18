import { ReactNode } from 'react';

import { AppBar, Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { authMiddleware } from '../../lib/server/authMiddleware';
import { AuthProvider } from '../../providers/AuthProvider';
import theme from '../../theme';
import { AppToolbar } from './AppToolbar';

export const metada: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'AppIgnition',
  description: 'Your description goes here...',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const user = await authMiddleware();

  return (
    <html lang={locale}>
      <body>
        <AppRouterCacheProvider>
          <NextIntlClientProvider messages={messages}>
            <AuthProvider user={user}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar
                  position="static"
                  sx={{
                    background: 'transparent',
                    boxShadow: 'none',
                  }}
                >
                  <Container>
                    <AppToolbar />
                  </Container>
                </AppBar>
                <Container>{children}</Container>
              </ThemeProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
