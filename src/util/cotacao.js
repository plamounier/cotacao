var request = require('request');

const api_token = 'fmNfF6nlKfTqktxHWT6GFLcV3JLecRgwgGWIsu09vvRL1P3Bz4T2DfWhHbDP';


const cotacao = (ativo, callback) => {

    const url = `https://www.worldtradingdata.com/api/v1/stock?symbol=${ativo}&api_token=${api_token}`;

    request({url:url, json: true},(err, response) => {

        if (err) {
            callback({
                message: `Ocorreu um erro: ${err}`,
                code: 500
            }, undefined);
        }
        
        if(response.body === undefined || response.body.data === undefined){
            callback({
                message: `Dados não encontrados.`,
                code: 404
            }, undefined);
        }


        const parsedJSON = response.body.data[0];
        // Por convenção de nomes ele já pega os dados definidos neste destructing
            const {symbol, price_open, price, day_high, day_low} = parsedJSON;

            callback(undefined, {symbol, price_open, price, day_high, day_low});
        });
}

module.exports = cotacao