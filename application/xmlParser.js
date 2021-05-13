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

exports.parseXml = function (xmlData)
{
    var jsonObj = parser.parse(xmlData, options, true);
    return jsonObj;      
}
