// app/api/profile/avatar/route.ts

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api/api';
import { cookies } from 'next/headers';

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const incomingFormData = await req.formData();

    const file = incomingFormData.get('avatarUrl');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: 'Avatar file is required' },
        { status: 400 },
      );
    }

    const formData = new FormData();

    formData.append(
      'avatarUrl',
      file,
      file.name,
    );

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

  } catch (error: unknown) {
    const apiError = error as {
      response?: {
        data?: {
          message?: string;
        };
        status?: number;
      };
      message?: string;
    };

    console.error(
      '[Avatar Upload Error]:',
      apiError.response?.data || apiError.message,
    );

    return NextResponse.json(
      {
        message:
          apiError.response?.data?.message ||
          apiError.message ||
          'Не вдалося оновити аватар',
      },
      {
        status: apiError.response?.status || 500,
      },
    );
  }
}