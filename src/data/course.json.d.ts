// src/data/course.json.d.ts
declare module "../data/course.json" {
  export interface ReviewRating {
    ratingValue: number;
    bestRating: number;
  }

  export interface Author {
    type: string;
    name: string;
  }

  export interface Review {
    type: string;
    reviewRating: ReviewRating;
    author: Author;
    reviewBody: string;
    datePublished: string;
  }

  export interface AggregateRating {
    type: string;
    ratingValue: number;
    reviewCount: number;
  }

  export interface CourseData {
    review: Review[];
    aggregateRating: AggregateRating;
  }

  const courseData: CourseData;
  export default courseData;
}
