import { db } from "@/db/drizzle";
import { schema, User } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: process.env.PORT,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_MAIN, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await transporter.sendMail({
        from: `"DigitservZ"<${process.env.EMAIL_MAIN}>`,
        to: user.email,
        subject: "Réinitialisez votre mot de passe",
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body>
          <div>
            <div>
            <h1>Bonjour !</h1>
            </div>
            <div>
            <p style="font-size: 110%;">Vous avez demandé à réinitialiser votre mot de passe sur notre plateforme Mrigal</p>
            </div>
            <div>
            <p>Si vous avez demandé à réinitialiser votre mot de passe, veuillez nous contacter au numéro : 0775 96 96 42</p>
            </div>
            <div>
            <p>Cliquez sur le lien pour réinitialiser votre mot de passe : ${url}</p>
            </div>
          </body>
        </html>`,
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await transporter.sendMail({
        from: '"DigitservZ"<mrigal.digitservz@gmail.com>',
        to: user.email,
        subject: "Vérifiez votre adresse e-mail",
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body>
          <div>
            <div>
          
            <h1>Bonjour !</h1>
            </div>
            <div>
            <p style="font-size: 110%;">Vous êtes inscrit avec succès sur notre plateforme Mrigal </p>
            </div>
            <div>
            <p>Pour plus d'information contact nous sur notre numéro téléphone : 0775 96 96 42 </p>
            </div>
            <div>
            <p>appuyer sur le lien pour accéder à notre site web : ${url}</p>
            </div>
          </body>
        </html>`,
      });
    },
  },
  user: {
    additionalFields: {
      ilot: {
        type: "string",
      },
      commune: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      adresse: {
        type: "string",
      },
      username: {
        type: "string",
      },
    },
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 1, // 1 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    freshAge: 0, // 5 minutes (the session is fresh if created within the last 5 minutes)

    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },

  plugins: [nextCookies(), username()],
});
