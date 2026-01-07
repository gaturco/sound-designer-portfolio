import { NextResponse } from 'next/server';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    const allProjects = await db.select().from(projects).orderBy(asc(projects.id));
    return NextResponse.json(allProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, link, type, tags, thumbnail } = body;

    if (!title || !link || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await db
      .insert(projects)
      .values({
        title,
        description: description || '',
        link,
        type,
        tags: tags || '',
        thumbnail: thumbnail || null,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
