import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from "../../atoms/InputField";
import { useEffect, useState } from 'react';
import imgLogo from "../../../img/logoApp.png";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/reducers/Customer/customerSlice';
import { RootState } from 'app/store';
import { shopLogin } from 'redux/reducers/Shop/shopSlice';

const SignInForm = (props: any) => {

    const { onLoginSuccess } = props;
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state: RootState) => state.customerReducer);
    const shop = useSelector((state: RootState) => state.shopReducer);

    const [isShop, setIsShop] = useState(false);

    const schema = yup.object().shape({
        phoneNumber: yup.string()
            .required("Vui lòng nhập số điện thoại.")
            .matches(/^0+[0-9]{9}$/, 'Định dạng không hợp lệ')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            phoneNumber: undefined
        },
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const handleChangeIsShop = (e: any) => {
        setIsShop(e.target.checked);
    }

    const handleOnSubmit = (data: any) => {
        if (!isShop) {
            dispatch(login(data.phoneNumber));
        } else {
            dispatch(shopLogin(data.phoneNumber));
        }
        return false;
    }

    useEffect(() => {
        if (user.customer && user.customer.customerId) {
            onLoginSuccess && onLoginSuccess();
        }

        if (shop.currentShop && shop.currentShop.shopId) {
            onLoginSuccess && onLoginSuccess();
        }
    }, [user, shop]);

    return (
        <main className="d-flex w-100 h-100">
            <div className="container d-flex flex-column">
                <div className="row h-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell">
                            <div className="text-center mt-2">
                                <h3 className="h3">Chào mừng bạn quay trở lại!</h3>
                                <p className="lead">
                                    Đăng nhập tài khoản để tiếp tục
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <div className="text-center">
                                            <img src={imgLogo} alt="Fashion Store" className="img-fluid rounded-circle" width="250" height="250" />
                                        </div>
                                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                                            <div className="mb-3">
                                                <label className="form-label">Số điện thoại</label>
                                                <input {...register('phoneNumber' as never)} className="form-control form-control-lg" type="text" placeholder="Nhập số điện thoại" />
                                                <span className="text-danger">{errors.phoneNumber && (errors.phoneNumber as any).message}</span>
                                            </div>
                                            <div>
                                                <label className="form-check">
                                                    <input onChange={handleChangeIsShop} className="form-check-input" type="checkbox" />
                                                    <span className="form-check-label">
                                                        Đăng nhập với tư cách shop?
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button className="btn btn-lg btn-primary">Đăng nhập</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            Không có tài khoản? <Link to={"/signup"}>Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignInForm;
