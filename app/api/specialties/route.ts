import { NextResponse } from 'next/server';
import { db } from '@/db';
import { specialties } from '@/db/schema';

export async function GET() {
  try {
    const allSpecialties = await db.select().from(specialties);
    return NextResponse.json(allSpecialties);
  } catch (error) {
    console.error('Error fetching specialties:', error);
    return NextResponse.json({ error: 'Failed to fetch specialties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, icon } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const result = await db
      .insert(specialties)
      .values({
        title,
        description: description || '',
        icon: icon || null,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating specialty:', error);
    return NextResponse.json({ error: 'Failed to create specialty' }, { status: 500 });
  }
}
