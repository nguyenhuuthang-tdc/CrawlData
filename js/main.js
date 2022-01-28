const puppeteer = require('puppeteer');
const fs = require('fs');
const download = require('image-downloader');
//
(async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/accounts/login',{ waitUntil: 'networkidle2' });
    await page.click('button.yWX7d');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.type('#email','nguyenhuuthang12c4@gmail.com');
    await page.type('#pass','5vi6j64n');
    await page.click('#loginbutton');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.goto('https://www.instagram.com/lalalalisa_m/');
    //
    const imgSources = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll("img.FFVAD"));
        const srcAttribute = imgs.map(i => i.getAttribute('src'));
        return srcAttribute;
    });
    let i = 1;
    imgSources.forEach((image) => {
        console.log("ảnh "+i+" : "+image);
        i++;
    })
    const resultFolder = "./result";
    if(!fs.existsSync(resultFolder)) {
        fs.mkdirSync(resultFolder);
    }
    // Tải các ảnh này về thư mục hiện tại
    const url = './result';
    await Promise.all(imgSources.map(imgUrl => download.image({
        url: imgUrl,
        dest: url
    })));
    
    await browser.close();
})();