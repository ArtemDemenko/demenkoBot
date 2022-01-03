const {
    Telegraf,
    Markup
} = require('telegraf')
require('dotenv').config()

const text = require('./const');



const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('start', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Семья Деменко</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Артем', 'btn_1'), Markup.button.callback('Лиза', 'btn_2')],
                [Markup.button.callback('Алиса', 'btn_3'), Markup.button.callback('Агата', 'btn_4')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }

})
function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (e) {
            console.error(e)
        }
    })
}

addActionBot('btn_1', './img/1.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', './img/3.jpg', text.text3)
addActionBot('btn_4', './img/4.jpg', text.text4)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))