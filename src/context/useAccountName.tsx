import { createContext, useContext } from "react"

type AccountNameContextType = {
	username: string
}

export const AccountNameContext = createContext<AccountNameContextType | null>(null)

export const useAccountName = () => {
	const context = useContext(AccountNameContext)

	if (!context) {
		throw new Error("useAccountName должен использоваться внутри AccountNameProvider")
	}

	return context
}
