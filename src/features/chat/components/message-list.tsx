import { MessageItem } from "./message-item"

export function MessageList() {
	return (
		<div className='flex flex-col gap-4'>
			<MessageItem />
			<MessageItem />
			<MessageItem />
		</div>
	)
}
