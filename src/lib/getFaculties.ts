import { Faculty } from "./faculty"

export async function getFaculties(): Promise<Faculty[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch faculties");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching faculties:", error);
    return [];
  }
}
