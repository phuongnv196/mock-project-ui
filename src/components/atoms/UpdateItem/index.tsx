import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from 'redux/reducers/Item/itemSlice';
import { ItemCreateModel } from 'models/item-create.model';
import { Link } from 'react-router-dom';
import { RootState } from 'app/store';


const UpdateItem = (props: any) => {
    const {shopId, defaultItem, onSaveSuccess} = props;
    const itemState = useSelector((state: RootState) => state.itemReducer);
    
    const [item, setItem] = useState({
        shopId : shopId,
        itemId: defaultItem.itemId,
        name: '',
        price : '',
        image: undefined
    });

    const dispatch = useDispatch();

    const schema = yup.object().shape({
        name: yup.string()
        .required("Vui lòng nhập tên."), 
        price : yup.string()
        .required("Vui lòng nhập giá.")           
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            shopId: shopId,
            itemId: defaultItem.itemId,
            name: defaultItem.name,
            price: defaultItem.price
        },
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const handleChangeFile = (e: any) => {
        setItem({
            ...item,
            image: e.target.files && e.target.files.length > 0? e.target.files[0] : undefined
        });
    }

    const handleOnSubmit = async (data: any) => {
        let itemData = item as any;
        Object.keys(data).forEach((e, i) => {
            itemData[e] = data[e];
        });
        setItem(itemData);
        await dispatch(updateItem(item as ItemCreateModel));
        onSaveSuccess && onSaveSuccess(itemState.itemId);
        return false;
    }

    return (
        <main className="d-flex w-100 h-100">
            <div className="container d-flex flex-column">
                <div className="row">
                    <div className="col-12 mx-auto d-table h-100">
                        <div className="d-table-cell">
                            <div className="text-center mt-2">
                                <p className="lead">
                                    Nhập thông tin sản phẩm cần chinh sửa.
                                </p>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                                            <div className="mb-3">
                                                <label className="form-label">Tên sản phẩm</label>
                                                <input {...register('name' as never)} className="form-control form-control-lg" type="text" placeholder="Nhập tên sẩn phẩm" />
                                                <span className="text-danger">{ errors.name && (errors.name as any).message }</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Giá sản phẩm</label>
                                                <input {...register('price' as never)} className="form-control form-control-lg" type="text" placeholder="Nhập giá sẩn phẩm" />
                                                <span className="text-danger">{ errors.price && (errors.price as any).message }</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Hình ảnh</label>
                                                <input className="form-control form-control-lg" type="file" name="avatar-logo" placeholder="Chọn Image" onChange={handleChangeFile} />
                                            </div>
                                            <div className="text-center mt-3">
                                                <button className="btn btn-lg btn-primary">Sửa sản phẩm</button>
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

export default UpdateItem;
