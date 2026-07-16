export async function PATCH(req: Request) {
  const formData = await req.formData();

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

  const data = await response.json();

  return Response.json(data, {
    status: response.status,
  });
}