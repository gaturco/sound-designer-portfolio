import { NextResponse } from 'next/server';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const project = await db.select().from(projects).where(eq(projects.id, id));
    
    if (!project.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();
    const { title, description, link, type, tags, thumbnail } = body;

    const result = await db
      .update(projects)
      .set({
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        link: link !== undefined ? link : undefined,
        type: type !== undefined ? type : undefined,
        tags: tags !== undefined ? tags : undefined,
        thumbnail: thumbnail !== undefined ? thumbnail : undefined,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();

    if (!result.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const result = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();

    if (!result.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
