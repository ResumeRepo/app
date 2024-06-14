const { Cluster } = require('puppeteer-cluster');
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const cheerio = require('cheerio');

const templateStyles = {}

function loadTemplateStyles() {
  const root = "templateStyles"
  const fileList = fs.readdirSync(root);
  for (const fileName of fileList) {
    const content = fs.readFileSync(`${root}/${fileName}`, 'utf8');
    const data = JSON.parse(content)
    templateStyles[data["templateId"]] = data["payload"]
  }
}

loadTemplateStyles()

const app = express();
const port = process.env.PORT || 4000;

let browser;

function maybeAddStyling(htmlString, templateId, env) {
  if (env === "production") {
    const $ = cheerio.load(htmlString);
    const styles = templateStyles[templateId]
    if (styles) {
      for (const {id, css} of styles) {
        const styleId = `"${id}"`
        const style = $(`<style id=${styleId}>`);
        style.text(css)
        $('head').append(style);
      }
    }
    return $.html();
  }
  return htmlString;
}

// Function to convert HTML string to PDF
async function generatePDF(htmlString, templateId, format, env) {
  const buffer = Buffer.from(htmlString, 'base64');
  let decodedHTML = buffer.toString('utf-8');
  decodedHTML = maybeAddStyling(decodedHTML, templateId, env)

  fs.writeFileSync(`${env}_payload.html`, decodedHTML);
  console.log(Date.now(), "Generating pdf")


  if (!browser) browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(decodedHTML);
  const pdfBuffer = await page.pdf({ });
  // await browser.close();

  return pdfBuffer;
}

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Alternatively, configure allowed origins
// const allowedOrigins = ['https://your-client-domain.com', 'http://localhost:3000', '*'];
const allowedOrigins = ['*'];

// app.use(cors({
//   origin: (origin, callback) => {
//     console.log("origin: ", origin)
//     if (!origin) return callback(null, true); // Allow requests with no origin
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       return callback(null, true);
//     } else {
//       return callback(new Error('Origin not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow cookies for CORS requests (if applicable)
// }));

app.use(cors());

app.post('/convert-to-pdf', async (req, res) => {
  try {
    // console.log("request.body: ", req)
    const { html, templateId, format, env } = req.body;
    if (!html) {
      throw new Error('Missing HTML payload');
    }
    const pdfBuffer = await generatePDF(html, templateId, format, env);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error converting HTML to PDF');
  }
});

app.post('/save-styling', async (req, res) => {
  try {
    // console.log("request.body: ", req)
    const { templateId, payload } = req.body;
    if (!templateId || !payload) {
      throw new Error('Missing CSS payload');
    }
    fs.writeFileSync(`templateStyles/${templateId}.json`, JSON.stringify(req.body));
    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving template styling');
  }
});


app.listen(port, () => console.log(`Server listening on port ${port}`));
