const DEBUG = true; // Set to false in production

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchData(url: string, caller?: string): Promise<any> {
  if (DEBUG) {
    console.log(`[API Request] ${caller || 'Unknown'} -> ${url}`);
    console.time(`[API Time] ${caller || 'Unknown'} -> ${url}`);
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (DEBUG) {
      console.timeEnd(`[API Time] ${caller || 'Unknown'} -> ${url}`);
      console.log(`[API Response] ${caller || 'Unknown'} received:`, data);
    }
    
    return data;
    
  } catch (error) {
    if (DEBUG) {
      console.timeEnd(`[API Time] ${caller || 'Unknown'} -> ${url}`);
      console.error(`[API Error] ${caller || 'Unknown'} -> ${url}:`, error);
    }
    throw error;
  }
}