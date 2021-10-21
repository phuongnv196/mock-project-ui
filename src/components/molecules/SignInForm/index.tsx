import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from "../../atoms/InputField";

const SignInForm = (props: any) => {


    const schema = yup.object().shape({
        email: yup.string()
            .required("E-mail không được để trống.")
            .email("E-mail không đúng định dạng."),
        password: yup.string()
            .required("Mật khẩu không được để trống.")
    });

    const form = useForm({
        defaultValues: {
            email: undefined,
            password: undefined,
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        const name = data.name;
        console.log(data);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="login p-4">
                <div className="mt-2">
                    <InputField name="email" form={form} label="E-mail" type="text" icon="fa fa-envelope"/>
                </div>
                <div className="mt-2">
                    <InputField name="password" form={form} label="Mật khẩu" type="password" icon="fa fa-lock"/>
                </div>
                <div className="mt-2">
                    <button type="submit" className="btn btn-primary">Đăng nhập</button>
                </div>
                <div className="hr"/>
                <div className="foot">
                    <a href="#">Quên mật khẩu?</a>
                </div>
            </div>
        </form>

    )
}

export default SignInForm;
