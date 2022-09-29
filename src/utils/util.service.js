import util from './util';

const Service = {
    // 登入
    login: ({ reqData, headers }) => util.serviceProxy('/user/login', reqData, {
        headers: { ...headers },
    }),
    logout: (reqData) => util.serviceProxy('/user/logout', reqData),

    // 取 user 資訊
    userInfo: (reqData) => util.serviceProxy('/user/get_user', reqData),

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
    accountDelete: (reqData) => util.serviceProxy('/user/delete_user', reqData),
};

export default Service;
