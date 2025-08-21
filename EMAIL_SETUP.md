# Contact Form Setup Guide

Your contact form is now ready to work with EmailJS! Follow these steps to make it functional:

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions for your chosen provider

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Submission - {{subject}}

Hello {{to_name}},

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}
Newsletter Subscription: {{newsletter}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

## Step 4: Get Your Credentials
1. Note your **Service ID** from the Email Services page
2. Note your **Template ID** from the Email Templates page
3. Go to "Account" → "API Keys" to get your **Public Key**

## Step 5: Update JavaScript Configuration
Open `js/contact.js` and replace these lines (around line 328-330):

```javascript
const SERVICE_ID = 'your_service_id'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'your_template_id'; // Replace with your EmailJS template ID
const PUBLIC_KEY = 'your_public_key'; // Replace with your EmailJS public key
```

With your actual values:

```javascript
const SERVICE_ID = 'service_xxxxxxx'; // Your actual service ID
const TEMPLATE_ID = 'template_xxxxxxx'; // Your actual template ID
const PUBLIC_KEY = 'xxxxxxxxxxxxxxxxxx'; // Your actual public key
```

## Step 6: Test Your Form
1. Save all files
2. Open your contact page in a browser
3. Fill out the form and submit
4. Check your email for the message

## Alternative: Using Formspree (Easier Setup)
If you prefer a simpler solution, you can use Formspree:

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for free
3. Get your form endpoint
4. Replace the EmailJS code with a simple form action

Let me know if you need help with either approach!

## Troubleshooting
- Make sure all three IDs are correctly set
- Check browser console for error messages
- Verify EmailJS service is properly configured
- Test with a valid email address

Your form already includes:
✅ Input validation
✅ Loading states
✅ Error handling
✅ Success messages
✅ Character counting
✅ Responsive design