// app/api/profile/avatar/route.ts

export async function PATCH(req: Request) {
  try {
    console.log('START AVATAR PATCH');

    const formData = await req.formData();

    console.log('FORM DATA OK');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/profile/avatar`,
      {
        method: 'PATCH',
        body: formData,
        headers: {
          cookie: req.headers.get('cookie') ?? '',
        },
      },
    );

    console.log('BACKEND STATUS:', response.status);

    const text = await response.text();

    console.log('BACKEND RESPONSE:', text);

    return new Response(text, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('AVATAR ERROR:', error);

    return Response.json(
      {
        message: 'Avatar upload failed',
        error: error instanceof Error ? error.message : error,
      },
      {
        status: 500,
      },
    );
  }
}