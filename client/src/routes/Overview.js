import React from 'react';
import Dashboard from '../components/Dashboard';
import useTitle from '../hooks/use-title';
import parseXml from '../xmlParser';
import axios from 'axios';

function createData(obj) {
  const basicData = obj.Envelope.Body.consultarProcessoResposta.processo.dadosBasicos;
  const movements = obj.Envelope.Body.consultarProcessoResposta.processo.movimento;

  const interestedPart = basicData?.polo.find(polo => polo.polo === 'AT')?.parte;

  return {
      name: 'Teste',
      claimed: interestedPart.pessoa.nome,
      lawyer: interestedPart.advogado[0].nome,
      court: basicData.orgaoJulgador.nomeOrgao,
      processNumber: basicData.numero,
      value: basicData.valorCausa,
      history: [
          { date: '2020-01-05', customerId: '11091700', amount: 3 },
          { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
      ],
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