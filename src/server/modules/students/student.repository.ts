import type { Student, MockRequest } from "@/features/student/types";
import { STUDENT, STUDENTS, MOCK_REQUESTS } from "./student.mock";

export const StudentRepository = {
  async findCurrentStudent(): Promise<Student> {
    // TODO: replace with session-based lookup
    return STUDENT;
  },

  async findAll(): Promise<Student[]> {
    return STUDENTS;
  },

  async findRequestsByStudentId(_studentId: string): Promise<MockRequest[]> {
    // TODO: filter by studentId when auth is wired
    return MOCK_REQUESTS;
  },

  async findRequestById(id: string): Promise<MockRequest | null> {
    return MOCK_REQUESTS.find((r) => r.id === id) ?? null;
  },
};
