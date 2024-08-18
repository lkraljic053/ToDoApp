interface ApiTask {
  id: number;
  todo: string;
  completed: boolean;
}

export const fetchTodos = async (limit: number): Promise<ApiTask[]> => {
  const response = await fetch(`https://dummyjson.com/todos?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const data = await response.json();
  return data.todos as ApiTask[];  // Return the "todos" array with proper type
};