import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';

import ContentHeader from '../containers/ContentHeader';
import Buttons from '../components/Buttons';

import utilConst from '../utils/util.const';
import Service from '../utils/util.service';

const { errorMesg } = utilConst;

//
const MainLayout = styled.main({
    maxWidth: '400px',
    backgroundColor: '#FFF',
    borderRadius: '4px',
    margin: '120px auto 60px',
    padding: '60px 40px 80px',
    'h1': {
        textAlign: 'center',
        marginBottom: '10px',
    },
    '.sub-title': {
        fontWeight: 'normal',
        color: 'gray',
        textAlign: 'center',
        marginBottom: '40px',
    },
});

//
const FormLayout = styled.form({
    '.btn-admin': {
        width: '100%',
        marginTop: '10px',
        padding: '6px 24px',
    },
});

//
const FormRow = styled.label(({ theme }) => ({
    display: 'block',
    marginBottom: '20px',
    '.title': {
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
        fontSize: '15px',
        color: 'red',
        marginTop: '2px',
        marginBottom: '0',
    },
}));

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
const Login = () => {

    // State
    const [loading, setLoading] = useState(false);

    //
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // 送資料
    const handleReqData = (reqData) => {

        setLoading(true);
        let auth = btoa(`${reqData.email}:${reqData.password}`);

        Service.login({ headers: { Authorization: `Basic ${auth}`} })
            .then(() => {

                alert('登入成功，你將被導回首頁!');
                window.location = '/';

            })
            .finally(() => setLoading(false));

    };

    return (

        <MainLayout>
            <ContentHeader title="登入" />
            <h4 className="sub-title">夢境現實後台</h4>
            <FormLayout onSubmit={handleSubmit(handleReqData)}>
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

                <Buttons
                    {...loading && { loading }}
                    text="送出"
                    htmlType="submit"
                />
            </FormLayout>
        </MainLayout>

    );

};

export default Login;
