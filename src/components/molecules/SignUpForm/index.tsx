const SignUpForm = () => {
    return (
        <div className="sign-up-form">
            <div className="group">
                <label htmlFor="user" className="label">Username</label>
                <input id="user" type="text" className="input" placeholder="Create your Username"/></div>
            <div className="group"><label htmlFor="pass" className="label">Password</label>
                <input id="pass" type="password" className="input" placeholder="Create your password"/>
            </div>
            <div className="group">
                <label htmlFor="pass" className="label">Repeat Password</label>
                <input id="pass" type="password" className="input" placeholder="Repeat your password"/>
            </div>
            <div className="group"><label htmlFor="pass" className="label">Email Address</label>
                <input id="pass" type="text" className="input" placeholder="Enter your email address"/>
            </div>
            <div className="group">
                <input type="submit" className="button" value="Sign Up"/>
            </div>
            <div className="hr"/>
            <div className="foot">
                <label htmlFor="tab-1">Already Member?</label>
            </div>
        </div>
    )
}

export default SignUpForm;
