import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

/**
 * @see https://next-intl-docs.vercel.app/docs/environments/error-files#not-foundjs
 */
export default function NotFoundPage() {
  return (
    <Grid container>
      <Grid item xs={0} md={3} />
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            p: 4,
          }}
        >
          <CardHeader
            sx={{ textAlign: 'center' }}
            title={<Typography variant="h3">404</Typography>}
          />
          <CardContent
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography variant="h5">Page Not Found</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
