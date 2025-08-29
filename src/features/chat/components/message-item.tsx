export function MessageItem() {
	return (
		<div className='bg-brand-600 flex w-fit max-w-[60%] flex-col items-end gap-1 self-end rounded-md rounded-br-none p-2 px-3 text-neutral-100'>
			<p className='text-sm'>message</p>
			<p className='text-xs'>createdAt</p>
		</div>
	)
}
