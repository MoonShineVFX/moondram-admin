// Global
const globalReducer = (state, { type, payload }) => {

    switch (type) {
        // 使用者資料
        case 'user_info':
            return {
                ...state,
                userInfo: payload,
            };

        // 檔案列表
        case 'file_list':
            return {
                ...state,
                files: payload,
            };

        case 'file_category':
            return {
                ...state,
                currCate: payload,
            };

        case 'file_search':
            return {
                ...state,
                searchResData: payload,
            };

        case 'file_delete':
            return {
                ...state,
                files: state.files.filter((obj) => !payload.some((key) => obj.id === key)),
            };

        // 後台帳號
        case 'account_list':
            return {
                ...state,
                accounts: payload,
            };

        case 'account_create':
            return {
                ...state,
                accounts: [{ ...payload }, ...state.accounts],
            };

        case 'account_delete':
            return {
                ...state,
                accounts: state.accounts.filter(({ uid }) => uid !== payload),
            };

        default:
            return { ...state };
    }

};

// Lightbox
const lightboxReducer = (state, { type, currEvent }) => {

    switch (type) {
        case 'SHOW':
            return { visible: true, currEvent };

        case 'HIDE':
            return { visible: false, currEvent: '' };

        default:
            return { ...state, currEvent };
    }

};

export { globalReducer, lightboxReducer };
