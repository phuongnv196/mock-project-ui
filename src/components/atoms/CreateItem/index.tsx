import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from 'redux/reducers/Item/itemSlice';
import { ItemCreateModel } from 'models/item-create.model';
import { Link } from 'react-router-dom';


const CreateItem = () => {
    const [item, setItem] = useState({
        shopId : '',
        name: '',
        price : '',
        image: undefined
    });

    const dispatch = useDispatch();

    const schema = yup.object().shape({
        shopId: yup.string()
        .required("Vui lòng nhập shop."), 
        name: yup.string()
        .required("Vui lòng nhập tên."), 
        price : yup.string()
        .required("Vui lòng nhập giá.")           
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            shopId: undefined,
            name: undefined,
            price: undefined
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

    const handleOnSubmit = (data: any) => {
        let itemData = item as any;
        Object.keys(data).forEach((e, i) => {
            itemData[e] = data[e];
        });
        setItem(itemData);
        dispatch(createItem(item as ItemCreateModel));
        return false;
    }

    return (
        <main className="d-flex w-100 h-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">

                            <div className="text-center mt-4">
                                <h1 className="h2">Nhập sản phẩm mới</h1>
                                <p className="lead">
                                    Nhập thông tin sản phẩm cần thêm.
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                                            <div className="mb-3">
                                                <label className="form-label">Shop Id</label>
                                                <input {...register('shopId' as never)} className="form-control form-control-lg" type="text" placeholder="Nhập shop Id"/>
                                                <span className="text-danger">{ errors.shopId && (errors.shopId as any).message }</span>
                                            </div>
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
                                                <label className="form-label">Image</label>
                                                <input className="form-control form-control-lg" type="file" name="avatar-logo" placeholder="Chọn Image" onChange={handleChangeFile} />
                                            </div>
                                            <div className="text-center mt-3">
                                                <button className="btn btn-lg btn-primary">Create Item</button>
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

export default CreateItem;
