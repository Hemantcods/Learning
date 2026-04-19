'use client';
import courseData from "@/data/music_course.json";
import { div, p } from "motion/react-client";
import Link from "next/link";
import { BackgroundGradient } from "./ui/background-gradient";

// create a own data type for course data
interface Course{
     id: number,
     title: string,
     slug: string,
     description: string,
     price: number,
     instructor: string,
     isFeatured: boolean
}
const FeaturedSection = () => {
    const featuredCourses =courseData.courses.filter((course:Course) => course.isFeatured);
  return (
    <div className="py-12 bg-gray-900">
        <div>
            <div className="text-center">
                <h2 className=" text-2xl text-teal-600 font-semibold tracking-wide uppercase ">Featured Courses</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl">Learn with the best</p>
            </div>
        </div>
        <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {featuredCourses.map((course:Course)=>(
                    <div key={course.id} className="flex justify-center">
                            <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hiddec h-full max-w-sm">
                                <div className="p-4 sm:p-6 flex flex-col items-center text-center grow">
                                    <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{course.title}</p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{course.description}</p>
                                    <Link href={`/courses/${course.slug}`} className="bg-black dark:bg-white dark:text-black px-2 rounded mt-3 ">
                                        Learn More
                                    </Link>
                                </div>
                            </BackgroundGradient>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-20 text-center">
            <Link href={'/course'}
            className="px-4 pt-4 rounded border-neutral-600 text-neutral-700 bg-white hover:bg-neutral-100 font-medium border-2 py-2 inline-block text-center"
            >
                View All Courses
            </Link>
        </div>
    </div>
  )
}

export default FeaturedSection
