import { useState } from 'react';

const SignUpForm = () => {

    const [inputPhoneNumber, setPhoneNumber] = useState(''); 
    const [inputName, setName] = useState(''); 
    const [inputLogo, setLogo] = useState(''); 
    const [inputIsShop, setIsShop] = useState(''); 

    const handleChangePhoneNumber = (e: any) => {
        setPhoneNumber(e.target.value);
    }
    const handleChangeName = (e: any) => {
        setName(e.target.value);
    }
    const handleChangeLogo = (e: any) => {
        setLogo(e.target.files[0]);
    }
    const handleChangeIsShop = (e: any) => {
        setIsShop(e.target.checked);
    }

    const handleClickSignUp = () => {
        alert(inputPhoneNumber + '---' + inputName + '---' + inputIsShop);
    }

    return (
        <main className="d-flex w-100 h-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">

                            <div className="text-center mt-4">
                                <h1 className="h2">Get started</h1>
                                <p className="lead">
                                    Start creating the best possible user experience for you customers.
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <form>
                                        <div className="mb-3">
                                                <label className="form-label">Phone Number</label>
                                                <input value={inputPhoneNumber} onChange={handleChangePhoneNumber} className="form-control form-control-lg" type="text" name="phonenumber" placeholder="Enter your phone number" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <input value={inputName} onChange={handleChangeName} className="form-control form-control-lg" type="text" name="name" placeholder="Enter your name" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Avatar/Logo</label>
                                                <input onChange={handleChangeLogo} className="form-control form-control-lg" type="file" name="avatar-logo" placeholder="Enter your Avatar/Logo" />
                                            </div>
                                            <div>
                                                <label className="form-check">
                                                    <input value={inputIsShop} onChange={handleChangeIsShop} className="form-check-input" type="checkbox" name="is-shop"/>
                                                    <span className="form-check-label">
                                                        Please check if you are a shop?
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button onClick={handleClickSignUp} className="btn btn-lg btn-primary">Sign up</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	    </main>
    )
}

export default SignUpForm;
