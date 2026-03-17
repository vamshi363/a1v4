// AI Service is currently disabled for maintenance.
// Previous implementation removed to secure API key usage.

export const getAdmissionsAdvice = async (query: string) => {
  return {
    text: "AI service is currently upgrading. Please check back later.",
    sources: []
  };
};

export const getNearbyUniversities = async (lat: number, lng: number) => {
  return "Location services are temporarily unavailable.";
};

export const solveComplexCareerQuery = async (profile: string) => {
  return "Career analysis is currently offline.";
};