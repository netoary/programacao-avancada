import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import History from './History';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DataGrid, useGridSlotComponentProps, ptBR } from '@material-ui/data-grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const theme = createMuiTheme(
  ptBR,
);
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            history: []
        };

        this.columns = [
            { field: 'name', headerName: 'Reclamante/Requerente', flex: 1,
                renderCell: (params) => (
                    <span>
                        <IconButton aria-label="expand row" size="small" onClick={() => {
                        this.handleModalOpen();
                        this.handleHistory(params.rowIndex);
                        }}>
                            <SearchIcon/>
                        </IconButton>
                        {params.value}
                    </span>
                )
            },
            { field: 'claimed', headerName: 'Reclamadas', flex: 0.8  },
            { field: 'lawyer', headerName: 'ADV', flex: 0.8 },
            { field: 'court', headerName: 'Vara', width: 200 },
            { field: 'id', headerName: 'Processo', width: 175 },
            { field: 'tags', headerName: 'Tags', width: 150, overflow:'wrap',
                renderCell: (params) => (
                    params.value.map((tag) => (
                        <Chip variant="outlined" color="secondary" size="small" label={tag} />
                      ))
                ),
            } ];

        this.handleHistory = this.handleHistory.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
    }

    handleHistory = (value) => {
        console.log(value)
        let history = this.props.rows[value];
        this.setState({history: history});
        console.log(this.state)
    };

    handleModalOpen = () => {
        this.setState({open: !this.state.open});
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
            <div style={{ height: 400, width: '100%' }}>
                
            <ThemeProvider theme={theme}>
                <DataGrid 
                    rows={this.props.rows}
                    columns={this.columns} />
            </ThemeProvider>
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
            </div>
        );
    }
}

export default Dashboard;
