# Instagram User Info API

This repository provides a **Next.js API route** to fetch detailed Instagram user information using the **Instagram Private API**.  
API ini memungkinkan kita untuk mendapatkan **important info** dan **full raw data** dari akun Instagram dalam format JSON yang terstruktur.

---

## Features / Fitur Utama
- 🔑 **API Key Protected** – Only requests with a valid API key can access the endpoint.  
- 📲 **Username-Based Lookup** – Get user info by providing an Instagram username.  
- 📝 **Important Info Highlight** – Pre-defined key metrics like full name, follower count, following count, post count, private status, and spam filter settings.  
- 📊 **Full Raw Data Sorted A-Z** – All available Instagram user data sorted alphabetically for easy processing.  
- 🚀 **Fast & Lightweight** – Built with **Next.js API Routes** for fast responses.

---

## How It Works / Cara Kerja

Step by step:

1. **Request Validation**  
   - The API expects `username` and `key` as query parameters.  
   - If `username` is missing, it returns `400 Bad Request`.  
   - If `key` does not match your environment variable `API_KEY`, it returns `403 Forbidden`.

2. **Instagram Login**  
   - Uses `IgApiClient` to login to Instagram.  
   - Credentials (`IG_USERNAME` and `IG_PASSWORD`) are stored in environment variables.  
   - The client generates a device state based on the username to mimic a real device login.

3. **Get User PK (Primary Key)**  
   - Fetch the unique user ID (`pk`) from the username.  
   - This PK is required for requesting full user info.

4. **Fetch Full User Info**  
   - Sends a GET request to Instagram API: `/api/v1/users/{user.pk}/info/`.  
   - Returns the **raw user data** from Instagram.

5. **Prepare Important Info**  
   - Extracts main fields like:  
     - Full Name (`full_name`)  
     - Followers Count (`follower_count`)  
     - Following Count (`following_count`)  
     - Posts Count (`media_count`)  
     - Private Status (`is_private`)  
     - Spam Filter Status (`has_chaining`)  
   - These fields are returned first to make it easy to read.

6. **Sort Full Data A-Z**  
   - All other raw fields from Instagram are sorted alphabetically.  
   - This makes the data easier to process if you need full information.

7. **Return JSON Response**  
   - The API responds with:  
     ```json
     {
       "important": { ... },
       "data": { ... }
     }
     ```

---

## Example Request

```http
GET /api/instagram?username=example_user&key=YOUR_API_KEY





This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
