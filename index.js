const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const PORT = 8000;

const app = express();

const url =
  "https://subaybayan.dilg.gov.ph/projects/index?ProjectSearch%5BREGION_C%5D=07&ProjectSearch%5BPROVINCE_C%5D=012&ProjectSearch%5BCITYMUN_C%5D=&ProjectSearch%5Bbarangay%5D=&ProjectSearch%5BimageSelection%5D=&ProjectSearch%5BPROGRAM_C%5D=&ProjectSearch%5BPROJECT_TYPE%5D=&ProjectSearch%5BYEAR%5D=&ProjectSearch%5BSTATUS%5D=";

axios(url).then((response) => {
  const articles = [];
  const html = response.data;
  const $ = cheerio.load(html);

  $(".panel-body", html).each(function () {
    const projects = $(this).find(".col-md-9").text();
    console.log(projects);
    articles.push({
      projects,
    });
  });
  console.log(articles);
});

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
