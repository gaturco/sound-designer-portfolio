import { db } from '@/db';
import { content } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allContent = await db.select().from(content);
    const contentMap = allContent.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
    
    return NextResponse.json(contentMap);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    // Upsert: update if exists, insert if not
    const existing = await db.select().from(content).where(eq(content.key, key));
    
    if (existing.length > 0) {
      await db.update(content)
        .set({ value, updatedAt: new Date() })
        .where(eq(content.key, key));
    } else {
      await db.insert(content).values({ key, value });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
