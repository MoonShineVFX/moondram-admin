import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import moment from 'moment';

import Buttons from '../Buttons';
import { RangePickers } from '../DatePickers';
import { GlobalContext } from '../../context/global.state';
import Service from '../../utils/util.service';

//
const SearchFormLayout = styled.form(({ theme }) => ({
    '*': {
        fontSize: '15px',
    },
    '> *': {
        verticalAlign: 'middle',
    },
    '.ant-picker, .select': {
        height: '34px',
        borderRadius: '2px',
        marginRight: '10px',
    },
    '.select': {
        border: `1px solid ${theme.palette.border}`,
        padding: '4px 8px',
    },
    '.btn-admin': {
        marginRight: '10px',
    },
}));

//
const SearchForm = () => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit } = useForm();

    // State
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // RangePicker change
    const handleChange = (value, dateString) => {

        const [start, end] = dateString;
        setStartTime(start);
        setEndTime(end);

    };

    // reset
    const targetReset = () => {

        globalDispatch({ type: 'file_category', payload: 'all' });
        globalDispatch({ type: 'file_search', payload: [] });
        setStartTime('');
        setEndTime('');

    };

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            begin: moment(startTime).unix(),
            end: moment(endTime).unix(),
        };

        Service.fileList(reqData)
            .then(({ list }) => {

                // 強制顯示全部
                globalDispatch({ type: 'file_category', payload: 'all' });
                globalDispatch({ type: 'file_search', payload: list });

            });

    };

    return (

        <SearchFormLayout onSubmit={handleSubmit(handleReqData)}>
            <span>搜尋: </span>

            <RangePickers
                value={[startTime ? moment(startTime) : '', endTime ? moment(endTime) : '']}
                showTime={{ format: 'HH:mm' }}
                onChange={handleChange}
            />

            <Buttons
                text="查詢"
                htmlType="submit"
            />

            <Buttons
                text="清除"
                type="default"
                onClick={targetReset}
            />
        </SearchFormLayout>

    );

};

export default SearchForm;
