import { Action } from "../context/FacultyContext"
import { Faculty } from "./faculty"

const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts"

export async function addFaculty(dispatch: React.Dispatch<Action>, newFaculty: Faculty) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFaculty),
    })

    if (!res.ok) {
      throw new Error(`Failed to create faculty: ${res.status} ${res.statusText}`)
    }

    const response = await res.json()
    const facultyWithUniqueId = { ...response, id: Date.now() }

    dispatch({ type: "ADD_FACULTY", payload: facultyWithUniqueId })
    return { success: true }
  } catch (error) {
    console.error("Add Faculty Error:", error)
    return { success: false, message: (error as Error).message }
  }
}


export async function updateFaculty(dispatch: React.Dispatch<Action>, faculty: Faculty) {
  try {
    const res = await fetch(`${API_BASE_URL}/${faculty.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faculty),
    })

    if (!res.ok) {
      throw new Error(`Failed to update faculty: ${res.status} ${res.statusText}`)
    }

    const response = await res.json()

    dispatch({ type: "UPDATE_FACULTY", payload: response })
    dispatch({ type: "SET_SELECTED_FACULTY", payload: response })
    return { success: true }
  } catch (error) {
    console.error("Update Faculty Error:", error)
    return { success: false, message: (error as Error).message }
  }
}

export async function deleteFaculty(dispatch: React.Dispatch<Action>, id: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" })

    if (!res.ok) {
      throw new Error(`Failed to delete faculty: ${res.status} ${res.statusText}`)
    }

    dispatch({ type: "DELETE_FACULTY", payload: id })
    return { success: true }
  } catch (error) {
    console.error("Delete Faculty Error:", error)
    return { success: false, message: (error as Error).message }
  }
}
