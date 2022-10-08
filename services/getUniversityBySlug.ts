import { University } from '../types';
import { API_URL } from './config';

export const getUniversityBySlug = async (slug: string) => {
  const res = await fetch(`${API_URL}/universities/${slug}`);
  const universityData: University = await res.json();
  return universityData;
};
