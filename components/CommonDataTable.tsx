'use client';

import Paper from '@mui/material/Paper';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid';

// ======================================================
// TYPES
// ======================================================

interface CommonDataTableProps {
  rows: GridRowsProp;
  columns: GridColDef[];

  loading?: boolean;

  checkboxSelection?: boolean;

  pageSize?: number;

  pageSizeOptions?: number[];

  height?: number | string;

  showToolbar?: boolean;
}

// ======================================================
// COMPONENT
// ======================================================

export default function CommonDataTable({
  rows,
  columns,

  loading = false,

  checkboxSelection = false,

  pageSize = 10,

  pageSizeOptions = [5, 10, 25, 50],

  height = 600,

  showToolbar = true,
}: CommonDataTableProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        height,
        width: '100%',

        borderRadius: 4,

        overflow: 'hidden',

        border: '1px solid #e5e7eb',

        backgroundColor: '#fff',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        pageSizeOptions={pageSizeOptions}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize,
            },
          },
        }}
        slots={
          showToolbar
            ? {
                toolbar: GridToolbar,
              }
            : undefined
        }
        sx={{
          border: 0,

          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f8fafc',

            borderBottom: '1px solid #e5e7eb',

            fontSize: '13px',

            fontWeight: 600,

            color: '#111827',
          },

          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f1f5f9',

            fontSize: '13px',

            color: '#374151',
          },

          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f8fafc',
          },

          '& .MuiCheckbox-root': {
            color: '#6366f1',
          },

          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #e5e7eb',
          },

          '& .MuiTablePagination-root': {
            fontSize: '13px',
          },

          '& .MuiDataGrid-toolbarContainer': {
            padding: '12px',

            borderBottom: '1px solid #e5e7eb',

            backgroundColor: '#fff',
          },
        }}
      />
    </Paper>
  );
}
