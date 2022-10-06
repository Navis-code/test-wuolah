import { Response } from '../types';
import { API_URL } from './config';

export const getUniversities = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `${API_URL}/universities?pagination[page]=${pageParam}`
  );
  const { data, meta }: Response = await res.json();
  return { data, meta };
};
