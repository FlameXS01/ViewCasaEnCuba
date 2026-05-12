import { useState, useCallback } from "react";
import { reviewsApi } from "./api";
import type { ReviewDTO, CreateReviewRequest } from "@/types/api";

export function useReviews(propertyId: string) {
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!propertyId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await reviewsApi.getByProperty(propertyId);
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar reseñas");
    } finally {
      setIsLoading(false);
    }
  }, [propertyId]);

  const createReview = useCallback(async (payload: CreateReviewRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const review = await reviewsApi.create(propertyId, payload);
      setReviews((prev) => [...prev, review]);
      return review;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear reseña");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [propertyId]);

  const deleteReview = useCallback(async (reviewId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await reviewsApi.delete(propertyId, reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar reseña");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [propertyId]);

  return {
    reviews,
    isLoading,
    error,
    fetchReviews,
    createReview,
    deleteReview,
  };
}