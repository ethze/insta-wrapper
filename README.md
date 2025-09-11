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

