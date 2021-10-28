import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { UserRegisterModel } from 'models/user-register.model';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer } from 'redux/reducers/Customer/customerSlice';
import { createShop } from 'redux/reducers/Shop/shopSlice';
import { ShopRegisterModel } from 'models/shop-register.model';
import { Link } from 'react-router-dom';


const SignUpForm = () => {
    const [user, setUser] = useState({
        phoneNumber: '',
        name: '',
        avatar: undefined,
        logo: undefined,
        isShop: false
    });

    const dispatch = useDispatch();

    const schema = yup.object().shape({
        phoneNumber: yup.string()
            .required("Vui lòng nhập số điện thoại.")
            .matches(/^0+[0-9]{9}$/, 'Định dạng không hợp lệ'),
        name: yup.string()
        .required("Vui lòng nhập tên.")      
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            phoneNumber: undefined,
            name: undefined
        },
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const handleChangeIsShop = (e: any) => {
        setUser({
            ...user,
            isShop: e.target.checked
        });
    }

    const handleChangeFile = (e: any) => {
        setUser({
            ...user,
            avatar: e.target.files && e.target.files.length > 0? e.target.files[0] : undefined,
            logo: e.target.files && e.target.files.length > 0? e.target.files[0] : undefined
        });
    }

    const handleOnSubmit = (data: any) => {
        let userData = user as any;
        Object.keys(data).forEach((e, i) => {
            userData[e] = data[e];
        });
        setUser(userData);
        if (user.isShop) {
            dispatch(createShop(user as ShopRegisterModel));
        } else {
            dispatch(createCustomer(user as UserRegisterModel));
        }
        return false;
    }

    return (
        <main className="d-flex w-100 h-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">

                            <div className="text-center mt-4">
                                <h1 className="h2">Đăng ký</h1>
                                <p className="lead">
                                    Nhập thông tin để tiếp tục.
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                                            <div className="mb-3">
                                                <label className="form-label">Số điện thoại</label>
                                                <input {...register('phoneNumber' as never)} className="form-control form-control-lg" type="text" placeholder="Nhập số điện thoại"/>
                                                { errors.phoneNumber && (errors.phoneNumber as any).message }
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Tên</label>
                                                <input {...register('name' as never)} className="form-control form-control-lg" type="text" placeholder="Nhập tên" />
                                                { errors.name && (errors.name as any).message }
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Avatar/Logo</label>
                                                <input className="form-control form-control-lg" type="file" name="avatar-logo" placeholder="Chọn Avatar/Logo" onChange={handleChangeFile} />
                                            </div>
                                            <div>
                                                <label className="form-check">
                                                    <input className="form-check-input" type="checkbox" onChange={handleChangeIsShop}/>
                                                    <span className="form-check-label">
                                                       Đăng ký với tư cách shop?
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button className="btn btn-lg btn-primary">Đăng ký</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            Bạn đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
	    </main>
    )
}

export default SignUpForm;
