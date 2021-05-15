import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

class RowChild extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                Detalhes
                </Typography>
                <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell>Mensagem</TableCell>
                        <TableCell>Documento</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="this.row">
                        {historyRow.dateTime}
                        </TableCell>
                        <TableCell>{historyRow.message}</TableCell>
                        <TableCell>{historyRow.documentId}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </Box>
        )
    }
}

export default RowChild;