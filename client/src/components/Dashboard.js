import React from 'react';
import Modal from '@material-ui/core/Modal';
import History from './History';
import { withStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { DataGrid, ptBR, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import RegisterProcess from './RegisterProcess';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const theme = createMuiTheme(
  ptBR,
);

const styles = theme => ({
    tagCell: {
        flexWrap: 'wrap',
    },
    rows: {
        display: 'flex'
    }
  });

function CustomToolBar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        const { classes } = this.props;
        this.state = {
            open: false,
            history: [],
            rows: this.props.rows,
            removed: false,
            alertVisible: false,
        };

        this.columns = [
            { field: 'search', headerName: '', width: 50, renderCell: (params) => (
                <IconButton aria-label="expand row" size="small" onClick={() => {
                this.handleModalOpen();
                this.handleHistory(params.rowIndex);
                }}>
                    <SearchIcon/>
                </IconButton>
            )},
            { field: 'name', headerName: 'Reclamante/Requerente', flex: 1 },
            { field: 'claimed', headerName: 'Reclamadas', flex: 0.8  },
            { field: 'lawyer', headerName: 'ADV', flex: 0.8 },
            { field: 'court', headerName: 'Vara', width: 200 },
            { field: 'id', headerName: 'Processo', width: 175 },
            { field: 'tags', headerName: 'Tags', width: 150, cellClassName:classes.tagCell,
                renderCell: (params) => (
                    params.value == null ? null : 
                    params.value.map((tag) => (
                        <Chip variant="outlined" color="secondary" size="small" label={tag} />
                      ))
                ),
            },
            { field: 'remove', headerName: '', width: 50, renderCell: (params) => (
                <IconButton aria-label="expand row" size="small" onClick={() => {
                this.requestRemoveProcess(params.rowIndex);
                }}>
                    <DeleteIcon />
                </IconButton>
            )}
        ];

        this.handleHistory = this.handleHistory.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
        this.handleRemoveResult = this.handleRemoveResult.bind(this);
        this.onReceivedProcess = this.onReceivedProcess.bind();
    }

    handleHistory = (rowId) => {
        console.log(rowId)
        let history = this.state.rows[rowId];
        this.setState({history: history});
        console.log(this.state)
    };

    handleModalOpen = () => {
        this.setState({open: !this.state.open});
    };

    onReceivedProcess = (obj) => {
        this.setState( {rows: this.state.rows.concat(obj) });
    };
    
    async requestRemoveProcess(rowId) {
        let process = this.state.rows[rowId];
        return axios.post('http://127.0.0.1:3001/api/unregisterProcess/', 
            { number: process.id }, { validateStatus: false })
            .then((response) => {
                if (response.status === 404) {
                    this.handleRemoveResult(false, rowId);
                }
                else {
                    this.handleRemoveResult(true, rowId);
                }
            });
    }

    handleRemoveResult(success, rowId)
    {
        this.setState({removed: success});
        this.setState({alertVisible: true});
        if (success)
        {
            debugger;
            const newRows = [...this.state.rows];
            newRows.splice(rowId, 1);
            this.setState( {rows: newRows });
        }
    }
    
    handleCloseAlert(event, reason)
    {
        if (reason === 'clickaway')
        {
            return;
        }
        this.setState({alertVisible: false});
    };

    render(){
        const { classes } = this.props;

        return (
            <div style={{ height: 400, width: '100%' }}>
            <RegisterProcess onReceivedProcess={this.onReceivedProcess}/>
            <ThemeProvider theme={theme}>
                <DataGrid 
                    getRowClassName={classes.rows}
                    rows={this.state.rows}
                    columns={this.columns}
                    components={{
                        Toolbar: CustomToolBar,
                    }}
                />
            </ThemeProvider>
            <Modal open={this.state.open}
              onClose={this.handleModalOpen}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description">
              <div style={{backgroundColor: 'white', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', overflow: 'scroll', height: '70%'}}>
                <History row={this.state.history}/>
              </div>
            </Modal>
            
            <Snackbar open={this.state.alertVisible && this.state.removed} autoHideDuration={3000} onClose={this.handleCloseAlert}>
                <Alert onClose={this.handleCloseAlert} severity="success">
                    Processo removido com sucesso
                </Alert>
            </Snackbar>
            
            <Snackbar open={this.state.alertVisible && !this.state.removed} autoHideDuration={3000} onClose={this.handleCloseAlert}>
                <Alert onClose={this.handleCloseAlert} severity="error">
                    Processo não encontrado
                </Alert>
            </Snackbar>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
