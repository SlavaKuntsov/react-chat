export default ({isAuth, errors, values}) => {

	const rules = {
		email: (errors, value) => {
			if (!value) {
				errors.email = "Введите Еmail";
			} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
			) {
				errors.email = "Исправьте Еmail";
			}
		},
		password: (errors, value) => {
			if (!value) {
				errors.password = "Введите пароль";
			} else if (
				!isAuth && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{3,})/.test(value)
			) {
				errors.password = isAuth ? 'Неверный пароль' : 'Слишком легкий пароль';
			}
		}
	}

	Object.keys(values).forEach(
		key => rules[key] && rules[key](errors, values[key])
	)
}