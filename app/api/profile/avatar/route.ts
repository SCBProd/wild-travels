export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    // Беремо оригінальний FormData і передаємо далі БЕЗ змін
    const formData = await req.formData();

    const { data } = await api.patch('/profile/avatar', formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      // НЕ вказуємо Content-Type! Axios сам правильно поставить multipart
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[Avatar Upload Error]:', error.response?.data || error);

    const message =
      error.response?.data?.message ||
      error.message ||
      'Не вдалося оновити аватар';

    return NextResponse.json(
      { message },
      { status: error.response?.status || 500 },
    );
  }
}