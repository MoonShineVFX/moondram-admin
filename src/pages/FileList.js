import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Image } from 'antd';
import styled from 'styled-components';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

import ContentHeader from '../containers/ContentHeader';
import FontIcon from '../components/FontIcon';
import Buttons from '../components/Buttons';
import Tables from '../components/Tables';
import SearchForm from '../components/home/SearchForm';

import { GlobalContext } from '../context/global.state';
import util from '../utils/util';
import utilConst from '../utils/util.const';
import Service from '../utils/util.service';

const {
    renderDateTime,
    renderBytesConvert,
    renderWithoutValue,
} = util;

const { toggleConfig } = utilConst;

//
const ContentTopLayout = styled.div({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    '.toggle': {
        textAlign: 'right',
        flex: '1',
        'span': {
            fontSize: '17px',
            fontWeight: 'bold',
            color: '#333',
            margin: '0 8px',
            padding: '8px',
            cursor: 'pointer',
            opacity: '0.3',
            transition: 'all 0.2s linear',
            '&:hover': {
                opacity: '0.6',
            },
            '&.active': {
                borderBottom: '3px solid #333',
                opacity: '1',
            },
        },
    },
});

//
const ControlActions = styled.p({
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    '> *': {
        flex: '1',
    },
    'span + span': {
        textAlign: 'right',
    },
    '.main-actions': {
        '.btn-admin': {
            height: 'auto',
            lineHeight: 'initial',
            marginRight: '8px',
            padding: '4px 8px',
            '*': {
                fontSize: '14px',
                letterSpacing: '1px',
            },
        },
    },
});

// Tables
const TablesLayout = styled(Tables)({
    '.col-actions > *': {
        fontSize: '17px',
        marginRight: '8px',
        padding: '4px 6px',
        cursor: 'pointer',
    },
    '.imgWrap': {
        maxWidth: '160px',
    },
});

//
const FileList = () => {

    // Context
    const {
        currCate,
        files,
        searchResData,
        globalDispatch,
    } = useContext(GlobalContext);

    // State
    const [selectedRowData, setSelectedRowData] = useState([]);

    useEffect(() => {

        Service.fileList({ begin: 1662017107 })
            .then(({ list }) => {

                globalDispatch({
                    type: 'file_list',
                    payload: list,
                });

            });

    }, [globalDispatch]);

    // 表格欄位
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '縮圖',
            dataIndex: 'thumb',
            render: (thumb, { name, fileURL }) => thumb ? (

                <div className="imgWrap">
                    <Image
                        src={thumb}
                        alt={name}
                        preview={{ src: fileURL }}
                    />
                </div>

            ) : '--',
        },
        {
            title: '檔名',
            dataIndex: 'name',
            render: (name) => renderWithoutValue(name),
        },
        {
            title: '檔案大小',
            dataIndex: 'size',
            render: (size) => renderBytesConvert(size),
        },
        {
            title: '建立時間',
            dataIndex: 'createTime',
            render: (createTime) => renderWithoutValue(renderDateTime(createTime)),
        },
        {
            title: '建立者',
            dataIndex: 'creator',
        },
        {
            title: '操作',
            dataIndex: '',
            className: 'col-actions',
            width: 120,
            render: (data) => (

                <Fragment>
                    <span onClick={() => btnDownload('single', data)}>
                        <FontIcon icon={faDownload} />
                    </span>

                    <span onClick={() => btnDelete('single', data)}>
                        <FontIcon icon={faTrash} />
                    </span>
                </Fragment>

            ),
        },
    ];

    // 切換
    const handleClickToggle = (key) => {

        globalDispatch({ type: 'file_category', payload: key });

    };

    // 選取事件
    const handleChangeSelected = (selectedRowKeys, selectedRows) => {

        setSelectedRowData(selectedRows);

    };

    // 下載
    const btnDownload = (type, params) => {

        let paths = (type === 'multiple') ? selectedRowData.flatMap(({ path }) => path) : [params.path];
        Service.fileDownload({ paths })
            .then((resData) => {

                const blobUrl = window.URL.createObjectURL(resData);
                window.location = blobUrl;
                window.URL.revokeObjectURL(blobUrl);
                setSelectedRowData([]);

            });

    };

    // 刪除
    const btnDelete = (type, params) => {

        let obj = {};
        obj = {
            id: (type === 'multiple') ? selectedRowData.flatMap(({ id }) => id) : [params.id],
            path: (type === 'multiple') ? selectedRowData.flatMap(({ path }) => path) : [params.path],
            name: (type === 'multiple') ? selectedRowData.flatMap(({ name }) => name) : [params.name],
        };

        const yes = window.confirm(`確定要刪除 ${obj.name.join('、')} ?`);

        if (!yes) return;
        Service.fileDelete({ paths: obj.path })
            .then(() => {

                alert('刪除成功!');
                globalDispatch({ type: 'file_delete', payload: obj.id });
                setSelectedRowData([]);

            });

    };

    return (

        <Fragment>
            <ContentHeader title="檔案列表" />

            <ContentTopLayout>
                <SearchForm />

                <div className="toggle">
                    {
                        Object.keys(toggleConfig).map((key) => (

                            <span
                                key={key}
                                title={toggleConfig[key].label}
                                className={(key === currCate) ? 'active' : ''}
                                onClick={() => handleClickToggle(key)}
                            >
                                <FontIcon icon={toggleConfig[key].icon} />
                            </span>

                        ))
                    }
                </div>
            </ContentTopLayout>

            <ControlActions>
                <span className="main-actions">
                    <Buttons
                        text="全部下載"
                        onClick={() => btnDownload('multiple')}
                        disabled={!selectedRowData.length}
                    />
                    <Buttons
                        text="全部刪除"
                        type="danger"
                        onClick={() => btnDelete('multiple')}
                        disabled={!selectedRowData.length}
                    />
                </span>

                <span>已選取 {selectedRowData.length} 個項目</span>
            </ControlActions>

            <TablesLayout
                rowKey="id"
                columns={columns}
                data={searchResData.length ? searchResData.filter((obj) => (obj.type === currCate) || (currCate === 'all')) : files.filter((obj) => (obj.type === currCate) || (currCate === 'all'))}
                rowSelection={{
                    selectedRowKeys: selectedRowData.flatMap(({ id }) => id),
                    onChange: handleChangeSelected,
                }}
            />
        </Fragment>

    );

};

export default FileList;
