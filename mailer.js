const { getDateTime } = require("./Utils");
var nodemailer = require("nodemailer");
var transporter;

let sender = "";
let send_to = "";
module.exports.setupMail = async (host_t, port_t, email_t, email_pass_t, send_to_t) => {
  sender = email_t;
  send_to = send_to_t;

  transporter = nodemailer.createTransport({
    host: host_t,
    port: port_t,
    secure: true,
    auth: {
      user: email_t,
      pass: email_pass_t,
    },
  });
  return true;
}

module.exports.sendMail = async (message, subject = "ConniBug/JS-Logging") => {
  let dat = {
    from: sender,
    to: send_to,
    subject: `${subject}`,
    html: `
    Time: ${getDateTime()}
    <br>
    <br>
    <div>
      ${message}
    </div>
    `,
  };
  let info = await transporter.sendMail(dat);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
