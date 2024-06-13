const { Cluster } = require('puppeteer-cluster');
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4000;

let browser;

// Function to convert HTML string to PDF
async function generatePDF(htmlString, format) {
  const buffer = Buffer.from(htmlString, 'base64');
  const decodedHTML = buffer.toString('utf-8');
  fs.writeFileSync("test.html", decodedHTML);
  // console.log(decodedHTML)


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
    const { html, format } = req.body;
    if (!html) {
      throw new Error('Missing HTML payload');
    }

    // console.log("about to generate....: ", format)

    const pdfBuffer = await generatePDF(html, format);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error converting HTML to PDF');
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
