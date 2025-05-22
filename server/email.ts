import { MailService } from '@sendgrid/mail';

// Initialize the SendGrid mail service
const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY || '');

// Admin email that will receive notifications (you can replace this with your actual email)
const ADMIN_EMAIL = 'admin@hiroshi.dev';

/**
 * Send a notification email about a new contact form submission
 * @param contactData The contact form data submitted by the user
 * @returns Promise that resolves to true if the email was sent successfully, false otherwise
 */
export async function sendContactNotification(contactData: {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  budget?: string | null;
  timeline?: string | null;
  eventDate?: string | null;
}): Promise<boolean> {
  try {
    // Simple formatting of the budget, timeline, or event date if present
    const extraDetails = [];
    if (contactData.budget) extraDetails.push(`Budget: ${contactData.budget}`);
    if (contactData.timeline) extraDetails.push(`Timeline: ${contactData.timeline}`);
    if (contactData.eventDate) extraDetails.push(`Event Date: ${new Date(contactData.eventDate).toLocaleDateString()}`);
    
    const extraDetailsText = extraDetails.length > 0 
      ? `\n\nAdditional Details:\n${extraDetails.join('\n')}`
      : '';
    
    // Construct email message
    const message = {
      to: ADMIN_EMAIL,
      from: {
        email: 'noreply@hiroshi.dev',
        name: 'Hiroshi Portfolio Contact Form'
      },
      subject: `New Contact Form Submission: ${contactData.inquiryType} inquiry from ${contactData.name}`,
      text: `
You've received a new contact form submission from your portfolio website.

Name: ${contactData.name}
Email: ${contactData.email}
Inquiry Type: ${contactData.inquiryType}
Message:
${contactData.message}${extraDetailsText}

You can reply directly to the sender by using their email address: ${contactData.email}
`,
      html: `
<h2>New Contact Form Submission</h2>
<p>You've received a new contact form submission from your portfolio website.</p>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
    <td style="padding: 8px; border: 1px solid #ddd;">${contactData.name}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
    <td style="padding: 8px; border: 1px solid #ddd;">
      <a href="mailto:${contactData.email}">${contactData.email}</a>
    </td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Inquiry Type</td>
    <td style="padding: 8px; border: 1px solid #ddd;">${contactData.inquiryType}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td>
    <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${contactData.message}</td>
  </tr>
  ${contactData.budget ? `
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Budget</td>
    <td style="padding: 8px; border: 1px solid #ddd;">${contactData.budget}</td>
  </tr>` : ''}
  ${contactData.timeline ? `
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timeline</td>
    <td style="padding: 8px; border: 1px solid #ddd;">${contactData.timeline}</td>
  </tr>` : ''}
  ${contactData.eventDate ? `
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Event Date</td>
    <td style="padding: 8px; border: 1px solid #ddd;">${new Date(contactData.eventDate).toLocaleDateString()}</td>
  </tr>` : ''}
</table>

<p style="margin-top: 20px;">
  You can reply directly to the sender by using their email address: 
  <a href="mailto:${contactData.email}">${contactData.email}</a>
</p>
`,
    };

    // Send the email
    await mailService.send(message);
    console.log('Contact notification email sent successfully!');
    return true;
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    return false;
  }
}

/**
 * Send an auto-reply email to the contact form submitter
 * @param contactData The contact form data submitted by the user
 * @returns Promise that resolves to true if the email was sent successfully, false otherwise
 */
export async function sendContactAutoReply(contactData: {
  name: string;
  email: string;
}): Promise<boolean> {
  try {
    // Construct email message
    const message = {
      to: contactData.email,
      from: {
        email: 'noreply@hiroshi.dev',
        name: 'Hiroshi Dev'
      },
      subject: 'Thank you for contacting me',
      text: `
Hello ${contactData.name},

Thank you for reaching out through the contact form on my portfolio website. 

I've received your message and will get back to you as soon as possible. 

Best regards,
Hiroshi
`,
      html: `
<h2>Thank you for contacting me</h2>
<p>Hello ${contactData.name},</p>

<p>Thank you for reaching out through the contact form on my portfolio website.</p>

<p>I've received your message and will get back to you as soon as possible.</p>

<p>
  Best regards,<br>
  Hiroshi
</p>
`,
    };

    // Send the email
    await mailService.send(message);
    console.log('Contact auto-reply email sent successfully!');
    return true;
  } catch (error) {
    console.error('Error sending contact auto-reply email:', error);
    return false;
  }
}