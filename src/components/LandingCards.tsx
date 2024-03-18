import { ReactNode } from 'react';

import { Code, Dashboard, Javascript, RocketLaunch } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  SvgIconTypeMap,
  Typography,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useTranslations } from 'next-intl';

interface CardProps {
  title: string;
  description: string;
  href: string;
  icon: OverridableComponent<SvgIconTypeMap>;
}

const cards: CardProps[] = [
  {
    title: 'nextJsDocumentation',
    description: 'nextJsDocumentationDescription',
    icon: Javascript,
    href: 'https://nextjs.org',
  },
  {
    title: 'muiDocumentation',
    description: 'muiDocumentationDescription',
    icon: Dashboard,
    href: 'https://mui.com',
  },
  {
    title: 'muiTheming',
    description: `muiDescription`,
    icon: Code,
    href: 'https://mui.com/material-ui/customization/theming',
  },
  {
    title: 'appIgnitionDocumentation',
    description: `appIgnitionDocumentationDescription`,
    icon: RocketLaunch,
    href: 'https://github.com/garrett9/app-ignition-next',
  },
];

export interface LandingCardsProps {
  title: ReactNode;
  subtitle?: ReactNode;
}

export default function LandingCards({ title, subtitle }: LandingCardsProps) {
  const t = useTranslations('Landing');

  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        sx={{
          pb: 7,
        }}
      >
        <Stack>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            {subtitle}
          </Typography>
        </Stack>
      </Grid>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Grid item xs={6} key={card.title}>
            <Card
              sx={{
                height: 1,
              }}
            >
              <CardActionArea
                href={card.href}
                target="_blank"
                sx={{
                  p: 2,
                  height: 1,
                }}
              >
                <CardHeader
                  title={
                    <Stack direction="row" alignItems="center">
                      <Icon fontSize="large" />
                      <div>{t(card.title)}</div>
                    </Stack>
                  }
                  sx={{
                    color: 'info.main',
                  }}
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    {t(card.description)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
