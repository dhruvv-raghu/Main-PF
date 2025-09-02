import { NextResponse } from 'next/server';
import { pool } from '@/lib/dbconnect';

// GET
export async function GET(request, context) {
  // Await and destructure 'id' from 'context.params'
  const { id } = await context.params;
  
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `
        SELECT id, title, content, created_at, updated_at
        FROM sports_blog_posts
        WHERE id = $1
      `,
        [id]
      );
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      
      const row = result.rows[0];
      const post = {
        id: row.id.toString(),
        title: row.title,
        content: row.content, // Assuming database driver auto-parses JSON
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
      
      return NextResponse.json(post);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT
export async function PUT(request, context) {
  // Await and destructure 'id' from 'context.params'
  const { id } = await context.params;
  
  try {
    const body = await request.json();
    const { title, content } = body;
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        `
        UPDATE sports_blog_posts
        SET title = $1, content = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING id, title, content, created_at, updated_at
      `,
        // Stringify the 'content' object before sending it to the database.
        [title, JSON.stringify(content), id]
      );
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      
      const row = result.rows[0];
      const updatedPost = {
        id: row.id.toString(),
        title: row.title,
        content: row.content, // Assuming database driver auto-parses JSON
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
      
      return NextResponse.json(updatedPost);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request, context) {
  // Await and destructure 'id' from 'context.params'
  const { id } = await context.params;
  
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `
        DELETE FROM sports_blog_posts
        WHERE id = $1
        RETURNING id
      `,
        [id]
      );
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      
      return NextResponse.json({ message: 'Post deleted successfully' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}