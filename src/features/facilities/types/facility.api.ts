import type { Facility } from './facility.types';
import { facilitiesMock } from '@/mocks/data/facilities.mock';

let facilitiesDb: Facility[] = [...facilitiesMock];

const delay = (ms = 400) =>
  new Promise(res => setTimeout(res, ms));

//Fetch all facilities
export async function fetchFacilitiesApi(): Promise<Facility[]> {
  await delay();
  return [...facilitiesDb];
}

//Create a new facility
export async function createFacilityApi(
  data: Omit<Facility, 'id'>
): Promise<Facility> {
  await delay(500);
  const facility: Facility = {
    ...data,
    id: Date.now().toString(),
  };
  facilitiesDb.unshift(facility);
  return facility;
}

//Update an existing facility
export async function updateFacilityApi(
  data: Facility
): Promise<Facility> {
  await delay(500);
  facilitiesDb = facilitiesDb.map(facility => (facility.id === data.id ? data : facility));
  return data;
}

//Delete a facility
export async function deleteFacilityApi(id: string): Promise<void> {
  await delay();
  facilitiesDb = facilitiesDb.filter(facility => facility.id !== id);
}
