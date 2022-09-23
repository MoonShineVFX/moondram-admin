// Global
const globalReducer = (state, { type, payload }) => {

    switch (type) {
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
