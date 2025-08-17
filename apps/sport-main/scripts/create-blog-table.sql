-- Create the blog_posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS sports_blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster ordering
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON sports_blog_posts(created_at DESC);

-- Create an index on title for search functionality
CREATE INDEX IF NOT EXISTS idx_blog_posts_title ON sports_blog_posts USING gin(to_tsvector('english', title));

-- Create an index on content for search functionality
CREATE INDEX IF NOT EXISTS idx_blog_posts_content ON sports_blog_posts USING gin(to_tsvector('english', content));

-- Insert some sample data if the table is empty (optional)
INSERT INTO sports_blog_posts (title, content, created_at, updated_at)
SELECT
  'Welcome to the Blog',
  '<h1>Welcome to Our Cinema Blog</h1><p>This is your first blog post! Start writing about film, storytelling, and the art of cinema.</p><p>You can use the editor to create rich content with:</p><ul><li>Headings and formatting</li><li>Images and videos</li><li>Tables and lists</li><li>Code blocks and quotes</li></ul><p>Happy writing!</p>',
  NOW(),
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM sports_blog_posts);
