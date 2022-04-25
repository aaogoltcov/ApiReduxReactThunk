import Form from "./Form";
import List from "./List";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import getTransactions from "../services/getTransactions";
import {formSlice} from "../features/form";
import {listSlice} from "../features/list";

export default function Container() {
    const dispatch = useDispatch();
    const formIsUpdated = useSelector((state) => state.form.isUpdated);
    const isError = useSelector((state) => state.list.isError);

    useEffect(() => {
        dispatch(listSlice.actions.isLoading(true));
        dispatch(formSlice.actions.isReadonly(true));
        getTransactions()
            .then(response => {
                if (response.status) {
                    dispatch(listSlice.actions.list(response.response));
                    dispatch(listSlice.actions.isLoading(false));
                    dispatch(listSlice.actions.isError(false));
                    dispatch(formSlice.actions.isReadonly(false));
                } else {
                    dispatch(listSlice.actions.isError(true));
                    getTransactions();
                }
            })
    }, [isError, dispatch, formIsUpdated])

    return (
        <div className="card-group gap-4 m-4 flex-column w-50">
            <Form />
            <List />
        </div>
    )
}