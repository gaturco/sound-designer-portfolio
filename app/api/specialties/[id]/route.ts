import { NextResponse } from 'next/server';
import { db } from '@/db';
import { specialties } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const specialty = await db.select().from(specialties).where(eq(specialties.id, id));
    
    if (!specialty.length) {
      return NextResponse.json({ error: 'Specialty not found' }, { status: 404 });
    }

    return NextResponse.json(specialty[0]);
  } catch (error) {
    console.error('Error fetching specialty:', error);
    return NextResponse.json({ error: 'Failed to fetch specialty' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { title, description, icon } = body;

    const result = await db
      .update(specialties)
      .set({
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        icon: icon !== undefined ? icon : undefined,
        updatedAt: new Date(),
      })
      .where(eq(specialties.id, id))
      .returning();

    if (!result.length) {
      return NextResponse.json({ error: 'Specialty not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating specialty:', error);
    return NextResponse.json({ error: 'Failed to update specialty' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const result = await db
      .delete(specialties)
      .where(eq(specialties.id, id))
      .returning();

    if (!result.length) {
      return NextResponse.json({ error: 'Specialty not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Specialty deleted successfully' });
  } catch (error) {
    console.error('Error deleting specialty:', error);
    return NextResponse.json({ error: 'Failed to delete specialty' }, { status: 500 });
  }
}
