"use client"

import { Command as CommandPrimitive } from "cmdk"
import { useMemo, useState } from "react"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/shared/ui/command"
import { Input } from "@/shared/ui/input"
import { Popover, PopoverAnchor, PopoverContent } from "@/shared/ui/popover"

type AutocompleteProps<T extends string> = {
	selectedValue?: T
	onSelectedValueChange: (value?: T) => void
	searchValue: string
	onSearchValueChange: (value: string) => void
	options: { value: T; label: string }[]
	isLoading?: boolean
	emptyMessage?: string
	placeholder?: string
}

export function Autocomplete<T extends string>({
	selectedValue,
	onSelectedValueChange,
	searchValue,
	onSearchValueChange,
	options,
	isLoading,
	emptyMessage,
	placeholder,
}: AutocompleteProps<T>) {
	const [isOpen, setIsOpen] = useState(false)

	const getLabel = useMemo(
		() =>
			options.reduce(
				(acc, option) => {
					acc[option.value] = option.label
					return acc
				},
				{} as Record<string, string>,
			),
		[options],
	)

	const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		if (
			!event.relatedTarget?.hasAttribute("cmdk-list") &&
			getLabel[selectedValue ?? ""] !== searchValue
		) {
			onSelectedValueChange()
			onSearchValueChange("")
		}
	}

	const onSelectItem = (inputValue: string) => {
		if (inputValue === selectedValue) {
			onSelectedValueChange()
			onSearchValueChange("")
		} else {
			onSelectedValueChange(inputValue as T)
			onSearchValueChange(getLabel[inputValue] ?? "")
		}
		setIsOpen(false)
	}

	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Command
				shouldFilter={true}
				filter={(value, search) => {
					const label = getLabel[value]
					return label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
				}}
			>
				<PopoverAnchor asChild>
					<CommandPrimitive.Input
						asChild
						value={searchValue}
						onValueChange={onSearchValueChange}
						onKeyDown={(event) => setIsOpen(event.key !== "Escape")}
						onMouseDown={() => setIsOpen((open) => !!searchValue || !open)}
						onBlur={onInputBlur}
					>
						<Input placeholder={placeholder} />
					</CommandPrimitive.Input>
				</PopoverAnchor>
				{!isOpen && (
					<CommandList
						aria-hidden='true'
						className='hidden'
					/>
				)}
				<PopoverContent
					asChild
					onOpenAutoFocus={(event) => event.preventDefault()}
					onInteractOutside={(event) => {
						if (
							event.target instanceof Element &&
							event.target.hasAttribute("cmdk-input")
						) {
							event.preventDefault()
						}
					}}
					className='w-[var(--radix-popover-trigger-width)] p-0'
				>
					<CommandList>
						{options.length > 0 && !isLoading ? (
							<CommandGroup>
								{options.map(({ value, label }) => (
									<CommandItem
										key={value}
										value={value}
										onMouseDown={(event) => event.preventDefault()}
										onSelect={onSelectItem}
									>
										{label}
									</CommandItem>
								))}
							</CommandGroup>
						) : null}
						{!isLoading ? (
							<CommandEmpty>{emptyMessage ?? "Ничего не найдено"}</CommandEmpty>
						) : null}
					</CommandList>
				</PopoverContent>
			</Command>
		</Popover>
	)
}
