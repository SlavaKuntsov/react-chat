import { withFormik, ErrorMessage  } from "formik";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import classNames from "classnames";
import { connect } from 'react-redux'

import store from '../redux/store'
import validate from "../utils/helpers/validate"
import userAction from '../redux/actions/user'

import Button from "../components/Button";
import Block from "../components/Layout/Block"


const Register = (props) => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        dirty,
    } = props;
	
	useEffect(() => {
		document.title = 'Register'
	}, [])

	// const navigate = useNavigate();
	
	// useEffect(() => {
	// 	// if(window.localStorage.token !== '' || window.localStorage.token !== undefined || window.localStorage.token !== null) {
	// 	// 	navigate("/login");
	// 	// }
	// 	// if (isAuth) {
	// 	// 	return navigate("/home") ;
	// 	// }

	// }, [window.localStorage.token, navigate])

    return (
        <section className="inline-block text-center p-5">
            <div className="mb-10">
                <h1 className="text-slate-950 font-semibold text-3xl pb-3">
                    Регистрация
                </h1>
                <h3 className="text-gray-500 text-lg">
                    Для входа в чат, вам нужно зарегистрироваться
                </h3>
            </div>
			<Block>
				<form
					onSubmit={handleSubmit}
					className="auth flex flex-col gap-1"
				>
					<input
						className={
							classNames(
								' w-80 py-3 px-5 mt-2 border-2 border-gray-200 border-solid rounded ease-in-out duration-500 transition-all',
								{'border-red-500' : touched.email && errors.email},
								{'border-green-500' : touched.email && !errors.email},
							)
						}
						id="email"
						type="text"
						placeholder="Еmail"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={errors}
					/>
					<ErrorMessage name="email" component="span" className="text-red-400 text-sm leading-3 text-start"/>
					<input
						className={
							classNames(
								'w-80 py-3 px-5 mt-2 border-2 border-gray-200 border-solid rounded',
								{'border-red-500' : touched.fullname && errors.fullname },
								{'border-green-500' : touched.fullname && !errors.fullname}
							)
						}
						type="text"
						placeholder="Ваше имя и фамилия"
						id="fullname"
						value={values.fullname}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={errors}
					/>
					<ErrorMessage name="fullname" component="span" className="text-red-400 text-sm leading-3 text-start"/>
					<input
						className={
							classNames(
								' w-80 py-3 px-5 mt-2 border-2 border-gray-200 border-solid rounded transition-[border] ease-in-out duration-500',
								{'border-red-500' : touched.password && errors.password},
								{'border-green-500' : touched.password && !errors.password},
							)
						}
						placeholder="Пароль"
						id="password"
						type="password"
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={errors}
					/>
					<ErrorMessage name="password" component="span" className="text-red-400 text-sm leading-3 text-start"/>
					<input
						className={
							classNames(
								'w-80 py-3 px-5 mt-2 border-2 border-gray-200 border-solid rounded',
								{'border-red-500' : touched.password_submit && errors.password_submit},
								{'border-green-500' : touched.password_submit && !errors.password_submit},
							)
						}
						placeholder="Повторите пароль"
						type="password"
						id="password_submit"
						value={values.password_submit}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={errors}
					/>
					<ErrorMessage name="password_submit" component="span" className="text-red-400 text-sm leading-3 text-start mb-5"/>
					<Button
						htmlType='submit'
						className='bg-blue-500 mt-3'
						type='primary'
						size='large'
						onSubmit={handleSubmit}
						disabled={isSubmitting}
					>
						Зарегистрироваться
					</Button>
					<Link to="/login" className="text-gray-500 mt-3">
						Войти в аккаунт
					</Link>
				</form>
			</Block>
        </section>
    );
};

const MyEnhancedForm = withFormik({

	enableReinitialize: true,

    mapPropsToValues: () => ({ 
		email: "",
		fullname: "",
		password: "" ,
		password_submit: "" 
	}),

    validate: (values) => {
		console.log('values: ', values);
        let errors = {};

		validate({ isAuth: false, errors, values })

		console.log('values: ', values);
		console.log('errors: ', errors);

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
		console.log('values: ', values)

		store.dispatch(userAction.fetchUserRegister(values))

		setSubmitting(false)
    },

    displayName: "Register", // helps with React DevTools
})(Register);

// export default MyEnhancedForm;


export default connect(
	({ user }) => console.log('user ', user) || ({
		isAuth: user.isAuth,
	}),
	userAction
)(MyEnhancedForm)
