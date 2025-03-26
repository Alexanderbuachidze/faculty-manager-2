import { http } from "msw";

interface PostData {
  title: string;
  body: string;
}


export const handlers = [
  http.post("https://jsonplaceholder.typicode.com/posts", async ({ request }) => {
    const body = await request.json() as PostData;
    return new Response(JSON.stringify({ id: 99, ...body }), {
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.put("https://jsonplaceholder.typicode.com/posts/:id", async ({ request }) => {
    const body = await request.json() as PostData;
    return new Response(JSON.stringify({ ...body }), {
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.delete("https://jsonplaceholder.typicode.com/posts/:id", () => {
    return new Response(null, { status: 200 });
  }),
];
