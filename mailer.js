const { getDateTime } = require("./Utils");
var nodemailer = require("nodemailer");
var transporter;

module.exports.setupMail = async (host_t, port_t, email_t, email_pass_t) => {
    transporter = nodemailer.createTransport({
        host: host_t,
        port: port_t,
        auth: { user: email_t, pass: email_pass_t },
    });
    return true;
}

module.exports.sendMail = async (message, subject = "ConniBug/JS-Logging") => {
  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `${subject}`,
    html: `
    Time: ${getDateTime()}
    <br>
    <br>
    <div>
      ${message}
    </div>
    `, // html body
    // text: 'That was easy!',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};
