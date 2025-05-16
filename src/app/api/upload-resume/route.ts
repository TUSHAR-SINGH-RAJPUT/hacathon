
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded.' }, { status: 400 });
    }

    // In a real application, you would save the file to a persistent storage service here.
    // For this mock, we'll just log its details.
    console.log('Mock Resume Upload Received:');
    console.log('Filename:', file.name);
    console.log('File type:', file.type);
    console.log('File size:', file.size, 'bytes');

    // You might return a URL or an identifier for the uploaded file in a real scenario.
    // For this mock, just confirming receipt and returning the filename.
    return NextResponse.json({ 
      success: true, 
      message: 'Resume uploaded successfully (mock).',
      fileName: file.name 
    });

  } catch (error) {
    console.error('Upload error:', error);
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
        message = error.message;
    }
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
