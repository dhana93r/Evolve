import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PropTypes from 'prop-types';

export default function EvolveTable({ columns, rows, getRowKey, renderActions, enableStriped = true, enableHover = true, emptyMessage = 'No data available', loading = false }) {
  return (
    <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto', borderRadius: { xs: 2, sm: 3 }, boxShadow: 2 }}>
      <Table size="small" sx={{ minWidth: 350 }} stickyHeader>
        <TableHead>
          <TableRow sx={{ position: 'sticky', top: 0, zIndex: 2, bgcolor: 'primary.main' }}>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                align={col.align || 'center'}
                sx={{
                  ...col.sx,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: { xs: '1.05rem', sm: '1.1rem' },
                  borderBottom: '2px solid #1976d2',
                  bgcolor: 'primary.main',
                }}
              >
                {col.label}
              </TableCell>
            ))}
            {renderActions && (
              <TableCell
                align="center"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: { xs: '1.05rem', sm: '1.1rem' },
                  borderBottom: '2px solid #1976d2',
                  bgcolor: 'primary.main',
                }}
              >
                Action
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (renderActions ? 1 : 0)} align="center">
                Loading...
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (renderActions ? 1 : 0)} align="center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, idx) => (
              <TableRow
                key={getRowKey(row)}
                sx={{
                  ...(enableStriped && idx % 2 === 1 ? { backgroundColor: 'rgba(0,0,0,0.03)' } : {}),
                  ...(enableHover ? { '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' } } : {}),
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align || 'center'} sx={col.sx || {}}>
                    {col.render ? col.render(row) : row[col.id]}
                  </TableCell>
                ))}
                {renderActions && (
                  <TableCell align="center">{renderActions(row)}</TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

EvolveTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  getRowKey: PropTypes.func.isRequired,
  renderActions: PropTypes.func,
  enableStriped: PropTypes.bool,
  enableHover: PropTypes.bool,
  emptyMessage: PropTypes.string,
  loading: PropTypes.bool,
};
