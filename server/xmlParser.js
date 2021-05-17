const parser = require('fast-xml-parser');
const he = require('he');

var options = {
    attributeNamePrefix : "",
    textNodeName : "#text",
    ignoreAttributes : false,
    ignoreNameSpace : true,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : true,
    trimValues: true,
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false,
    attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
};


function parseDateTime(stringValue) {
    const datePattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
    let matches = stringValue.match(datePattern);
    return new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6]);
}

function createData(obj) {
    const basicData = obj.Envelope.Body.consultarProcessoResposta.processo.dadosBasicos;
    const processHistory = obj.Envelope.Body.consultarProcessoResposta.processo.movimento;
  
    const requestingPart = basicData.polo.find(polo => polo.polo === 'PA').parte;
    const interestedPart = basicData.polo.find(polo => polo.polo === 'AT').parte;
    
    let history = []
    processHistory.sort((a, b) => b.dataHora - a.dataHora).forEach(movement => {
      history.push({
        dateTime: parseDateTime(movement.dataHora.toString()).toLocaleString(),
        message: movement.movimentoNacional.complemento,
        documentId: movement.idDocumentoVinculado,
      });
    });
    
    return {
        name: requestingPart.pessoa.nome,
        date: basicData.dataAjuizamento,
        claimed: interestedPart.pessoa.nome,
        lawyer: interestedPart.advogado[0].nome,
        court: basicData.orgaoJulgador.nomeOrgao,
        id: basicData.numero,
        value: basicData.valorCausa,
        history: history,
        tags: basicData.tags,
    };
  }
  

exports.parseXml = function (xmlData)
{
    var jsonObj = parser.parse(xmlData, options, true);
    return createData(jsonObj);      
}