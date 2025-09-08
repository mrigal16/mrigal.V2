"use server";

import { z } from "zod";
import { and, eq, sql, or } from "drizzle-orm";
import { db } from "@/db/drizzle";

import { validatedAction, validatedActionWithUser } from "@/lib/middelware";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { facturesTable, user } from "@/db/schema";

//async function logActivity(
//  teamId: number | null | undefined,
//  userId: number,
//  type: ActivityType,
//  ipAddress?: string
//) {
//  if (teamId === null || teamId === undefined) {
//    return;
//  }
//  const newActivity: NewActivityLog = {
//    teamId,
//    userId,
//    action: type,
//    ipAddress: ipAddress || "",
//  };
//  await db.insert(activityLogs).values(newActivity);
//}

const signInSchema = z.object({
  username: z
    .string()
    .min(9, {
      message: "Le code client doit contenir 9 ou 10 caractères",
    })
    .max(10, {
      message: "Le code client doit contenir 9 ou 10 caractères",
    })
    .regex(
      /^[A-Z0-9]+$/,
      "Le code client doit contenir uniquement des lettres majuscules et des chiffres"
    ),
  password: z.string({ message: "code client invalide" }).min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { username, password } = data;
  try {
    await auth.api.signInUsername({
      body: {
        username,
        password,
      },
      rememberMe: false,
      callbackURL: "/dashboard",
    });

    return {
      status: "success",
      message: "Connexion réussie.",
      redirectTo: "/dashboard",
    };
  } catch (error: any) {
    const message = error?.message?.toLowerCase() || "";
    console.log(message);
    if (message.includes("verify")) {
      return {
        status: "error",
        message: "Veuillez vérifier votre adresse e-mail.",
      };
    }

    if (message.includes("invalid username or password")) {
      return {
        status: "error",
        message: "Nom d'utilisateur ou mot de passe incorrect.",
      };
    }

    return {
      status: "error",
      message: "Une erreur est survenue. Veuillez réessayer.",
    };
  }
});

const signUpSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Le nom complet doit contenir au moins 2 caractères.",
    })
    .regex(/^[a-zA-Z\s]+$/, {
      message:
        "Le nom complet ne doit contenir que des lettres et des espaces.",
    }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
  username: z
    .string()
    .min(9, {
      message: "Le code client doit contenir 9 ou 10 caractères",
    })
    .max(10, {
      message: "Le code client doit contenir 9 ou 10 caractères",
    })
    .regex(
      /^[A-Z0-9]+$/,
      "Le code client doit contenir uniquement des lettres majuscules et des chiffres"
    ),
  email: z.string().email({ message: "Adresse e-mail est invalide." }),
  adresse: z
    .string()
    .min(5, { message: "L'adresse doit contenir au moins 5 caractères." })
    .regex(/^[a-zA-Z0-9À-ÖØ-öø-ÿ\s-]+$/, {
      message: "L'adresse contient des caractères invalides.",
    }),
  commune: z
    .string()
    .min(2, {
      message: "La commune doit contenir au moins 2 caractères.",
    })
    .regex(/^[a-zA-Z0-9À-ÖØ-öø-ÿ\s-]+$/, {
      message: "La commune contient des caractères invalides.",
    }),
  ilot: z
    .string()
    .min(2, {
      message: "Le ilot complet doit contenir au moins 2 caractères.",
    })
    .regex(/^[a-zA-Z0-9À-ÖØ-öø-ÿ\s-]+$/, {
      message: "Le ilot contient des caractères invalides.",
    }),
  phone: z.string().regex(/^[0-9]{10}$/, {
    message: "Veuillez entrer un numéro de téléphone valide à 10 chiffres.",
  }),
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const { name, email, commune, ilot, phone, adresse, username, password } =
    data;

  const existingUser = await db
    .select()
    .from(user)
    .where(
      or(
        eq(user.email, email),
        eq(user.phone, phone),
        eq(user.username, username)
      )
    )
    .limit(1);
  if (existingUser.length > 0) {
    return {
      error:
        "Un utilisateur avec cet email, numéro de Téléphone ou code client existe déjà.",
      email,
      phone,
      username,
    };
  }
  const userOne = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      commune,
      ilot,
      phone,
      adresse,
      username,
    },
    callbackURL: "/",
  });
  if (userOne) {
    redirect("/verification");
  }
});
//export async function signOut() {
//  const user = (await getUser()) as User;
//  //const userWithTeam = await getUserWithTeam(user.id);
//  //await logActivity(userWithTeam?.teamId, user.id, ActivityType.SIGN_OUT);
//  (await cookies()).delete("session");

//}
export const forgetPassword = async (data: { email: string }) => {
  const { email } = data;
  await auth.api.forgetPassword({
    body: { email, redirectTo: "/reset-password" },
  });
};
const inviteTeamMemberSchema = z.object({
  montant: z.string().regex(/^\d+\.\d{2}$/, {
    message: "Veuillez entrer un montant valide.",
  }),
  num_avis: z.string(),
});
export const inviteTeamMember = validatedActionWithUser(
  inviteTeamMemberSchema,
  async (data, _, user) => {
    const { num_avis, montant } = data;

    //Check if there's an existing invitation
    const existingInvitation = await db
      .select()
      .from(facturesTable)
      .where(and(eq(facturesTable.num_avis, num_avis)))
      .limit(1);

    if (existingInvitation.length > 0) {
      return { error: "La facture était envoyez " };
    }
    // Create a new invitation
    await db.insert(facturesTable).values({
      utiliateurId: user.id,
      montant,
      num_avis,
      livreurNom: 1,
    });

    // TODO: Send invitation email and include ?inviteId={id} to sign-up URL
    // await sendInvitationEmail(email, userWithTeam.team.name, role)

    return { success: "Facture sent successfully" };
  }
);
const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

//export const deleteAccount = validatedActionWithUser(
//  deleteAccountSchema,
//  async (data, _, userOne) => {
//    const { password } = data;
//
//    const isPasswordValid = await comparePasswords(password, userOne.password);
//    if (!isPasswordValid) {
//      return { error: "Incorrect password. Account deletion failed." };
//    }
//
//    //const userWithTeam = await getUserWithTeam(user.id);
//
//    //await logActivity(
//    //  userWithTeam?.teamId,
//    //  user.id,
//    //  ActivityType.DELETE_ACCOUNT
//    //);
//
//    // Soft delete
//    await db
//      .update(user)
//      .set({
//        deletedAt: sql`CURRENT_TIMESTAMP`,
//        email: sql`CONCAT(email, '-', id, '-deleted')`, // Ensure email uniqueness
//      })
//      .where(eq(user.id, userOne.id));
//
//    //if (userWithTeam?.teamId) {
//    //  await db
//    //    .delete(teamMembers)
//    //    .where(
//    //      and(
//    //        eq(teamMembers.userId, user.id),
//    //        eq(teamMembers.teamId, userWithTeam.teamId)
//    //      )
//    //    );
//    //}
//
//    (await cookies()).delete("session");
//    redirect("/sign-in");
//  }
//);

//export const removeTeamMember = validatedActionWithUser(
//  removeTeamMemberSchema,
//  async (data, _, user) => {
//    const { memberId } = data;
//   // const userWithTeam = await getUserWithTeam(user.id);
//
//    if (!userWithTeam?.teamId) {
//      return { error: "User is not part of a team" };
//    }
//
//    await db
//      .delete(teamMembers)
//      .where(
//        and(
//          eq(teamMembers.id, memberId),
//          eq(teamMembers.teamId, userWithTeam.teamId)
//        )
//      );
//
//    await logActivity(
//      userWithTeam.teamId,
//      user.id,
//      ActivityType.REMOVE_TEAM_MEMBER
//    );
//
//    return { success: "Team member removed successfully" };
//  }
//);
