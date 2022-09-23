import util from './util';

const Service = {
    // 登入
    login: ({ reqData, headers }) => util.serviceProxy('/user/login', reqData, {
        headers: { ...headers },
    }),
    logout: (reqData) => util.serviceProxy('/???', reqData),

    // 檔案
    fileList: (reqData) => util.serviceProxy('/file/list_files', reqData),
    fileDelete: (reqData) => util.serviceProxy('/file/delete_files', reqData),
    fileDownload: (reqData) => util.serviceProxy('/file/download_zip', reqData, {
        responseType: 'blob',
    }),

    // 後台帳號
    accountList: (reqData) => util.serviceProxy('/user/list_users', reqData),
    accountCreate: (reqData) => util.serviceProxy('/user/create_admin', reqData),
    accountUpdate: (reqData) => util.serviceProxy('/user/update_user', reqData),

    // 重設密碼
    resetPassword: (reqData) => util.serviceProxy('/user/reset_current_user_password', reqData),
};

export default Service;
