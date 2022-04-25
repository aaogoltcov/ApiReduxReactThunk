import getTransaction from "../services/getTransaction";
import Loading from "../viewes/Loading";
import {useState} from "react";
import {formSlice} from "../features/form";
import {useDispatch, useSelector} from "react-redux";
import deleteTransaction from "../services/deleteTransaction";

export default function Item(props) {
    const { item } = props;
    const [editIsLoading, setEditLoading] = useState(false);
    const [deleteIsLoading, setDeleteLoading] = useState(false);
    const dispatch = useDispatch();
    const isUpdated = useSelector((state) => state.form.isUpdated);

    function editClickButtonHandler(event) {
        event.preventDefault();
        setEditLoading(true);
        const elementId = event.currentTarget.id;
        getTransaction(elementId).then(response => {
            dispatch(formSlice.actions.name(response.response.name));
            dispatch(formSlice.actions.price(response.response.price));
            dispatch(formSlice.actions.description(response.response.content));
            setEditLoading(false);
        })
    }

    function deleteClickButtonHandler(event) {
        event.preventDefault();
        setDeleteLoading(true);
        dispatch(formSlice.actions.isReadonly(true));
        const elementId = event.currentTarget.id;
        deleteTransaction(elementId).then(response => {
            if (response.status) {
                dispatch(formSlice.actions.isUpdated(!isUpdated));
                setDeleteLoading(false);
                dispatch(formSlice.actions.clear());
                dispatch(formSlice.actions.isReadonly(false));
            } else {
                deleteTransaction(elementId);
            }
        })
    }

    return (
        <li key={item.id} className="list-group-item">
            <div className="transaction">
                <div className="transaction-text">{item.name}: {item.price} руб.</div>
                <div className="transaction-button">
                    <button id={item.id} type="button"
                            className="btn btn-secondary"
                            onClick={editClickButtonHandler}
                    >
                        <Loading status={editIsLoading} title={<i className="fas fa-edit"/>} />
                    </button>
                    <button id={item.id}
                            type="button"
                            className="btn btn-danger"
                            onClick={deleteClickButtonHandler}
                    >
                        <Loading status={deleteIsLoading} title={<i className="fa fa-trash" aria-hidden="true"/>} />
                    </button>
                </div>
            </div>
        </li>
    )
}