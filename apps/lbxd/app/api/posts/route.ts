import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/dbconnect';
import { JSONContent } from '@tiptap/react'; // For type safety

// Update the interface for consistency
interface BlogPost {
  id: string;
  title: string;
  content: JSONContent; // Use JSONContent type
  createdAt: string;
  updatedAt: string;
}

// The GET function is correct and requires no changes.
export async function GET() {
  try {
    const client = await pool.connect();

    try {
      const result = await client.query(`
        SELECT id, title, content, created_at, updated_at
        FROM blog_posts
        ORDER BY created_at DESC
      `);

      // Transform the data to match our interface
      // The 'content' field is automatically parsed from JSONB by the driver.
      const posts: BlogPost[] = result.rows.map((row) => ({
        id: row.id.toString(),
        title: row.title,
        content: row.content,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));

      return NextResponse.json(posts);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// The POST function is updated to correctly handle the JSON content.
export async function POST(request: NextRequest) {
  try {
    const { title, content }: { title: string; content: JSONContent } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const client = await pool.connect();

    try {
      const result = await client.query(
        `
        INSERT INTO blog_posts (title, content, created_at, updated_at)
        VALUES ($1, $2, NOW(), NOW())
        RETURNING id, title, content, created_at, updated_at
      `,
        // FIX: Stringify the 'content' object to store it correctly in the database.
        [title, JSON.stringify(content)]
      );

      const newPost: BlogPost = {
        id: result.rows[0].id.toString(),
        title: result.rows[0].title,
        content: result.rows[0].content,
        createdAt: result.rows[0].created_at,
        updatedAt: result.rows[0].updated_at,
      };

      return NextResponse.json(newPost, { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
