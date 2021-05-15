import React from 'react';
import Dashboard from '../components/Dashboard';
import useTitle from '../hooks/use-title';
import parseXml from '../xmlParser';
import axios from 'axios';

function parseDateTime(stringValue) {
  const datePattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
  let matches = stringValue.match(datePattern);
  return new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6]);
}

function createData(obj) {
  const basicData = obj.Envelope.Body.consultarProcessoResposta.processo.dadosBasicos;
  const processHistory = obj.Envelope.Body.consultarProcessoResposta.processo.movimento;

  const interestedPart = basicData?.polo.find(polo => polo.polo === 'AT')?.parte;

  let history = []
  processHistory.sort((a, b) => b.dataHora - a.dataHora).forEach(movement => {
    history.push({
      dateTime: parseDateTime(movement.dataHora.toString()).toLocaleDateString(),
      message: movement.movimentoNacional?.complemento,
      documentId: movement.idDocumentoVinculado,
    });
  });

  return {
      name: 'Teste',
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
    if (this.state.rows.length > 0)
    {
      return null;
    }
    return axios.get(
      'teste.xml'
    )
      .then((response) => {
        const data = parseXml(response.data);

        this.setState({rows: [
          createData(data)
        ]});
    });
  }

  render() {
    this.fetchRowsAsync();
    
    return (
        <div>
            <h1>Overview</h1>
            <Dashboard rows={this.state.rows}/>
        </div>
    );
  }
}

export default Overview;