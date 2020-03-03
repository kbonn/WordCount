const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let url = 'https://www.reviewgeek.com/';
let title = "";
let count = 0;

request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.featured-article h2').each((i, el) => {
            const title = $(el).text().replace(/,/g, '');
            const link = $(el).parent().attr('href');

            request(link, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);

                    $('p').each((i, el) => {
                        const word = $(el).text()
                        count += word.split(" ").length;
                    })
                    fs.appendFile('article.csv', `${title}, ${link}, ${count} \n`, (err) => {
                        if (err) throw err;
                    });
                    count = 0;
                }
            })
        });
    }
});