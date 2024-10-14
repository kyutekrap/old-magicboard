import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import { connect } from 'react-redux';
import * as tp from '@/types'

interface FileModel {
    name: string
    date: string
    src: string
    size: number
}

const rows: FileModel[] = [];

function BasicTable() {
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center" style={{ width: '16.67%' }}>Uploaded On</TableCell>
                <TableCell align="center" style={{ width: '16.67%' }}>Size&nbsp;(mb)</TableCell>
                <TableCell align="center" style={{ width: '16.67%' }}>Download</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.length > 0 ? (
                rows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="center" style={{ width: '16.67%' }}>{row.date}</TableCell>
                    <TableCell align="center" style={{ width: '16.67%' }}>{row.size}</TableCell>
                    <TableCell align="center" style={{ width: '16.67%' }}>{row.src}</TableCell>
                    </TableRow>
                ))
            ): (
                <TableRow>
                    <TableCell colSpan={4} align="center" style={{paddingTop: '80px', paddingBottom: '80px'}}>
                        <Typography variant="body2" color="textSecondary">No data to show</Typography>
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

const Page2 = ({
    guestStrings
}: {
    guestStrings: Record<string, string>
}) => {
    return (
        <Stack
        direction='column'
        spacing={2}
        >
            <Typography variant='h6'>{guestStrings["docuRepo"]}</Typography>
            {BasicTable()}
        </Stack>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    guestStrings: state.guestStrings,
})

const mapDispatchToProps = (dispatch: any) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Page2)
