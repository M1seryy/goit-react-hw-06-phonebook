import React from 'react';
import { contactsSelector } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterReducer } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const cont = useSelector(contactsSelector);

  const onFilterHandler = e => {
    const newArr = cont.filter(item => {
      if (e.target.value === '') {
        dispatch(setFilterReducer(cont));
        return e.target.value;
      } else {
        return item.name.toLowerCase().includes(e.target.value);
      }
    });
    dispatch(setFilterReducer(newArr));
  };
  return (
    <>
      <input onChange={onFilterHandler} type="text" />
    </>
  );
};

export default Filter;
