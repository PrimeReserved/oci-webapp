import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, message, propertyId, inquiryType } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password
      },
    });

    // Determine inquiry type for subject and content
    const inquiryTypeText =
      inquiryType === 'appointment'
        ? 'Appointment Request'
        : 'Documentation Request';
    const inquiryIcon = inquiryType === 'appointment' ? '📅' : '📋';

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER, // Where to send the contact forms
      subject: `${inquiryIcon} ${inquiryTypeText}${propertyId ? ` - Property ${propertyId}` : ''}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              ${inquiryIcon} New ${inquiryTypeText}
            </h1>
            <p style="color: #fecaca; margin: 10px 0 0 0; font-size: 16px;">
              Real Estate Website Contact Form
            </p>
          </div>
          
          <div style="background-color: white; padding: 30px; margin: 0;">
            <div style="background-color: #f3f4f6; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h2 style="margin-top: 0; color: #374151; font-size: 20px; display: flex; align-items: center;">
                <span style="margin-right: 10px;">👤</span> Contact Information
              </h2>
              <div style="display: grid; gap: 12px;">
                <p style="margin: 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #dc2626;">Full Name:</strong> ${name}</p>
                <p style="margin: 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #dc2626;">Email:</strong> <a href="mailto:${email}" style="color: #1d4ed8; text-decoration: none;">${email}</a></p>
                <p style="margin: 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #dc2626;">Phone:</strong> <a href="tel:${phone}" style="color: #1d4ed8; text-decoration: none;">${phone}</a></p>
                <p style="margin: 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #dc2626;">Inquiry Type:</strong> ${inquiryTypeText}</p>
                ${propertyId ? `<p style="margin: 0; padding: 8px 0;"><strong style="color: #dc2626;">Property ID:</strong> <span style="background-color: #fee2e2; padding: 4px 8px; border-radius: 6px; font-family: monospace;">${propertyId}</span></p>` : ''}
              </div>
            </div>

            <div style="background-color: #f3f4f6; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h2 style="margin-top: 0; color: #374151; font-size: 20px; display: flex; align-items: center;">
                <span style="margin-right: 10px;">💬</span> Message
              </h2>
              <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; color: #374151;">${message}</p>
              </div>
            </div>

            <div style="background-color: #1f2937; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
              <p style="color: #d1d5db; margin: 0; font-size: 14px;">
                🕐 <strong>Response Time:</strong> We typically respond within 24 hours<br>
                📧 <strong>Sent:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This message was sent from your real estate website contact form.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `✅ Thank you for your ${inquiryType === 'appointment' ? 'appointment' : 'documentation'} request`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              ✅ Thank You, ${name}!
            </h1>
            <p style="color: #fecaca; margin: 10px 0 0 0; font-size: 16px;">
              Your ${inquiryType === 'appointment' ? 'appointment' : 'documentation'} request has been received
            </p>
          </div>
          
          <div style="background-color: white; padding: 30px; margin: 0;">
            <div style="text-align: center; margin: 30px 0;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 40px;">✅</span>
              </div>
              <h2 style="color: #1f2937; margin: 0 0 10px 0; font-size: 24px;">Request Confirmed!</h2>
              <p style="color: #6b7280; font-size: 16px; margin: 0;">
                We've received your ${inquiryType === 'appointment' ? 'appointment' : 'documentation'} request${propertyId ? ` for property ${propertyId}` : ''}.
              </p>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="margin-top: 0; color: #374151; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 10px;">📋</span> Your Request Details
              </h3>
              <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; color: #374151;">${message}</p>
              </div>
            </div>

            <div style="background-color: #eff6ff; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <h3 style="margin-top: 0; color: #1e40af; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 10px;">⏰</span> What Happens Next?
              </h3>
              <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Our team will review your ${inquiryType === 'appointment' ? 'appointment' : 'documentation'} request</li>
                <li style="margin-bottom: 8px;">We'll contact you within 24 hours via ${phone.includes('@') ? 'email' : 'phone'}</li>
                <li style="margin-bottom: 8px;">${inquiryType === 'appointment' ? 'Schedule a convenient viewing time' : 'Prepare and send detailed property documentation'}</li>
                <li>Answer any questions you might have</li>
              </ul>
            </div>

            <div style="background-color: #1f2937; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
              <p style="color: #d1d5db; margin: 0; font-size: 14px;">
                <strong>Need immediate assistance?</strong><br>
                📞 Call us directly or 📧 reply to this email
              </p>
            </div>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Best regards,<br>
              <strong style="color: #dc2626;">The Real Estate Team</strong>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
