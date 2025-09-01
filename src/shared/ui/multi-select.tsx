"use client"

import { CheckIcon, ChevronDown, XIcon } from "lucide-react"
import {
	type ComponentPropsWithoutRef,
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/shared/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { cn } from "@/shared/utils/cn"

type MultiSelectContextType = {
	open: boolean
	setOpen: (open: boolean) => void
	selectedValues: Set<string>
	toggleValue: (value: string) => void
	items: Map<string, ReactNode>
	onItemAdded: (value: string, label: ReactNode) => void
}
const MultiSelectContext = createContext<MultiSelectContextType | null>(null)

function MultiSelect({
	children,
	values,
	defaultValues,
	onValuesChange,
}: {
	children: ReactNode
	values?: string[]
	defaultValues?: string[]
	onValuesChange?: (values: string[]) => void
}) {
	const [open, setOpen] = useState(false)
	const [selectedValues, setSelectedValues] = useState(
		new Set<string>(values ?? defaultValues),
	)
	const [items, setItems] = useState<Map<string, ReactNode>>(new Map())

	function toggleValue(value: string) {
		const getNewSet = (prev: Set<string>) => {
			const newSet = new Set(prev)
			if (newSet.has(value)) {
				newSet.delete(value)
			} else {
				newSet.add(value)
			}
			return newSet
		}
		setSelectedValues(getNewSet)
		onValuesChange?.([...getNewSet(selectedValues)])
	}

	const onItemAdded = useCallback((value: string, label: ReactNode) => {
		setItems((prev) => {
			if (prev.get(value) === label) return prev
			return new Map(prev).set(value, label)
		})
	}, [])

	return (
		<MultiSelectContext
			value={{
				open,
				setOpen,
				selectedValues: values ? new Set(values) : selectedValues,
				toggleValue,
				items,
				onItemAdded,
			}}
		>
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				{children}
			</Popover>
		</MultiSelectContext>
	)
}

function MultiSelectTrigger({
	className,
	children,
	...props
}: {
	className?: string
	children?: ReactNode
} & ComponentPropsWithoutRef<typeof Button>) {
	const { open } = useMultiSelectContext()

	return (
		<PopoverTrigger asChild>
			<Button
				{...props}
				variant={props.variant ?? "input"}
				role={props.role ?? "combobox"}
				aria-expanded={props["aria-expanded"] ?? open}
				className={cn(
					"aria-invalid:border-danger aria-invalid:ring-danger/20 [&_svg:not([class*='text-'])]:text-muted-foreground flex h-auto min-h-11 w-full items-center justify-between gap-2 overflow-hidden rounded-md border-[1.5px] border-neutral-300 bg-transparent px-4 text-base whitespace-nowrap transition-colors outline-none disabled:cursor-not-allowed disabled:border-neutral-200 data-[placeholder]:text-neutral-600 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
					className,
				)}
			>
				{children}
				<ChevronDown />
			</Button>
		</PopoverTrigger>
	)
}

function MultiSelectValue({
	placeholder,
	clickToRemove = true,
	className,
	overflowBehavior = "wrap-when-open",
	...props
}: {
	placeholder?: string
	clickToRemove?: boolean
	overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff"
} & Omit<ComponentPropsWithoutRef<"div">, "children">) {
	const { selectedValues, toggleValue, items, open } = useMultiSelectContext()
	const [overflowAmount, setOverflowAmount] = useState(0)
	const valueRef = useRef<HTMLDivElement>(null)
	const overflowRef = useRef<HTMLDivElement>(null)

	const shouldWrap =
		overflowBehavior === "wrap" ||
		(overflowBehavior === "wrap-when-open" && open)

	const checkOverflow = useCallback(() => {
		if (valueRef.current == null) return

		const containerElement = valueRef.current
		const overflowElement = overflowRef.current
		const items = containerElement.querySelectorAll<HTMLElement>(
			"[data-selected-item]",
		)

		if (overflowElement != null) overflowElement.style.display = "none"
		items.forEach((child) => child.style.removeProperty("display"))
		let amount = 0
		for (let i = items.length - 1; i >= 0; i--) {
			const child = items[i]
			if (containerElement.scrollWidth <= containerElement.clientWidth) {
				break
			}
			amount = items.length - i
			child.style.display = "none"
			overflowElement?.style.removeProperty("display")
		}
		setOverflowAmount(amount)
	}, [])

	useLayoutEffect(() => {
		checkOverflow()
	}, [selectedValues, checkOverflow, shouldWrap])

	const handleResize = useCallback(
		(node: HTMLDivElement) => {
			valueRef.current = node

			const observer = new ResizeObserver(checkOverflow)
			observer.observe(node)

			return () => {
				observer.disconnect()
				valueRef.current = null
			}
		},
		[checkOverflow],
	)

	if (selectedValues.size === 0 && placeholder) {
		return (
			<span className='min-w-0 overflow-hidden px-1 text-neutral-600'>
				{placeholder}
			</span>
		)
	}

	return (
		<div
			{...props}
			ref={handleResize}
			className={cn(
				"flex h-full w-full gap-1 overflow-hidden",
				shouldWrap && "flex-wrap",
				className,
			)}
		>
			{[...selectedValues]
				.filter((value) => items.has(value))
				.map((value) => (
					<Badge
						data-selected-item
						className='group flex items-center gap-1'
						key={value}
						onClick={
							clickToRemove
								? (e) => {
										e.stopPropagation()
										toggleValue(value)
									}
								: undefined
						}
					>
						{items.get(value)}
						{clickToRemove && <XIcon className='text-neutral-900' />}
					</Badge>
				))}
			<Badge
				style={{
					display: overflowAmount > 0 && !shouldWrap ? "block" : "none",
				}}
				variant='outline'
				ref={overflowRef}
			>
				+{overflowAmount}
			</Badge>
		</div>
	)
}

function MultiSelectContent({
	search = true,
	children,
	...props
}: {
	search?: boolean | { placeholder?: string; emptyMessage?: string }
	children: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof Command>, "children">) {
	const canSearch = typeof search === "object" ? true : search

	return (
		<>
			<div style={{ display: "none" }}>
				<Command>
					<CommandList>{children}</CommandList>
				</Command>
			</div>
			<PopoverContent className='min-w-[var(--radix-popover-trigger-width)] p-0'>
				<Command {...props}>
					{canSearch ? (
						<CommandInput
							placeholder={
								typeof search === "object" ? search.placeholder : undefined
							}
						/>
					) : (
						<button
							autoFocus
							className='sr-only'
						/>
					)}
					<CommandList>
						{canSearch && (
							<CommandEmpty>
								{typeof search === "object" ? search.emptyMessage : undefined}
							</CommandEmpty>
						)}
						{children}
					</CommandList>
				</Command>
			</PopoverContent>
		</>
	)
}

function MultiSelectItem({
	value,
	children,
	badgeLabel,
	onSelect,
	...props
}: {
	badgeLabel?: ReactNode
	value: string
} & Omit<ComponentPropsWithoutRef<typeof CommandItem>, "value">) {
	const { toggleValue, selectedValues, onItemAdded } = useMultiSelectContext()
	const isSelected = selectedValues.has(value)

	useEffect(() => {
		onItemAdded(value, badgeLabel ?? children)
	}, [value, children, onItemAdded, badgeLabel])

	return (
		<CommandItem
			{...props}
			value={value}
			onSelect={(v) => {
				toggleValue(v)
				onSelect?.(v)
			}}
		>
			{children}
			<CheckIcon
				className={cn("size-4", isSelected ? "opacity-100" : "opacity-0")}
			/>
		</CommandItem>
	)
}

function MultiSelectGroup(
	props: ComponentPropsWithoutRef<typeof CommandGroup>,
) {
	return <CommandGroup {...props} />
}

function MultiSelectSeparator(
	props: ComponentPropsWithoutRef<typeof CommandSeparator>,
) {
	return <CommandSeparator {...props} />
}

function useMultiSelectContext() {
	const context = useContext(MultiSelectContext)
	if (context == null) {
		throw new Error(
			"useMultiSelectContext must be used within a MultiSelectContext",
		)
	}
	return context
}

export {
	MultiSelect,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectSeparator,
	MultiSelectTrigger,
	MultiSelectValue,
}
