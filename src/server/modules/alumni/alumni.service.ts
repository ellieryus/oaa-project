/**
 * AlumnusService
 *
 * Contains all business logic for the alumni domain.
 * Call-sites (Server Actions, Route Handlers) should use this, not the repository directly.
 */
import type { AlumnusProfile } from "@/lib/mock-alumni";
import { AlumnusRepository } from "./alumni.repository";

export const AlumnusService = {
  async getProfile(id: string): Promise<AlumnusProfile | null> {
    return AlumnusRepository.findById(id);
  },

  async getTopMatchesForStudent(studentId: string): Promise<AlumnusProfile[]> {
    return AlumnusRepository.findTopMatches(studentId);
  },

  async getAllAlumni(): Promise<AlumnusProfile[]> {
    return AlumnusRepository.findAll();
  },
};
