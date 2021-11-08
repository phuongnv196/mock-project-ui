import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from "antd";
import { useEffect, useState } from "react";
import orderApi from 'api/orderApi'

const CreateOrder = (props: any) => {
    const { isShow, onHide, onSuccess, cartId } = props;
    const [isModalVisible, setIsShowVisible] = useState(isShow);

    const schema = yup.object().shape({
        deliveryInformation: yup.string()
            .required("Vui lòng nhập thông tin giao hàng.")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const handleCancel = () => {
        setIsShowVisible(false);
        onHide && onHide();
    };

    useEffect(() => {
        setIsShowVisible(isShow);
    }, [props])

    const handleOnSubmit = (data: any) => {
        setIsShowVisible(false);
        orderApi.create(cartId as string, data.deliveryInformation as string).then(() => {
            onSuccess && onSuccess(data);
        })
        return false;
    }
    return (
        <Modal title="Xác nhận đặt hàng" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
            <form id="submit-order" onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="row">
                    <div className="form-group">
                        <label>Thông tin giao hàng: </label>
                        <textarea {...register('deliveryInformation' as never)} className="form-control form-control-lg" placeholder="Ghi chú / Địa chỉ" />
                        <span className="text-danger">{errors.deliveryInformation && (errors.deliveryInformation as any).message}</span>
                    </div>
                </div> 
                <div className="row mt-2">
                    <div className="col-12 ">
                        <button type="submit" className="btn btn-primary float-right" style={{float: "right"}}>Đặt hàng</button>
                    </div> 
                </div> 
            </form>
        </Modal>
    )
}

export default CreateOrder