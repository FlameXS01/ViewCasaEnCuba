import { useState, useCallback } from "react";
import { propertiesApi } from "./api";
import type { PropertyFilters, PropertyWithImages, PropertyImageDTO, CreatePropertyRequest } from "./types";

export function useProperties() {
  const [properties, setProperties] = useState<PropertyWithImages[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProperties = useCallback(async (filters?: PropertyFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await propertiesApi.getAll({
        page: filters?.page || 1,
        per_page: filters?.per_page || 12,
        ...filters,
      });
      setProperties(response.data as unknown as PropertyWithImages[]);
      setTotal(response.total);
      setPage(response.page);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar propiedades");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchProperties = useCallback(async (filters: PropertyFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await propertiesApi.search(filters);
      setProperties(data as unknown as PropertyWithImages[]);
      setTotal(data.length);
      setPage(1);
      setTotalPages(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al buscar propiedades");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    properties,
    isLoading,
    error,
    total,
    page,
    totalPages,
    fetchProperties,
    searchProperties,
  };
}

export function useProperty(id: string) {
  const [property, setProperty] = useState<PropertyWithImages | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await propertiesApi.getById(id);
      setProperty(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar propiedad");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return { property, isLoading, error, fetchProperty };
}

export function useCreateProperty() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProperty = useCallback(async (data: CreatePropertyRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const property = await propertiesApi.create(data);
      return property;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al crear propiedad";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProperty = useCallback(async (id: string, data: Partial<CreatePropertyRequest>) => {
    setIsLoading(true);
    setError(null);
    try {
      const property = await propertiesApi.update(id, data);
      return property;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al actualizar propiedad";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteProperty = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await propertiesApi.delete(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al eliminar propiedad";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadImages = useCallback(async (propertyId: string, files: File[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const images = await propertiesApi.uploadImages(propertyId, files);
      return images;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al subir imágenes";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteImage = useCallback(async (propertyId: string, imageId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await propertiesApi.deleteImage(propertyId, imageId);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al eliminar imagen";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    createProperty,
    updateProperty,
    deleteProperty,
    uploadImages,
    deleteImage,
  };
}