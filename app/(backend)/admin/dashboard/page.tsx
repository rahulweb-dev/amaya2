'use client';

import { useEffect, useState, useCallback } from 'react';

import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

import {
  Calendar,
  Clock3,
  Mail,
  Phone,
  Search,
  LayoutGrid,
  Table2,
  Download,
  X,
  User,
  Globe,
  MessageSquare,
  CheckCircle2,
  Hash,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { GridColDef } from '@mui/x-data-grid';

import CommonDataTable from '@/components/CommonDataTable';

// ─────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────

const LEAD_TYPES = [
  'all',
  'visit',
  'brochure',
  'callback',
  'contact',
  'enquiry',
  'floorplan',
];

const TYPE_META: Record<
  string,
  {
    color: string;
    dot: string;
    label: string;
  }
> = {
  visit: {
    color: 'bg-sky-500/10 text-sky-300 border-sky-500/20',

    dot: 'bg-sky-400',

    label: 'Visit',
  },

  brochure: {
    color: 'bg-violet-500/10 text-violet-300 border-violet-500/20',

    dot: 'bg-violet-400',

    label: 'Brochure',
  },

  callback: {
    color: 'bg-amber-500/10 text-amber-300 border-amber-500/20',

    dot: 'bg-amber-400',

    label: 'Callback',
  },

  contact: {
    color: 'bg-teal-500/10 text-teal-300 border-teal-500/20',

    dot: 'bg-teal-400',

    label: 'Contact',
  },

  enquiry: {
    color: 'bg-rose-500/10 text-rose-300 border-rose-500/20',

    dot: 'bg-rose-400',

    label: 'Enquiry',
  },

  floorplan: {
    color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',

    dot: 'bg-emerald-400',

    label: 'Floor Plan',
  },
};

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────

interface Lead {
  _id: string;

  leadType?: string;

  name?: string;

  phone?: string;

  email?: string;

  message?: string;

  sourcePage?: string;

  preferredDate?: string;

  preferredTime?: string;

  context?: string;

  consent?: boolean;

  createdAt: string;
}

interface Pagination {
  page: number;

  pages: number;

  total: number;

  limit: number;
}

// ─────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────

function safeStr(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

function shortId(id?: string) {
  return (id ?? '').slice(-8).toUpperCase();
}

function formatDate(iso?: string) {
  if (!iso) return '—';

  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(iso?: string) {
  if (!iso) return '—';

  return new Date(iso).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ─────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────

function Badge({ type }: { type?: string }) {
  const meta = TYPE_META[type ?? ''] ?? {
    color: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20',

    dot: 'bg-zinc-400',

    label: type || 'Unknown',
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5

        px-2.5
        py-1

        rounded-full

        text-[11px]
        font-medium

        border

        ${meta.color}
      `}
    >
      <span
        className={`
          w-1.5 h-1.5
          rounded-full

          ${meta.dot}
        `}
      />

      {meta.label}
    </span>
  );
}

function Avatar({ name }: { name?: string }) {
  const safe = safeStr(name).trim() || '?';

  const initials = safe
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className='
        w-9 h-9

        rounded-xl

        bg-gradient-to-br
        from-zinc-700
        to-zinc-800

        border border-white/10

        flex items-center
        justify-center

        text-xs
        font-semibold
        text-white
      '
    >
      {initials}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();

  const [leads, setLeads] = useState<Lead[]>([]);

  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [filter, setFilter] = useState('all');

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<Lead | null>(null);

  const [search, setSearch] = useState('');

  const [view, setView] = useState<'table' | 'cards'>('table');
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  // ───────────────────────────────────────────────────────
  // FETCH LEADS
  // ───────────────────────────────────────────────────────

  const fetchLeads = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(page),
      });

      if (filter !== 'all') {
        params.set('leadType', filter);
      }

      const res = await fetch(`/api/lead?${params}`);

      if (res.status === 401) {
        router.push('/admin/login');

        return;
      }

      const data = await res.json();

      setLeads(Array.isArray(data.leads) ? data.leads : []);

      setPagination(data.pagination ?? null);
    } catch (err) {
      console.error(err);

      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [filter, page, router]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // ───────────────────────────────────────────────────────
  // FILTERED LEADS
  // ───────────────────────────────────────────────────────

  const filteredLeads = leads.filter((lead) => {
    if (!search) return true;

    const q = search.toLowerCase();

    return (
      safeStr(lead.name).toLowerCase().includes(q) ||
      safeStr(lead.phone).includes(q) ||
      safeStr(lead.email).toLowerCase().includes(q)
    );
  });

  // ───────────────────────────────────────────────────────
  // TABLE COLUMNS
  // ───────────────────────────────────────────────────────

  const columns: GridColDef[] = [
    {
      field: 'id',

      headerName: 'ID',

      width: 120,
    },

    {
      field: 'name',

      headerName: 'Name',

      flex: 1,

      renderCell: (params) => (
        <div className='flex items-center gap-3 h-full'>
          <Avatar name={params.row.name} />

          <span className='font-medium'>{params.row.name}</span>
        </div>
      ),
    },

    {
      field: 'phone',

      headerName: 'Phone',

      flex: 1,
    },

    {
      field: 'email',

      headerName: 'Email',

      flex: 1.2,
    },

    {
      field: 'leadType',

      headerName: 'Lead Type',

      flex: 1,

      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Badge type={params.row.leadType} />
        </div>
      ),
    },

    {
      field: 'sourcePage',

      headerName: 'Source',

      flex: 1,
    },

    {
      field: 'createdAt',

      headerName: 'Created At',

      flex: 1,

      valueFormatter: (value) => (value ? formatDate(value) : '-'),
    },
  ];

  // ───────────────────────────────────────────────────────
  // TABLE ROWS
  // ───────────────────────────────────────────────────────

  const tableRows = filteredLeads.map((lead, index) => ({
    id:  index + 1,

    serialNumber: index + 1,

    name: lead.name || '-',

    phone: lead.phone || '-',

    email: lead.email || '-',

    leadType: lead.leadType || '-',

    sourcePage: lead.sourcePage || '-',

    preferredDate: lead.preferredDate || '-',

    preferredTime: lead.preferredTime || '-',

    message: lead.message || '-',

    createdAt: lead.createdAt,
  }));

  // ───────────────────────────────────────────────────────
  // EXPORT CSV
  // ───────────────────────────────────────────────────────

  function exportExcel() {
    // ======================================================
    // SELECTED ROWS
    // ======================================================

    const selectedData =
      selectedRows.length > 0
        ? tableRows.filter((row) => selectedRows.includes(row.id))
        : tableRows;

    // ======================================================
    // FORMAT DATA
    // ======================================================

    const excelData = selectedData.map((row) => ({
      ID: row.id,

      Name: row.name,

      Phone: row.phone,

      Email: row.email,

      LeadType: row.leadType,

      Source: row.sourcePage,

      PreferredDate: row.preferredDate,

      PreferredTime: row.preferredTime,

      Message: row.message,

      CreatedAt: formatDate(row.createdAt),
    }));

    // ======================================================
    // SHEET
    // ======================================================

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet['!cols'] = [
      { wch: 8 },

      { wch: 24 },

      { wch: 18 },

      { wch: 30 },

      { wch: 16 },

      { wch: 20 },

      { wch: 18 },

      { wch: 18 },

      { wch: 40 },

      { wch: 18 },
    ];

    // ======================================================
    // WORKBOOK
    // ======================================================

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

    // ======================================================
    // EXPORT
    // ======================================================

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',

      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

 
  }

  return (
    <div className='min-h-screen bg-white text-black'>
      {/* HEADER */}

      <header
        className='
          sticky top-0 z-40

          border-b border-zinc-200

          bg-white/90
          backdrop-blur-xl
        '
      >
        <div
          className='
            px-6 py-4

            flex items-center
            justify-between
          '
        >
          {/* LEFT */}

          <div>
            <h1
              className='
                text-xl
                font-semibold
              '
            >
              Amaya 
            </h1>

            <p
              className='
                text-sm
                text-zinc-500
                mt-1
              '
            >
              Lead Management
            </p>
          </div>

          {/* RIGHT */}

          <div className='flex items-center gap-3'>
            {/* SEARCH */}

            <div className='relative'>
              <Search
                size={16}
                className='
                  absolute
                  left-3 top-1/2
                  -translate-y-1/2

                  text-zinc-400
                '
              />

              <input
                type='text'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='
                  w-[260px]

                  border border-zinc-200

                  rounded-xl

                  pl-10
                  pr-4
                  py-3

                  text-sm

                  outline-none

                  focus:border-blue-500
                '
              />
            </div>

            {/* VIEW */}

            <div
              className='
                flex items-center

                bg-zinc-100

                rounded-xl

                p-1
              '
            >
              <button
                onClick={() => setView('table')}
                className={`
                  p-2 rounded-lg

                  ${view === 'table' ? 'bg-white shadow-sm' : ''}
                `}
              >
                <Table2 size={16} />
              </button>

              <button
                onClick={() => setView('cards')}
                className={`
                  p-2 rounded-lg

                  ${view === 'cards' ? 'bg-white shadow-sm' : ''}
                `}
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            {/* EXPORT */}

            <button
              onClick={exportExcel}
              className='
                flex items-center
                gap-2

                px-4 py-3

                rounded-xl

                bg-black
                text-white

                text-sm
              '
            >
              <Download size={15} />
              Export
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}

      <div className='p-6 space-y-6'>
        {/* FILTERS */}

        <div className='flex flex-wrap gap-2'>
          {LEAD_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`
                  px-4 py-2

                  rounded-xl

                  text-sm
                  capitalize

                  transition-all

                  ${
                    filter === type
                      ? 'bg-black text-white'
                      : 'bg-zinc-100 text-zinc-600'
                  }
                `}
            >
              {type}
            </button>
          ))}
        </div>

        {/* TABLE */}

        {view === 'table' && (
          <CommonDataTable
            rows={tableRows}
            columns={columns}
            loading={loading}
            checkboxSelection
            pageSize={10}
            height={650}
          />
        )}

        {/* CARD VIEW */}

        {view === 'cards' && (
          <div
            className='
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-5
            '
          >
            {filteredLeads.map((lead) => (
              <div
                key={lead._id}
                onClick={() => setSelected(lead)}
                className='
                    rounded-2xl

                    border border-zinc-200

                    bg-white

                    p-5

                    hover:shadow-lg

                    transition-all

                    cursor-pointer
                  '
              >
                <div
                  className='
                      flex items-start
                      justify-between
                    '
                >
                  <div
                    className='
                        flex items-center
                        gap-3
                      '
                  >
                    <Avatar name={lead.name} />

                    <div>
                      <p className='font-semibold'>{lead.name}</p>

                      <p
                        className='
                            text-xs
                            text-zinc-500
                          '
                      >
                        {lead.phone}
                      </p>
                    </div>
                  </div>

                  <Badge type={lead.leadType} />
                </div>

                <div className='mt-5 space-y-2'>
                  {lead.email && (
                    <div className='flex items-center gap-2 text-sm text-zinc-600'>
                      <Mail size={14} />
                      {lead.email}
                    </div>
                  )}

                  <div className='flex items-center gap-2 text-sm text-zinc-600'>
                    <Calendar size={14} />

                    {formatDate(lead.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
