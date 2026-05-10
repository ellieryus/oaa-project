/**
 * AlumnusRepository
 *
 * Abstracts all data access for alumni. Currently backed by in-memory mock data.
 * Replace method bodies with Prisma calls when the database is wired up.
 */
import type { AlumnusProfile, AlumnusCard } from "@/features/alumni/types";
import { ALUMNI, TOP_3 } from "./alumni.mock";

export const AlumnusRepository = {
  /** Find a single alumnus by id */
  async findById(id: string): Promise<AlumnusProfile | null> {
    return ALUMNI.find((a) => a.id === id) ?? null;
  },

  /** Return all alumni */
  async findAll(): Promise<AlumnusProfile[]> {
    return ALUMNI;
  },

  /** Return the top-scored match set for a student (mock: first 3) */
  async findTopMatches(_studentId: string): Promise<AlumnusCard[]> {
    return TOP_3.map((a) => ({
      id:               a.id,
      name:             a.name,
      role:             a.role,
      company:          a.company,
      city:             a.city,
      cohort:           a.cohort,
      score:            a.score,
      shortBio:         a.shortBio,
      offerings:        a.offerings,
      nonOfferings:     a.nonOfferings,
      availabilityLevel:a.availabilityLevel,
    }));
  },
};
