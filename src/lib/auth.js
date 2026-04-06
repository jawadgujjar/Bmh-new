import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events'
          ].join(' '),
          access_type: 'offline', // Zaroori hai refresh token lene ke liye
          prompt: 'consent',     // Zaroori hai taake har baar refresh token mile
          response_type: 'code'
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, account, user }) {
      // Pehli baar sign in par data token mein save karein
      if (account && user) {
        return {
          ...token, // Purana token data retain karein
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
          user: user // User profile data save karein
        };
      }

      // Check karein ke token expire toh nahi hua
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Agar expire ho gaya hai, toh yahan refresh logic hona chahiye 
      // Filhal aap isse kaam chala sakte hain, lekin error handling ke liye ye zaroori hai.
      return token;
    },

    async session({ session, token }) {
      // Session mein accessToken pass karein taake API routes mein use ho sake
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken; // Future use ke liye
      session.user = token.user;
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  // Development mein debug true rakhna acha hai
  debug: process.env.NODE_ENV === 'development'
};