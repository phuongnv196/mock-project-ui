import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from "../../atoms/InputField";
import { useState } from 'react';
import imgLogo from "../../../img/logoApp.png";
import { Link } from 'react-router-dom';

const SignInForm = (props: any) => {

    const [inputPhoneNumber, setPhoneNumber] = useState(''); 
    const [inputIsShop, setIsShop] = useState(''); 



    const handleChangePhoneNumber = (e: any) => {
        setPhoneNumber(e.target.value);
    }
    const handleChangeIsShop = (e: any) => {
        setIsShop(e.target.checked);
    }

    const handleClickSignIn = () => {
        alert(inputPhoneNumber + '---' + inputIsShop);
    }

    return (
        <main className="d-flex w-100 h-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">

                            <div className="text-center mt-4">
                                <h1 className="h2">Chào mừng bạn quay trở lại!</h1>
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
                                        <form>
                                            <div className="mb-3">
                                                <label className="form-label">Số điện thoại</label>
                                                <input value={inputPhoneNumber} onChange={handleChangePhoneNumber} className="form-control form-control-lg" type="text" name="phonenumber" placeholder="Enter your phone number" />
                                            </div>
                                            <div>
                                                <label className="form-check">
                                                    <input value={inputIsShop} onChange={handleChangeIsShop} className="form-check-input" type="checkbox" name="is-shop"/>
                                                    <span className="form-check-label">
                                                        Đăng nhập với tư cách shop?
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button onClick={handleClickSignIn} className="btn btn-lg btn-primary">Đăng nhập</button>
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
