# Email Setup Instructions

To enable email functionality for the demo booking form, you need to set up Gmail credentials.

## Step 1: Create Environment File

Create a file named `.env.local` in the root directory with the following content:

```
EMAIL_USER=bluelight202427@gmail.com
EMAIL_PASS=your_app_password_here
```

## Step 2: Get Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to "Security" → "2-Step Verification" → "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Replace `your_app_password_here` in `.env.local` with this password

## Step 3: Test the Setup

1. Start your development server: `npm run dev`
2. Fill out the demo booking form
3. Submit the form
4. Check bluelight202427@gmail.com for the email

## Alternative: Use a Different Email Service

If you prefer not to use Gmail, you can modify the transporter configuration in `src/app/api/send-demo-email/route.js` to use other services like:

- SendGrid
- Mailgun
- AWS SES
- Outlook/Hotmail

## Troubleshooting

- Make sure `.env.local` is in the root directory (same level as package.json)
- Restart your development server after creating the environment file
- Check the browser console for any error messages
- Verify the app password is correct and 2FA is enabled
