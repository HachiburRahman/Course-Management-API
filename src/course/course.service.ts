/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

// 1. Define an interface so TypeScript knows what a Course looks like
export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  description?: string;
}

@Injectable()
export class CourseService {
  // 2. Explicitly type the array as Course[]
  private courses: Course[] = [];

  getAllCourses() {
    return { 
      message: 'All courses fetched successfully', 
      data: this.courses 
    };
  }

  getCourseById(id: string) {
    const course = this.courses.find(c => c.id === id);
    if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return { 
      message: 'Course fetched successfully', 
      id: id,
      data: course 
    };
  }

  createCourse(dto: CreateCourseDto) {
    const newCourse: Course = {
      id: (this.courses.length + 1).toString(),
      ...dto,
    };
    this.courses.push(newCourse);
    
    return {
      message: 'Course created successfully',
      data: newCourse,
    };
  }

  updateCourse(id: string, dto: UpdateCourseDto) {
    const index = this.courses.findIndex(c => c.id === id);
    if (index === -1) throw new NotFoundException('Course not found');

    // Full update: Replace fields with DTO
    this.courses[index] = { ...this.courses[index], ...dto } as Course;
    
    return {
      message: 'Course updated successfully',
      id: id,
      data: this.courses[index],
    };
  }

  // 3. RESTORED: patchCourse method that was missing
  patchCourse(id: string, dto: UpdateCourseDto) {
    const index = this.courses.findIndex(c => c.id === id);
    if (index === -1) throw new NotFoundException('Course not found');

    this.courses[index] = { ...this.courses[index], ...dto } as Course;

    return {
      message: 'Course patched successfully',
      id: id,
      updatedFields: Object.keys(dto),
    };
  }

  deleteCourse(id: string) {
    const initialLength = this.courses.length;
    this.courses = this.courses.filter(c => c.id !== id);
    
    if (this.courses.length === initialLength) {
        throw new NotFoundException('Course not found');
    }

    return { 
      message: 'Course deleted successfully', 
      id: id 
    };
  }

  uploadCourseMaterial(id: string, file: Express.Multer.File) {
    return {
      message: 'Material uploaded successfully',
      courseId: id,
      filename: file.filename,
      path: file.path,
    };
  }
}