'use client'
import React from 'react';
import { Typography, Box, Container, Grid, Card, CardContent, AppBar, Toolbar, IconButton } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import Theme from '../lib/Theme';

export default function about() {
  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ margin:"auto", my: 4, width:"75%" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Origin
                </Typography>
                <Typography variant="body1" paragraph>
                  Our story began with a heartbreaking news: a poor person stole fruit because they didn't have money to eat. This news touched our hearts and made us realize that many people were struggling to find food for their next meal. However, we also discovered that there are many kind-hearted restaurants willing to provide free meals. So, we decided to create a platform to integrate these resources, so that those in need can easily obtain these free meals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Our goal
                </Typography>
                <Typography variant="body1" paragraph>
                  Our goal is to connect individuals in need with restaurants willing to provide help through the free meal map platform. We hope that through this platform, not only can we solve the problem of hunger, but also promote community love and help.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Web features
                </Typography>
                <Typography variant="body1" paragraph>
                  Our platform provides the following features:
                </Typography>
                <Typography variant="body1" paragraph>
                  1. View restaurant supply situation: users can browse and search for nearby restaurants providing free meals, and understand the current supply situation of each restaurant.
                </Typography>
                <Typography variant="body1" paragraph>
                  2. Business information editing: registered businesses can edit and update meal information on the information page to ensure that users receive the latest supply information.
                </Typography>
                <Typography variant="body1" paragraph>
                  3. Resource integration: our platform will continue to collect and integrate more free resources to ensure that those in need can receive help.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>


  );
}
