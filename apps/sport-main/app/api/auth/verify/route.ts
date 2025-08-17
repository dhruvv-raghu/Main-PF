import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const editorPassword = process.env.EDITOR_PASSWORD;

    if (!editorPassword) {
      return NextResponse.json({ error: 'Editor password not configured' }, { status: 500 });
    }

    if (password === editorPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
