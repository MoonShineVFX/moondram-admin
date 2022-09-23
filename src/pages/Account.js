import { Fragment, useContext, useEffect } from 'react';
import { Switch, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styled, { createGlobalStyle } from 'styled-components';

import ContentHeader from '../containers/ContentHeader';
import Tables from '../components/Tables';
import Buttons from '../components/Buttons';

import { GlobalContext } from '../context/global.state';
import util from '../utils/util';
import utilConst from '../utils/util.const';
import Service from '../utils/util.service';

// fake
import fakeData from './fakeData';

const { renderWithoutValue } = util;
const { errorMesg } = utilConst;

//
const FormStyle = createGlobalStyle`
    .ant-modal-footer {
        display: none;
    }
    .ant-modal-body {
        padding: 30px 60px;
    }
    .ant-modal-header {
        padding: 20px;
    }
    .ant-modal-title {
        font-size: 20px;
        font-weight: bold;
    }
    .actions {
        text-align: center;
        margin-top: 30px;
    }
    .actions .btn-admin {
        margin: 0px 10px;
    }
`;

// Tables
const TablesLayout = styled(Tables)({
    marginTop: '20px',
    '.col-actions': {
        '> *': {
            marginRight: '8px',
            padding: '4px 6px',
            cursor: 'pointer',
        },
        '.btn-admin': {
            maxWidth: '100px',
        },
    },
});

//
const FormRow = styled.label(({ theme }) => ({
    display: 'block',
    marginBottom: '20px',
    '.title': {
        fontSize: '15px',
        marginBottom: '4px',
    },
    '.field': {
        border: `1px solid ${theme.palette.border}`,
        borderRadius: '2px',
        padding: '4px 8px',
    },
    'input': {
        width: '100%',
        height: '100%',
        border: '0',
    },
    '&.hasError': {
        '.field': {
            borderColor: 'red',
            '&:hover': {
                borderColor: 'red',
            },
        },
        '.error': {
            fontSize: '15px',
            color: 'red',
            margin: '2px 0',
        },
    },
    '.error-mesg': {
        fontSize: '14px',
        color: 'red',
        marginTop: '2px',
        marginBottom: '0',
    },
}));

//
const FormModal = () => {

    // Context
    const {
        visible,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    //
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // 隱藏 Modal
    const hideModal = () => lightboxDispatch({ type: 'HIDE' });

    // 送資料
    const handleReqData = (reqData) => {

        Service.accountCreate(reqData)
            .then((resData) => {

                hideModal();
                alert('更新成功!');
                globalDispatch({ type: 'account_create', payload: resData });

            });

    };

    return (

        <Modal
            title="新增後台帳號"
            open={visible}
            onCancel={hideModal}
        >
            <form onSubmit={handleSubmit(handleReqData)}>
                <FormRow className={errors?.email?.type ? 'hasError' : ''}>
                    <div className="title">帳號 (必填)</div>
                    <div className="field">
                        <input
                            type="text"
                            name="email"
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
                                    message: errorMesg.error_pattern,
                                },
                            })}
                        />
                    </div>
                    <FormErrorMesg
                        name="email"
                        errors={errors}
                    />
                </FormRow>

                <FormRow className={errors?.password?.type ? 'hasError' : ''}>
                    <div className="title">密碼 (必填)</div>
                    <div className="field">
                        <input
                            type="password"
                            name="password"
                            {...register('password', { required: true })}
                        />
                    </div>
                    <FormErrorMesg
                        name="password"
                        errors={errors}
                    />
                </FormRow>

                <div className="actions">
                    <Buttons
                        text="送出"
                        htmlType="submit"
                    />
                    <Buttons
                        text="取消"
                        type="default"
                        onClick={hideModal}
                    />
                </div>
            </form>
        </Modal>

    );

};

// 錯誤訊息
const FormErrorMesg = ({ name, errors }) => (

    <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => <p className="error-mesg">{message}</p>}
        {
            ...(errors?.[name]?.message === '') && {
                message: errorMesg[`error_${errors[name]?.type}`],
            }
        }
    />

);

//
const Account = () => {

    // Context
    const {
        visible,
        accounts,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    useEffect(() => {

        // fake
        globalDispatch({
            type: 'account_list',
            payload: fakeData.accounts,
        });

        // Service.accountList()
        //     .then(({ list }) => {

        //         globalDispatch({
        //             type: 'account_list',
        //             payload: list,
        //         });

        //     });

    }, [globalDispatch]);

    // 表格欄位
    const columns = [
        {
            title: 'uid',
            dataIndex: 'uid',
            render: (uid) => renderWithoutValue(uid),
        },
        {
            title: '信箱',
            dataIndex: 'email',
            render: (email) => renderWithoutValue(email),
        },
        {
            title: '是否啟用',
            dataIndex: 'disabled',
            render: (disabled, { uid }) => (

                <Switch
                    checkedChildren="啟用"
                    unCheckedChildren="禁用"
                    defaultChecked={disabled}
                    onChange={(checked, event) => handleSwitch(checked, event, uid)}
                />

            ),
        },
        {
            title: '操作',
            dataIndex: '',
            className: 'col-actions',
            render: ({ email }) => (

                <Buttons
                    className="third"
                    text="更新密碼"
                    onClick={() => btnRestPassword(email)}
                />

            ),
        },
    ];

    // 啟/禁用
    const handleSwitch = (checked, event, uid) => {

        Service.accountUpdate({
            uid,
            disabled: checked,
        })
        .finally(() => alert('更新成功!'));

    };

    // 更新密碼
    const btnRestPassword = (email) => {

        Service.resetPassword({ email });

    };

    // 新增帳號
    const btnCreateAccount = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createAccount' });

    return (

        <Fragment>
            <FormStyle />
            <ContentHeader title="後台帳號" />

            <Buttons
                text="新增帳號"
                onClick={btnCreateAccount}
            />

            <TablesLayout
                rowKey="uid"
                columns={columns}
                data={accounts}
            />

            {
                visible && <FormModal />
            }
        </Fragment>

    );

};

export default Account;
