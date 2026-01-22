// API Client stub for future backend integration
// Currently uses mock data, will be replaced with actual API calls

const API_BASE_URL = '/api';

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export const apiClient = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    await delay(300); // Simulate network latency
    console.log(`[API] GET ${API_BASE_URL}${endpoint}`);
    // In production, this would be:
    // const response = await fetch(`${API_BASE_URL}${endpoint}`);
    // return response.json();
    return { data: {} as T, success: true };
  },

  async post<T, D = unknown>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    await delay(500);
    console.log(`[API] POST ${API_BASE_URL}${endpoint}`, data);
    return { data: {} as T, success: true };
  },

  async patch<T, D = unknown>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    await delay(400);
    console.log(`[API] PATCH ${API_BASE_URL}${endpoint}`, data);
    return { data: {} as T, success: true };
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    await delay(300);
    console.log(`[API] DELETE ${API_BASE_URL}${endpoint}`);
    return { data: {} as T, success: true };
  },
};

// Typed API functions (stubs for future implementation)
export const api = {
  // Users
  getUsers: () => apiClient.get('/users'),
  getUser: (id: string) => apiClient.get(`/users/${id}`),
  updateUser: (id: string, data: unknown) => apiClient.patch(`/users/${id}`, data),

  // Guilds
  getGuilds: () => apiClient.get('/guilds'),
  getGuild: (id: string) => apiClient.get(`/guilds/${id}`),

  // Classes
  getClasses: () => apiClient.get('/classes'),
  getClass: (id: string) => apiClient.get(`/classes/${id}`),

  // Campaigns
  getCampaigns: () => apiClient.get('/campaigns'),
  getCampaign: (id: string) => apiClient.get(`/campaigns/${id}`),

  // Quests
  getQuests: () => apiClient.get('/quests'),
  getQuest: (id: string) => apiClient.get(`/quests/${id}`),

  // Tasks
  getTasks: () => apiClient.get('/tasks'),
  getTask: (id: string) => apiClient.get(`/tasks/${id}`),
  createTask: (data: unknown) => apiClient.post('/tasks', data),
  updateTask: (id: string, data: unknown) => apiClient.patch(`/tasks/${id}`, data),
  deleteTask: (id: string) => apiClient.delete(`/tasks/${id}`),

  // Submissions
  getSubmissions: () => apiClient.get('/submissions'),
  createSubmission: (data: unknown) => apiClient.post('/submissions', data),

  // Reviews
  getReviews: () => apiClient.get('/reviews'),
  createReview: (data: unknown) => apiClient.post('/reviews', data),

  // Calendar
  getCalendarEvents: () => apiClient.get('/calendar'),
};
