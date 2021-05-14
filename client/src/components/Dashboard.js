import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from '../components/Row';

export default function Dasboard(props) {
    const { rows } = props;
    if (rows.length > 0) {
        debugger;
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell><b>Reclamante/Requerente</b></TableCell>
                    <TableCell><b>Reclamadas</b></TableCell>
                    <TableCell><b>ADV</b></TableCell>
                    <TableCell><b>Vara</b></TableCell>
                    <TableCell><b>Processo</b></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <Row key={row.name} row={row} />
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
