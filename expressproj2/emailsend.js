const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
    console.log(template);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: "harshitha.b225@gmail.com",
        pass: "jjqj zgdb cmkl scsk",
      },
    });
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    console.log(compiledTemplate);

    const options = {
      from: "harshithab.441@gmail.com",
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };

    // Send email using async/await
    const info = await transporter.sendMail(options);

    return {
      success: true,
      info: info,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = sendEmail;
