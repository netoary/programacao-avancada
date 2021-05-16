import React from 'react';
import Dashboard from '../components/Dashboard';
import useTitle from '../hooks/use-title';
import axios from 'axios';

function parseDateTime(stringValue) {
  const datePattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
  let matches = stringValue.match(datePattern);
  return new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6]);
}

function createData(obj) {
  const basicData = obj.Envelope.Body.consultarProcessoResposta.processo.dadosBasicos;
  const processHistory = obj.Envelope.Body.consultarProcessoResposta.processo.movimento;

  const interestedPart = basicData.polo.find(polo => polo.polo === 'AT').parte;

  let history = []
  processHistory.sort((a, b) => b.dataHora - a.dataHora).forEach(movement => {
    history.push({
      dateTime: parseDateTime(movement.dataHora.toString()).toLocaleDateString(),
      message: movement.movimentoNacional.complemento,
      documentId: movement.idDocumentoVinculado,
    });
  });

  return {
      name: obj.fileName,
      date: basicData.dataAjuizamento,
      claimed: interestedPart.pessoa.nome,
      lawyer: interestedPart.advogado[0].nome,
      court: basicData.orgaoJulgador.nomeOrgao,
      processNumber: basicData.numero,
      value: basicData.valorCausa,
      history: history,
  };
}

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    }
  }

  async fetchRowsAsync() {
    return axios.get('http://127.0.0.1:3001/api/getRegistredProcess')
      .then((response) => {

        this.setState({rows: response.data.map(createData)});
    });
  }

  render() {
    return (
        <div>
            <h1>Overview</h1>
            <Dashboard rows={this.state.rows}/>
        </div>
    );
  }

  componentDidMount()
  {
    this.fetchRowsAsync();
  }
}

export default Overview;