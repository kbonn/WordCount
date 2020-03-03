const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('article.csv');

writeStream.write(`Title,Link,Count \n`);

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
                    writeStream.write(`${title}, ${link}, ${count} \n`);
                    count = 0;
                }
            })
        });
    }
});