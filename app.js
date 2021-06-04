const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

let port = process.env.PORT || 6969;
// serve static ml5 / p5 stuff for browser
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.post("/save", (req, res) => {
  // write to file with data
  // each json file should contain ~100 shots inside "shots" field, and information about the shot "angle"
  let body = req.body;

  if (!body) return res.status(400).json({ message: "data missing" });
  if (!body.form)
    return res.status(400).json({ message: "missing shooting form" });
  if (!body.got_bucket)
    return res
      .status(400)
      .json({ message: "missing data about if shot went in" });
  if (!body.shot_angle)
    return res.status(400).json({ message: "missing shot angle" });
  if (!body.file_name)
    return res.status(400).json({ message: "missing file name" });

  let existingData = "";
  try {
    existingData = fs.readFileSync("/out/" + body.file_name + ".json");
  } catch (err) {
    // do nothing
  }

  if (existingData != "") {
    existingData = JSON.parse(existingData);
    existingData.shots += [
      {
        got_bucket: body.got_bucket,
        form: body.form,
      },
    ];
    existingData.makes += body.got_bucket;
    existingData.total_shots++;
    fs.writeFileSync(
      body.file_name + ".json",
      JSON.stringify(existingData),
      (err) => {
        console.log("error writing file.");
        return res.status(500).json({ message: err });
      }
    );
  } else {
    fs.writeFileSync(
      body.file_name + ".json",
      JSON.stringify({
        shot_angle: body.shot_angle,
        shots: [{ got_bucket: body.got_bucket, form: body.form }],
        makes: 0,
        total_shots: 0,
      }),
      (err) => {
        console.log("error creating file.");
        return res.status(500).json({ message: err });
      }
    );
  }

  res.status(200).json({
    message:
      "save success! " +
      existingData.total_shots +
      " shots saved so far in " +
      body.file_name +
      ".json",
  });
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});
