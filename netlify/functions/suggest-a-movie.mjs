export default async (req) => {
  const backendUrl = Netlify.env.get("VITE_RENDER_BACKEND_LINK");

  if (!backendUrl) {
    return Response.json({ error: "Backend URL not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const response = await fetch(`${backendUrl}/api/suggest-a-movie`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    return Response.json({ error: "Failed to reach backend" }, { status: 502 });
  }
};

export const config = {
  path: "/api/suggest-a-movie",
  method: "POST",
};
