var nodemailer = require("nodemailer");
var transporter;

module.exports.setupMail = async (host_t, port_t, email_t, email_pass_t) => {
    transporter = nodemailer.createTransport({
        host: host_t,
        port: port_t,
        auth: { user: email_t, pass: email_pass_t },
    });
}

module.exports.sendMail = async (to_t, content, subject = "Tranquility") => {
  var mailOptions = {
    from: process.env.EMAIL,
    to: to_t,
    subject: `${subject}`,
    html: `${content}`, // html body
    // text: 'That was easy!',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};
