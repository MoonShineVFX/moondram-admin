import PropTypes from 'prop-types';
import { Table } from 'antd';
import styled from 'styled-components';
import utilConst from '../utils/util.const';

const { emptyText } = utilConst;

// page
const showTotal = (total, range) => (`共 ${total} 筆資料，顯示第 ${range[0]}-${range[1]} 筆`);

//
const TablesLayout = styled(Table)({
    '.ant-table': {
        fontSize: '15px',
    },
    '.ant-table-thead .ant-table-cell': {
        fontWeight: 'bold',
    },
    '.ant-table-cell': {
        padding: '8px 12px',
        '.ant-btn': {
            fontSize: '15px',
            marginRight: '6px',
            padding: '2px 10px',
            ':not(:last-child)': {
                marginBottom: '6px',
            },
        },
    },
    '.pagination': {
        textAlign: 'right',
        marginTop: '30px',
    },
    '.ant-pagination-total-text': {
        fontSize: '16px',
        marginRight: '20px',
    },
    '.col-tags': {
        maxWidth: '200px',
    },
    '.ant-tag': {
        marginBottom: '6px',
    },
});

// 表格列表
const Tables = ({
    className,
    columns,
    data,
    rowKey,
    showTitle,
    showPage,
    pageSize,
    onRow,
    onExpand,
    showTableHeader,
    expandData,
    rowClassName,
    emptyText,
    handleChange,
    summary,
    ...rest
}) => {

    return (

        <TablesLayout
            className={`admin-tables ${className} ${showTitle ? '' : 'withoutTitle'} ${showTableHeader ? '' : 'withoutTableHeader' } ${data.length ? '' : 'no-data'}`}
            columns={columns}
            dataSource={data.length ? data : null}
            rowClassName={rowClassName ? rowClassName : ''}
            rowKey={rowKey} // 為了 unique key 而寫的欄位，由外層決定 key 是誰
            pagination={
                showPage ? {
                    pageSize,
                    className: `pagination`,
                    showTotal,
                    onChange: () => handleChange,
                } : showPage
            }
            {...showTitle && { title: () => `共 ${data.length} 筆`}}
            onRow={onRow}
            {...expandData ? { expandable: expandData } : {}}
            {...onExpand ? { onExpand } : {}}
            locale={{
                emptyText: '沒有資料...',
                filterReset: '清除',
                filterConfirm: '確認',
            }}
            showSorterTooltip={false}
            summary={summary}
            {...rest}
        />

    );

};

Tables.defaultProps = {
    rowClassName: '',
    className: '',
    data: [],
    columns: [],
    showTitle: false,
    showPage: true,
    pageSize: 50,
    showTableHeader: true,
    showDetail: false,
    expandData: {},
    emptyText: emptyText,
};

Tables.propTypes = {
    rowClassName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    className: PropTypes.string,
    emptyText: PropTypes.string,
    data: PropTypes.array.isRequired,
    columns: PropTypes.any.isRequired,
    rowKey: PropTypes.string.isRequired,
    showTitle: PropTypes.bool,
    showPage: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    pageSize: PropTypes.number,
    showTableHeader: PropTypes.bool,
    showDetail: PropTypes.bool,
    onRow: PropTypes.func,
    onChange: PropTypes.func,
    summary: PropTypes.func,
    // Sample
    // onRow={
    //     () => ({
    //         onClick: onRowClick, // click row
    //         onDoubleClick: event => {}, // double click row
    //         onContextMenu: event => {}, // right button click row
    //         onMouseEnter: event => {}, // mouse enter row
    //         onMouseLeave: event => {}, // mouse leave row
    //     })
    // }
    onExpand: PropTypes.func,
    expandData: PropTypes.object,
    // Sample
    // expandable: {
    //     expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
    //     rowExpandable: record => record.name !== 'Not Expandable',
    // }
};

export default Tables;
