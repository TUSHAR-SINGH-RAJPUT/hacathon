import { type NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { z } from 'zod';

// Define the schema for the incoming profile data
const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone_number: z.string().min(10, { message: "Phone number must be at least 10 digits" }).optional(), // Assuming phone number is optional
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = profileSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({ success: false, errors: validationResult.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, address, location, email, phone_number } = validationResult.data;

    // Here, you might want to get the authenticated user's ID if this profile is tied to a user.
    // For example, if using Supabase Auth:
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) {
    //   return NextResponse.json({ success: false, message: 'User not authenticated.' }, { status: 401 });
    // }
    // const userId = user.id;

    // For this example, we'll insert without a specific user ID, assuming 'id' might be auto-generated or handled differently.
    // Adjust this based on your 'profiles' table structure.
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          // id: userId, // If linking to an authenticated user
          name,
          address,
          location,
          email,
          phone_number,
        },
      ])
      .select(); // .select() can be used to return the inserted row(s)

    if (error) {
      console.error('Supabase error inserting profile:', error);
      // Provide a more user-friendly error message if possible
      let userMessage = 'Failed to save profile.';
      if (error.code === '23505') { // Unique constraint violation
        userMessage = 'A profile with this email or identifier already exists.';
      }
      return NextResponse.json({ success: false, message: userMessage, details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Profile saved successfully.', data }, { status: 201 });

  } catch (error) {
    console.error('Error in save-profile API route:', error);
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
        message = error.message;
    }
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
