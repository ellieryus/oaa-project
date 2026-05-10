import type { Student, MockRequest } from "@/features/student/types";
import { StudentRepository } from "./student.repository";

export const StudentService = {
  async getCurrentStudent(): Promise<Student> {
    return StudentRepository.findCurrentStudent();
  },

  async getRequests(): Promise<MockRequest[]> {
    const student = await StudentRepository.findCurrentStudent();
    return StudentRepository.findRequestsByStudentId(student.name);
  },

  async getRequestById(id: string): Promise<MockRequest | null> {
    return StudentRepository.findRequestById(id);
  },
};
