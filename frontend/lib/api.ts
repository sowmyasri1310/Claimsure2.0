const getBackendUrl = (): string => {
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
};

export const api = {
  get: async (path: string) => {
    const res = await fetch(`${getBackendUrl()}${path}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Network request failed' }));
      throw new Error(err.detail || 'An unexpected error occurred.');
    }
    return res.json();
  },
  
  post: async (path: string, body: any, isJson = true) => {
    const fetchHeaders: Record<string, string> = {};
    
    if (isJson) {
      fetchHeaders['Content-Type'] = 'application/json';
    }
    
    const res = await fetch(`${getBackendUrl()}${path}`, {
      method: 'POST',
      headers: fetchHeaders,
      body: isJson ? JSON.stringify(body) : body,
    });
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Request submission failed' }));
      throw new Error(err.detail || 'An unexpected error occurred.');
    }
    return res.json();
  },

  delete: async (path: string) => {
    const res = await fetch(`${getBackendUrl()}${path}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Request deletion failed' }));
      throw new Error(err.detail || 'An unexpected error occurred.');
    }
    return res.json();
  },
};
