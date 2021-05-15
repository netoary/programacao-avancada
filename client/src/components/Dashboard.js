import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Row from '../components/Row';
import Modal from '@material-ui/core/Modal';
import History from './History';
import { makeStyles } from '@material-ui/core/styles';

class Dashboard extends React.Component {
// (props) {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            open: false,
            history: []
        };
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleHistory = this.handleHistory.bind(this);
    }
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // const [open, setOpen] = React.useState(false);
    // const [history, setHistory] = React.useState();
    // const { rows } = props;
    // if (this.props.rows.length > 0) {
    //     debugger;
    // }

    handleModalOpen = () => {
        this.setState({open: !this.state.open});
    };

    handleHistory = (value) => {
        console.log(value)
        this.setState({history: value});
        console.log(this.state)
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };
    
    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
    };

    useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            },
    }));

    render(){
        return (
            <>
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
                    {(this.state.rowsPerPage > 0
                        ? this.props.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                        : this.props.rows).map((row) => (
                            <Row key={row.name} row={row} modalOpen={this.handleModalOpen} history={this.handleHistory}/>
                    ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={this.props.rows.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Modal open={this.state.open}
              onClose={this.handleModalOpen}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description">
              <div style={{backgroundColor: 'white', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', overflow: 'scroll', height: '70%'}}>
                <TableContainer component={Paper}>
                    <TableBody>
                        <History row={this.state.history}/>
                    </TableBody>
                </TableContainer>
            </div>
            </Modal>
            </>
        );
    }
}

export default Dashboard;
