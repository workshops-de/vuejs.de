// API utilities for fetching course data at build time

const API_BASE = 'https://workshops.de/api';

export interface CourseEvent {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  price: number;
  url: string;
}

export interface Trainer {
  id: number;
  name: string;
  bio: string;
  image_url: string;
  twitter?: string;
  github?: string;
}

export interface Course {
  id: number;
  topic: string;
  subtitle: string;
  description: string;
  image_url: string;
  reviews?: CourseReview[];
}

export interface CourseReview {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
}

// Course IDs mapping
export const COURSE_IDS = {
  'vuejs-typescript': 37,
  'vuejs-javascript': 44,
  'vuejs-composition-api': 45,
} as const;

export async function fetchCourse(courseId: number): Promise<Course | null> {
  try {
    const response = await fetch(`${API_BASE}/course/${courseId}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch course ${courseId}:`, error);
    return null;
  }
}

export async function fetchCourseEvents(courseId: number): Promise<CourseEvent[]> {
  try {
    const response = await fetch(`${API_BASE}/course/${courseId}/events`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch events for course ${courseId}:`, error);
    return [];
  }
}

export async function fetchRelatedEvents(courseId: number): Promise<CourseEvent[]> {
  try {
    const response = await fetch(`${API_BASE}/course/${courseId}/related-events`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch related events for course ${courseId}:`, error);
    return [];
  }
}

export async function fetchCourseTrainers(courseId: number): Promise<Trainer[]> {
  try {
    const response = await fetch(`${API_BASE}/course/${courseId}/trainers`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch trainers for course ${courseId}:`, error);
    return [];
  }
}

export async function fetchPortalTrainers(): Promise<Trainer[]> {
  try {
    const response = await fetch(`${API_BASE}/portal/vuejs-de/trainers`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch portal trainers:', error);
    return [];
  }
}

// Helper to fetch all data for a course
export async function fetchCourseData(courseSlug: keyof typeof COURSE_IDS) {
  const courseId = COURSE_IDS[courseSlug];

  const [course, events, relatedEvents, trainers] = await Promise.all([
    fetchCourse(courseId),
    fetchCourseEvents(courseId),
    fetchRelatedEvents(courseId),
    fetchCourseTrainers(courseId),
  ]);

  return { course, events, relatedEvents, trainers };
}

