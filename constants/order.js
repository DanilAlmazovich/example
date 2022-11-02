export const paymentTypeMap = {
	vm_payment: 'Visa/Mastercard',
	elsom_payment: 'Elsom',
	balance_payment: 'Balance KG',
	megapay_payment: 'MegaPay',
	elcart_payment: 'Elcart',
	odengi_payment: 'O!Dengi Pay',
	cash_on_delivery: 'Оплата при доставке',
}

export const statusMap = {
	order_placed: {
		text: 'Заказ принят',
		width: 25
	},
	confirmed: {
		text: 'Подтвержден',
		width: 50
	},
	processed: {
		text: 'В обработке',
		width: 75
	},
	delivered: {
		text: 'Доставлен',
		width: 100
	}
}

export const deliveryTypeMap = {
	standard: 'Стандарт',
	express: 'Экспресс',
}

export const paymentStatusMap = {
	paid: 'заказ оплачен',
	unpaid: 'заказ неоплачен'
}