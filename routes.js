import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/sendConfirmacion", (req, res) => {
  const { esp, medico, email } = req.body;

  if (email == undefined || medico == undefined || esp == undefined) {
    console.log("Datos insuficientes");
    res.json({
      message: "Fail",
      detail: "Datos insuficientes para el envío.",
    });
  } else {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    let mailOptions = {
      from: process.env.user, // TODO: email sender
      to: email, // TODO: email receiver
      subject: "Confirmación de cita",
      text:
        "¡Gracias por usar nuestra app! Cita reservada con el Dr." +
        medico +
        ", especialista en " +
        esp +
        ". Para más detalles comunicarse con el soporte de la aplicación.",
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          message: "Fail",
          detail: "Error al enviar el correo a " + email,
        });
      }
      console.log("Mensaje enviado!");
      res.json({ message: "Success", detail: "Correo enviado" });
    });
  }
});

export default router;
