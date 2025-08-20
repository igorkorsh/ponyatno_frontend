// import { Archive, Pencil, Trash2 } from "lucide-react"
// import { Badge } from "@ui/badge"
// import { formatCurrency } from "@utils/format-currency"
// import { GOALS, SUBJECTS } from "../constants/subject.constants"
// import { useSubject } from "../hooks/useSubject"
// import { ProfileCard } from "./card"
// import { CardItem, IAction } from "./card-item"

// export function SubjectCard() {
// 	const { data, isLoading, updateItem, deleteItem } = useSubject()

// 	return (
// 		data && (
// 			<ProfileCard title='Предметы'>
// 				{data.map((subject, idx) => {
// 					const { id, name, minPrice, maxPrice, goals, isArchived } = subject

// 					const actions: IAction[] = [
// 						{
// 							icon: <Pencil />,
// 							label: "Редактировать",
// 							fn: () => updateItem({ id, subject }),
// 						},
// 						{
// 							icon: <Archive />,
// 							label: isArchived ? "Восстановить" : "Архивировать",
// 							fn: () => {},
// 						},
// 						{
// 							icon: <Trash2 />,
// 							label: "Удалить",
// 							fn: () => deleteItem(id),
// 						},
// 					]

// 					return (
// 						<CardItem
// 							key={idx}
// 							actions={actions}
// 						>
// 							<div className='flex flex-col gap-1'>
// 								{/* <p className='text-base font-semibold'>{SUBJECTS[name]}</p> */}
// 								<p className='text-sm text-neutral-600'>
// 									{formatCurrency(minPrice)}–{formatCurrency(maxPrice)}
// 								</p>
// 								{goals && (
// 									<div className='flex gap-1'>
// 										{/* {goals.map((goal) => (
// 											<Badge key={goal}>{GOALS[goal]}</Badge>
// 										))} */}
// 									</div>
// 								)}
// 							</div>
// 						</CardItem>
// 					)
// 				})}
// 			</ProfileCard>
// 		)
// 	)
// }
