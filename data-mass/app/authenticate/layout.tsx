import { Container, Stack, Box, LinearProgress, Paper } from '@mui/material'

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
      <Paper>
        <Box display='flex' justifyContent='center' alignItems="center" height="100vh" width='100%' >
          <LinearProgress color="inherit" />
          <Container maxWidth='xs'>
          <Stack
          direction="column"
          spacing={2}
          >
              {children}
          </Stack>
          </Container> 
        </Box>
      </Paper>
    )
}