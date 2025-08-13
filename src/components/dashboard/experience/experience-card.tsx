"use client"

import { Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { IEducation, IExperience, IItemProps } from "@/types/dashboard.types"
import { experienceService } from "@/services/experience.service"
import { useExperience } from "@/hooks/useExperience"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import ExperienceForm from "./experience-form"

export default function ExperienceCard() {
	const [isOpen, setIsOpen] = useState(false)
	const [experience, setExperience] = useState<IExperience | null>(null)

	const { data, isLoading, deleteItem } = useExperience()

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open)
		if (!open) {
			setExperience(null)
		}
	}

	const handleClose = () => {
		setIsOpen(false)
		setExperience(null)
	}

	const handleUpdate = async (id: string) => {
		const experience = await experienceService.getById(id)
		setExperience(experience)
		setIsOpen(true)
	}

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='flex flex-col gap-3'>
			<h2 className='text-lg font-semibold text-neutral-900 md:text-xl'>Опыт работы</h2>
			<div className='relative ms-2 flex flex-col gap-3 rounded-lg bg-neutral-100 p-4 transition-all lg:p-6'>
				<Dialog
					open={isOpen}
					onOpenChange={handleOpenChange}
				>
					<DialogTrigger asChild>
						<Button
							tabIndex={0}
							variant='icon'
							className='absolute top-2 right-2 size-10 lg:top-4'
						>
							<Plus />
						</Button>
					</DialogTrigger>
					<ExperienceForm
						experience={experience}
						onClose={handleClose}
					/>
				</Dialog>
				<p className='pe-10 text-lg font-semibold text-neutral-900 lg:ps-2'>Опыт работы</p>
				{data && data.length > 0 && (
					<div className='flex flex-col gap-2'>
						{data?.map((item, idx) => (
							<ExperienceItem
								key={idx}
								{...item}
								onUpdate={handleUpdate}
								onDelete={() => deleteItem(item.id)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
export function ExperienceItem({ id, years, description, onUpdate, onDelete }: IExperience & IItemProps) {
	return (
		<div
			className='group relative flex flex-col justify-between overflow-hidden rounded-xs bg-neutral-100 p-2 transition-colors outline-none focus-within:bg-neutral-200 hover:bg-neutral-200'
			tabIndex={0}
		>
			<div className='flex max-w-[calc(100%-96px)] -translate-x-2 flex-col gap-1 transition-transform group-focus-within:translate-x-0 group-hover:translate-x-0'>
				<p className='text-base font-semibold text-neutral-900'>{years}</p>
				<p className='text-sm text-neutral-600'>{description}</p>
			</div>
			<div>
				<button
					type='button'
					className='bg-brand-600 hover:bg-brand-500 focus:bg-brand-500 absolute inset-y-0 end-12 flex w-12 cursor-pointer items-center justify-center text-neutral-100 opacity-0 transition-opacity outline-none group-focus-within:opacity-100 group-hover:opacity-100'
					tabIndex={0}
					onClick={() => onUpdate(id)}
				>
					<Pencil />
				</button>
				<button
					type='button'
					className='bg-danger hover:bg-danger/90 focus:bg-danger/90 absolute inset-y-0 end-0 flex w-12 cursor-pointer items-center justify-center text-neutral-100 opacity-0 transition-opacity outline-none group-focus-within:opacity-100 group-hover:opacity-100'
					tabIndex={0}
					onClick={() => onDelete(id)}
				>
					<Trash2 />
				</button>
			</div>
		</div>
	)
}
