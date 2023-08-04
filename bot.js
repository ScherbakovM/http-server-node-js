const http = require('http');
const { parse } = require('querystring');
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('5987147832:AAGdiCXLivYK8BbyfpIzOBjU4ydgE8crv0c');
bot.start((ctx) => ctx.reply(`Привет!, ${ctx.message.chat.id}`));
bot.help((ctx) => ctx.reply('List command'));
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


http.createServer((request, response) => {
    console.log('server work');
    console.log(request.method);

    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        let params = parse(body);
        let name = params.name;
        let phone = params.phone;
        response.end('ok');
        send_message(name, phone);
    });
}).listen(3000);

function send_message(arg1, arg2) {
    if (arg1 != undefined && arg2 != undefined) {
        bot.telegram.callApi("sendMessage", { chat_id: 910275605, text: `${arg1}\n${arg2} ` });
    }
}

