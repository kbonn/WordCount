const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('article.csv');

writeStream.write(`Title,Link \n`);

let url = 'https://www.reviewgeek.com/';

request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.featured-article h2').each((i, el) => {
            const title = $(el).text().replace(/,/g, '');
            const link = $(el).parent().attr('href');

            writeStream.write(`${title}, ${link} \n`);

            console.log(title.split(" ").length);
        });
    }
});
