import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

/**
 * Basic email format validator
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Basic phone number format validator
 */
function isValidPhone(phone) {
  if (typeof phone !== 'string') return false;
  const cleanPhone = phone.trim();
  if (!cleanPhone) return false;
  const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
  return phoneRegex.test(cleanPhone);
}

/**
 * Check status of an environment variable without leaking secret values
 */
function checkEnvStatus(val, placeholderSubstring) {
  if (!val || typeof val !== 'string' || !val.trim()) return 'MISSING';
  if (placeholderSubstring && val.includes(placeholderSubstring)) return 'PLACEHOLDER';
  return 'CONFIGURED';
}

export async function POST(request) {
  console.log('==================================================');
  console.log('[Enquiry API] Request received: POST /api/enquiries');

  // Check Environment Variables Status safely
  const supabaseUrlStatus = checkEnvStatus(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    'your-supabase-project'
  );
  const supabaseKeyStatus = checkEnvStatus(
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    'your_supabase_service_role_key'
  );
  const resendKeyStatus = checkEnvStatus(
    process.env.RESEND_API_KEY,
    'your_resend_api_key'
  );
  const recipientEmailStatus = checkEnvStatus(
    process.env.ENQUIRY_NOTIFICATION_EMAIL
  );

  console.log('[Enquiry API] Environment Diagnostic:');
  console.log(`  - NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrlStatus}`);
  console.log(`  - SUPABASE_SERVICE_ROLE_KEY: ${supabaseKeyStatus}`);
  console.log(`  - RESEND_API_KEY: ${resendKeyStatus}`);
  console.log(`  - ENQUIRY_NOTIFICATION_EMAIL: ${recipientEmailStatus}`);

  try {
    let body;
    try {
      body = await request.json();
      console.log('[Enquiry API] Request JSON parsed successfully.');
    } catch (parseErr) {
      console.warn('[Enquiry API] Invalid JSON payload in request body:', parseErr.message);
      return NextResponse.json(
        { success: false, message: 'Invalid request data.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      console.warn('[Enquiry API] Request body is empty or not an object.');
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields.' },
        { status: 400 }
      );
    }

    const { fullName, email, phone, course, message } = body;

    // Validate required fields presence
    if (
      !fullName ||
      typeof fullName !== 'string' ||
      !fullName.trim() ||
      !email ||
      typeof email !== 'string' ||
      !email.trim() ||
      !phone ||
      typeof phone !== 'string' ||
      !phone.trim() ||
      !course ||
      typeof course !== 'string' ||
      !course.trim() ||
      !message ||
      typeof message !== 'string' ||
      !message.trim()
    ) {
      console.warn('[Enquiry API] Validation failed: Missing required fields.');
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      console.warn('[Enquiry API] Validation failed: Invalid email format.');
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
      console.warn('[Enquiry API] Validation failed: Invalid phone format.');
      return NextResponse.json(
        { success: false, message: 'Please provide a valid phone number.' },
        { status: 400 }
      );
    }

    console.log('[Enquiry API] Validation passed successfully.');

    const enquiryPayload = {
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      course: course.trim(),
      message: message.trim(),
      status: 'new',
      created_at: new Date().toISOString(),
    };

    // Step 1: Database Storage via Supabase Server Client
    console.log('[Enquiry API] Initializing Supabase server client...');
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      console.error(
        '[Enquiry API Failure] Supabase client creation failed! NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY are missing or set to placeholders in .env.local.'
      );
      console.log('==================================================');
      return NextResponse.json(
        {
          success: false,
          message: 'We were unable to submit your enquiry right now. Please try again.',
        },
        { status: 500 }
      );
    }

    console.log('[Enquiry API] Executing Supabase insert into "enquiries" table...');
    const { data: dbData, error: dbError } = await supabase
      .from('enquiries')
      .insert([enquiryPayload])
      .select();

    if (dbError) {
      console.error('[Enquiry API Failure] Supabase insert failed:');
      console.error(`  Code: ${dbError.code || 'N/A'}`);
      console.error(`  Message: ${dbError.message || 'N/A'}`);
      console.error(`  Details: ${dbError.details || 'N/A'}`);
      console.error(`  Hint: ${dbError.hint || 'N/A'}`);
      console.log('==================================================');
      return NextResponse.json(
        {
          success: false,
          message: 'We were unable to submit your enquiry right now. Please try again.',
        },
        { status: 500 }
      );
    }

    console.log('[Enquiry API] Supabase insert successful! Record ID:', dbData?.[0]?.id || 'created');

    // Step 2: Email Notification via Resend (Only after DB insertion succeeds)
    if (resendKeyStatus === 'CONFIGURED') {
      console.log('[Enquiry API] Attempting Resend notification email...');
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const recipientEmail =
          process.env.ENQUIRY_NOTIFICATION_EMAIL || 'ciatninstitute@gmail.com';
        const senderEmail =
          process.env.RESEND_FROM_EMAIL || 'CIATN Enquiries <onboarding@resend.dev>';

        const emailResult = await resend.emails.send({
          from: senderEmail,
          to: [recipientEmail],
          subject: `New CIATN Website Enquiry — ${enquiryPayload.course}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #0b192c; color: #ffffff; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 22px;">New CIATN Website Enquiry</h2>
              </div>
              <div style="padding: 24px; background-color: #ffffff;">
                <p>A new course enquiry has been submitted on the CIATN website:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                  <tr>
                    <td style="padding: 8px 12px; font-weight: bold; width: 30%; border-bottom: 1px solid #f0f0f0;">Name:</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #f0f0f0;">${enquiryPayload.full_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f0f0f0;">Email:</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${enquiryPayload.email}">${enquiryPayload.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f0f0f0;">Phone:</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #f0f0f0;"><a href="tel:${enquiryPayload.phone}">${enquiryPayload.phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f0f0f0;">Course:</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #f0f0f0;">${enquiryPayload.course}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #f0f0f0;">Submitted:</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #f0f0f0;">${new Date(enquiryPayload.created_at).toLocaleString()}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px; padding: 16px; background-color: #f9f9f9; border-radius: 6px;">
                  <strong style="display: block; margin-bottom: 6px;">Message:</strong>
                  <p style="margin: 0; white-space: pre-wrap;">${enquiryPayload.message}</p>
                </div>
              </div>
            </div>
          `,
        });

        console.log('[Enquiry API] Resend email notification sent successfully:', emailResult?.data?.id || 'Sent');
      } catch (resendError) {
        // Crucial requirement: Email failure does NOT delete or rollback the database record!
        console.error(
          '[Enquiry API Warning] Resend email notification failed, but enquiry remains saved in Supabase:',
          resendError.message || resendError
        );
      }
    } else {
      console.log(
        `[Enquiry API Info] Resend email notification skipped (RESEND_API_KEY status: ${resendKeyStatus}). Database record remains safely saved.`
      );
    }

    console.log('[Enquiry API] Request completed successfully with HTTP 200.');
    console.log('==================================================');

    // Step 3: Return Success Response to Client
    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been received and recorded successfully.',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('[Enquiry API Failure] Unhandled server error in POST /api/enquiries:', err);
    console.log('==================================================');
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process your enquiry at this time. Please try again.',
      },
      { status: 500 }
    );
  }
}
