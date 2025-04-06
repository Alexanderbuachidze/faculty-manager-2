import { Faculty } from "../lib/faculty"
import { createContext, useReducer, ReactNode, useContext, useEffect } from "react"
import useSWR from "swr"

type State = {
  faculties: Faculty[]
  selectedFaculty: Faculty | null
}


export type Action =
  | { type: "ADD_FACULTY"; payload: Faculty }
  | { type: "UPDATE_FACULTY"; payload: Faculty }
  | { type: "DELETE_FACULTY"; payload: number }
  | { type: "SET_SELECTED_FACULTY"; payload: Faculty | null }
  | { type: "SET_INITIAL_FACULTIES"; payload: Faculty[] }


const facultyReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_FACULTY":
      return { ...state, faculties: [action.payload, ...state.faculties] }
    case "UPDATE_FACULTY":
      return {
        ...state,
        faculties: state.faculties.map((faculty) =>
          faculty.id === action.payload.id ? action.payload : faculty
        ),
      }
    case "DELETE_FACULTY":
      return { ...state, faculties: state.faculties.filter((f) => f.id !== action.payload) }
    case "SET_SELECTED_FACULTY":
      return { ...state, selectedFaculty: action.payload }
    case "SET_INITIAL_FACULTIES":
      return { ...state, faculties: action.payload };
    default:
      return state
  }
}

const FacultyContext = createContext<{ state: State; dispatch: React.Dispatch<Action>; } | undefined>(undefined)

export function FacultyProvider({ children }: { children: ReactNode; }) {

  const fetcher = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch faculties")
    return response.json()
  }

  const { data: faculties } = useSWR("https://jsonplaceholder.typicode.com/posts", fetcher)
  const [state, dispatch] = useReducer(facultyReducer, {
    faculties: [], selectedFaculty: null,
  })

  useEffect(() => {
    if (faculties) {
      dispatch({ type: "SET_INITIAL_FACULTIES", payload: faculties });
    }
  }, [faculties]);
  return <FacultyContext.Provider value={{ state, dispatch }}>{children}</FacultyContext.Provider>
}

export function useFaculty() {
  const context = useContext(FacultyContext)
  if (!context) throw new Error("useFaculty must be used within a FacultyProvider")
  return context
}
