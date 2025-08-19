import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/dbconnect';

// GET - Fetch all posts
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
      const posts = result.rows.map((row) => ({
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

// POST - Create new post
export async function POST(request) {
  try {
    const { title, content } = await request.json();
    
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
        [title, JSON.stringify(content)]
      );
      
      const newPost = {
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