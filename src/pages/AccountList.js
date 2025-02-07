import { Fragment, useContext, useEffect, useState } from 'react';
import { Switch, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styled, { createGlobalStyle } from 'styled-components';

import ContentHeader from '../containers/ContentHeader';
import Tables from '../components/Tables';
import Buttons from '../components/Buttons';
import Loading from '../components/Loading';

import { GlobalContext } from '../context/global.state';
import util from '../utils/util';
import utilConst from '../utils/util.const';
import Service from '../utils/util.service';

const { renderWithoutValue } = util;
const { errorMesg, regex } = utilConst;

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
    '.btn-admin.third': {
        fontSize: '14px',
        marginLeft: '4px',
        marginRight: '0',
        padding: '2px 8px',
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
                                    value: `/${regex}/g`,
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
        userInfo: { customClaims: { role } },
        visible,
        accounts,
        globalDispatch,
        lightboxDispatch,
    } = useContext(GlobalContext);

    // State
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        Service.accountList()
            .then(({ list }) => {

                setLoading(false);
                globalDispatch({
                    type: 'account_list',
                    payload: list,
                });

            });

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
            render: (email, { uid }) => (

                <Fragment>
                    {email}

                    {
                        (role === 'superuser') &&
                            <Buttons
                                className="third"
                                text="更新密碼"
                                onClick={() => btnChangePassword(uid)}
                            />
                    }
                </Fragment>

            ),
        },
        {
            title: '是否啟用',
            dataIndex: 'disabled',
            render: (disabled, { uid }) => (

                <Switch
                    checkedChildren="啟用"
                    unCheckedChildren="禁用"
                    defaultChecked={!disabled}
                    onChange={(checked, event) => handleSwitch(checked, event, uid)}
                    disabled={!(role === 'superuser')}
                />

            ),
        },
        {
            title: '操作',
            dataIndex: '',
            className: 'col-actions',
            render: ({ uid, email }) => (

                (role === 'superuser') ? (

                    <Buttons
                        text="刪除"
                        type="danger"
                        onClick={() => btnDelete({ uid, email })}
                    />

                ) : '--'

            ),
        },
    ];

    // 新增帳號
    const btnCreateAccount = () => lightboxDispatch({ type: 'SHOW', currEvent: 'createAccount' });

    // 啟/禁用
    const handleSwitch = (checked, event, uid) => {

        Service.accountUpdate({
            uid,
            disabled: checked,
        })
        .finally(() => alert('更新成功!'));

    };

    // 更新密碼
    const btnChangePassword = (uid) => {

        const yes = window.confirm('確定要為此帳號更新密碼?');

        if (!yes) return;

        const value = prompt('請輸入新密碼:');

        if (!value) return;
        Service.accountUpdate({ uid, password: value })
            .then(alert('更新成功!'));

    };

    // 刪除
    const btnDelete = ({ uid, email }) => {

        const yes = window.confirm(`確定要刪除 ${email} 這個帳號?`);

        if (!yes) return;
        Service.accountDelete({ uid })
            .then(() => {

                alert('刪除成功!');
                globalDispatch({ type: 'account_delete', payload: uid });

            });

    };

    return (

        <Fragment>
            <FormStyle />
            <ContentHeader title="後台帳號" />

            <Buttons
                text="新增"
                onClick={btnCreateAccount}
            />

            {
                loading ? <Loading spin={loading} /> : (

                    <TablesLayout
                        rowKey="uid"
                        columns={columns}
                        data={accounts}
                    />

                )
            }

            {
                visible && <FormModal />
            }
        </Fragment>

    );

};

export default Account;
