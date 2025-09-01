import { createContext, type PropsWithChildren, useContext  } from "react"

type ContextProps = {
	onClose: () => void
}

const DialogContext = createContext<ContextProps | null>(null)

export function DialogProvider({ 
	children, 
	onClose 
}: PropsWithChildren<ContextProps>) {
	return (
		<DialogContext.Provider value={{ onClose }}>
			{children}
		</DialogContext.Provider>
	);
}

export function useDialogContext() {
	const ctx = useContext(DialogContext)
	if (!ctx) {
		throw new Error('useDialogContext must be used within DialogProvider')
	}
	return ctx
}