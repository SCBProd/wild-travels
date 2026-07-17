// app/api/profile/avatar/route.ts

export async function PATCH(req: Request) {
  try {
    const incomingFormData = await req.formData();

    const file = incomingFormData.get('avatar');

    if (!(file instanceof File)) {
      return Response.json(
        {
          message: 'Avatar file is required',
        },
        {
          status: 400,
        },
      );
    }

    const formData = new FormData();

    formData.append(
      'avatar',
      file,
      file.name,
    );

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

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error(
      'Avatar upload failed:',
      error,
    );

    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Avatar upload failed',
      },
      {
        status: 500,
      },
    );
  }
}