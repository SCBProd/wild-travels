import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../api';

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  try {
    const cookieStore = await cookies();

    const { data } = await api.post('/stories/', formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);

  } catch (error) {
    const err = error as ApiError;

    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      {
        status: err.response?.status ?? 500,
      }
    );
  }
}