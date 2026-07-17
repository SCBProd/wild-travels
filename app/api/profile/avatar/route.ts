// app/api/profile/avatar/route.ts

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    // дістаємо multipart/form-data
    const formData = await req.formData();

    const { data } = await api.patch(
      '/profile/avatar',
      formData,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    return NextResponse.json(data);

  } catch (error: any) {
    console.error(
      '[Avatar Upload Error]:',
      error.response?.data || error.message,
    );

    const message =
      error.response?.data?.message ||
      error.message ||
      'Не вдалося оновити аватар';

    return NextResponse.json(
      { message },
      {
        status: error.response?.status || 500,
      },
    );
  }
}