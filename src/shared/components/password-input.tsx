import { EyeIcon, EyeOffIcon } from "lucide-react"
import { type ComponentProps, forwardRef, useState } from "react"
import { Button } from "@ui/button"
import { Input } from "@ui/input"

const PasswordInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
	(props, ref) => {
		const [isVisible, setIsVisible] = useState(false)

		return (
			<div className='relative'>
				<Input
					ref={ref}
					type={isVisible ? "text" : "password"}
					{...props}
				/>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					className='absolute top-0 right-0 h-full'
					onClick={() => setIsVisible(!isVisible)}
				>
					{isVisible ? <EyeIcon /> : <EyeOffIcon />}
					<span className='sr-only'>
						{isVisible ? "Скрыть пароль" : "Показать пароль"}
					</span>
				</Button>
			</div>
		)
	},
)

export { PasswordInput }
