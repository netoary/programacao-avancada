import React from 'react';
import { withStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
        tagCell: {
        flexWrap: 'wrap',
    }
  });

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class RegisterProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            processNumber: '',
            found: false,
            alertVisible: false,
            obj : null
        };
        this.onReceivedProcess = props.onReceivedProcess;
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchProcessAsync = this.fetchProcessAsync.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
    }


    handleAddButtonClick = () => {
        if (!this.state.open)
        {
            this.setState({open: !this.state.open});
            return;
        }

        if (this.state.processNumber.length > 0)
        {
            this.fetchProcessAsync(this.state.processNumber);
        }
    };

    handleChange(e)
    {
        this.setState({ processNumber: e.target.value });
    }

    handleResult(success)
    {
        this.setState({found: success});
        this.setState({alertVisible: true});
    }
    
    handleCloseAlert(event, reason)
    {
        if (reason === 'clickaway')
        {
            return;
        }
        this.setState({alertVisible: false});
    };

    async fetchProcessAsync(processNumber) {
        return axios.get('http://127.0.0.1:3001/api/registerProcess/' + processNumber, { validateStatus: false })
            .then((response) => {
                if (response.status === 404) {
                    this.handleResult(false);
                }
                else {
                    this.handleResult(true);
                    this.setState({open: false});
                    this.setState({processNumber: ''});
                    if (response.status === 200) {
                        this.onReceivedProcess(response.data);
                    }
                }
            });
    }

    render(){
        return (
            <Grid container justify="flex-end" alignItems="center">
                {this.state.open ? <TextField type="text" size="small" variant="outlined" placeholder="Número do processo" onChange={ this.handleChange }/> : null }
                <IconButton aria-label="expand row" size="large" onClick={this.handleAddButtonClick}>
                    <AddIcon />
                </IconButton>

                <Snackbar open={this.state.alertVisible && this.state.found} autoHideDuration={3000} onClose={this.handleCloseAlert}>
                    <Alert onClose={this.handleCloseAlert} severity="success">
                        Processo registrado com sucesso
                    </Alert>
                </Snackbar>
                
                <Snackbar open={this.state.alertVisible && !this.state.found} autoHideDuration={3000} onClose={this.handleCloseAlert}>
                    <Alert onClose={this.handleCloseAlert} severity="error">
                        Processo não encontrado
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }
}

export default withStyles(styles, { withTheme: true })(RegisterProcess);
