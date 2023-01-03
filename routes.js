import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.get("/sendConfirmacion", (req, res) => {
  const { esp, medico, dia } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  let mailOptions = {
    from: process.env.user, // TODO: email sender
    to: "max.ichajaya@unmsm.edu.pe", // TODO: email receiver
    subject: "Confirmación de cita",
    text:
      "¡Gracias por usar nuestra app!\nCita reservada para el día " +
      dia +
      " con el Dr." +
      medico +
      ", especialista en " +
      esp,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      res.send("FAIL :(");
    }
    res.send("SENT IT!!!");
  });
});

export default router;
