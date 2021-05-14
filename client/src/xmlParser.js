import he from 'he';
import parser from 'fast-xml-parser';

export default function (xmlData)
{
    var jsonObj = parser.parse(xmlData, options, true);
    return jsonObj;
}

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
