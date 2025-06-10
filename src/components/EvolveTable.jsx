import * as React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

export default function EvolveTable({ columns, rows, getRowKey, renderActions, emptyMessage = 'No data available', loading = false }) {
  const antdColumns = columns.map(col => ({
    ...col,
    dataIndex: col.id,
    title: col.label,
    align: col.align || 'center',
    render: col.render,
  }));
  if (renderActions) {
    antdColumns.push({
      title: 'Action',
      key: 'action',
      align: 'center',
      render: renderActions,
    });
  }
  return (
    <Table
      columns={antdColumns}
      dataSource={rows}
      rowKey={getRowKey}
      loading={loading}
      pagination={false}
      locale={{ emptyText: emptyMessage }}
      bordered
      size="small"
    />
  );
}

EvolveTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  getRowKey: PropTypes.func.isRequired,
  renderActions: PropTypes.func,
  emptyMessage: PropTypes.string,
  loading: PropTypes.bool,
};
