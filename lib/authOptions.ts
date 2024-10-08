import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import {encrypt} from "../server/encryption.js"

async function openDB() {
  return open({
    // Change to a relative path
    filename: '/Users/alirangwala/weather-app/server/database.sqlite', 
    driver: sqlite3.Database
  });
}

declare module "next-auth" {
  interface Session {
    apiKey?: string;
    apiUrl?: string;
  }
}

async function findUserByEmail(email: string) {
  const db = await openDB();
  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (user) {
      console.log('User found:', user);
      return user;
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    throw error;
  } finally {
    await db.close();
  }
}

async function createUser(email: string, name: string) {
  const db = await openDB();
  try {
    const result = await db.run(
      'INSERT INTO users (email, name, apiUrl, apiKey) VALUES (?, ?, ?, ?)',
      [email, name, process.env.NEXT_PUBLIC_WEATHERSTACK_API_URL, encrypt(process.env.NEXT_PUBLIC_WEATHERSTACK_API_KEY)]
    );

    console.log('New user created:', result);
    return result;
  } catch (error) {
    console.error('Error creating new user:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export const authOptions: NextAuthOptions = ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user}) {
      try {
        const existingUser = await findUserByEmail(user.email || "");
        
        if (existingUser) {
          console.log('User exists:', existingUser);
          return true; 
        } else {
          console.log('User does not exist. Creating new user...');
          await createUser(user.email || "", user.name || "");
          return true;
        }
      } catch (error) {
        console.error("Error updating/creating user on sign-in:", error);
        return false; 
      }
    },
    async session({ session }) {
      const existingUser = await findUserByEmail(session.user?.email || "");
      if (existingUser) {
        session.apiKey = existingUser.apiKey;  
        session.apiUrl = existingUser.apiUrl;
      }
      return session;
    }
  },
});