import { ForwardedRef, useImperativeHandle, useRef } from "react"

export const useSubmitButton = (ref: ForwardedRef<HTMLButtonElement>) => {
	const submitButtonRef = useRef<HTMLButtonElement>(null)

	useImperativeHandle(ref, () => submitButtonRef.current as HTMLButtonElement)

	return submitButtonRef
}
