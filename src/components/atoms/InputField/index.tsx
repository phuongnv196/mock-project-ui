import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";
import './index.scss';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    icon: PropTypes.string
};

function InputField(props: any) {

    const { form, name, label, disabled, type, icon } = props
    const { formState: { errors } } = form
    const hasError = !!errors[name]

    const handleInput = (data: any) => {
        const { value, onChange, field } = data;
        if (!!icon) {
            return (
                <div className="input-group-icon">
                    <span className="input-icon">
                        <i className={icon}></i>
                    </span>
                    <input className="form-control form-control-icon" {...field} type={type}
                        onChange={({ target: { value } }) => {
                            onChange(value);
                        }} />
                </div>
            )
        }
        return (
            <input className={'form-control ' + (!!icon ? 'form-control-icon' : '')} {...field} type={type}
                onChange={({ target: { value } }) => {
                    onChange(value);
                }} />
        )
    }

    return (
        <div className="form-group">
            <label htmlFor={name} className="label">{label}</label>
            <Controller
                control={form.control}
                name={name}
                render={({ field: { value, onChange, ...field } }) => (
                    handleInput({ value, onChange, field })
                )}
            />
            <span className="required">{errors[name]?.message}</span>
        </div>
    );
}

export default InputField;
