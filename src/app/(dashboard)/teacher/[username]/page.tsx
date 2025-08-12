"use client"

import AboutCard from "@/components/dashboard/about/about-card"
import EducationCard from "@/components/dashboard/education/education-card"
import ExperienceCard from "@/components/dashboard/experience/experience-card"
import SubjectCard from "@/components/dashboard/subject/subject-card"

export default function TeacherPage() {
	return (
		<div className='flex flex-col gap-6 lg:gap-8'>
			<AboutCard />
			<EducationCard />
			<ExperienceCard />
			<SubjectCard />
		</div>
	)
}
