import { LinearProgress, Paper } from "@mui/material";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
        <LinearProgress color="inherit" />
        <Paper sx={{ minHeight: '100vh' }}>
            {children}
        </Paper>
        </>
    )
}