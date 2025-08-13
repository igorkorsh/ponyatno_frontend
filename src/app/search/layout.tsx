import { SearchFilter } from "@/components/search/filter/filter"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SearchLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='h-full bg-neutral-200 p-4 transition-all lg:p-6'>
			<div className='mx-auto grid h-full max-w-[1200px] grid-cols-[minmax(240px,1fr)_4fr] gap-6'>
				<SearchFilter />
				<ScrollArea className='h-full pe-5'>{children}</ScrollArea>
			</div>
		</div>
	)
}
