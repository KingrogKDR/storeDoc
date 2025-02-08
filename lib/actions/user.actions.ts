"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { avatarplaceholder } from "../constants";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", email)]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOtp = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

async function convertArrayBufferToBase64(buffer: ArrayBuffer) {
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/png;base64,${base64}`;
}


export const createAccount = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const userExists = await getUserByEmail(email);
  const accountId = await sendEmailOtp({ email });
  if (!accountId) throw new Error("AccountId not detected");
  
  if (!userExists) {
    const { databases, avatars } = await createAdminClient();
    const avatarBuffer = await avatars.getInitials(username || "User");
    const avatarUrl = await convertArrayBufferToBase64(avatarBuffer);

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        username,
        email,
        avatar: avatarUrl || avatarplaceholder,
        accountId,
      }
    );
  }
  
  
  return parseStringify({ accountId });
};

export const verifyOTP = async ({
  accountId,
  otp
}: {
  accountId: string;
  otp: string;
}) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, otp);
  
    (await cookies()).set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/", // Required for Safari
    })

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};


export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)],
    );

    if (user.total <= 0) return null;
    
    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  const { account } = await createSessionClient();
  try {
    account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to logout user");
  } finally {
    redirect ("/sign-in")
  }
}