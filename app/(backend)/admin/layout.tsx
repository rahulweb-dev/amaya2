'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  LayoutDashboard,
  Users,
  LogOut,
  ChevronRight,
  BellDot,
  Search,
  Settings,
} from 'lucide-react';
const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const router = useRouter();

  const isLoginPage = pathname === '/admin/login';

  async function logout() {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    router.push('/admin/login');
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div
      className='
        flex
       
        bg-[#050816]
        text-white
      '
    >
      <aside
        className='
          relative
          w-[280px]
          fixed
          shrink-0

          border-r border-white/10

          bg-gradient-to-b
          from-[#0A1022]
          to-[#050816]

          overflow-hidden
        '
      >
        <div
          className='
            absolute
            top-[-100px]
            right-[-100px]

            w-[240px]
            h-[240px]

            rounded-full

            bg-blue-500/10
            blur-3xl
          '
        />

        <div
          className='
            relative
            z-10

            px-7
            py-7

            border-b border-white/10
          '
        >
          <div
            className='
              flex items-center
              gap-4
            '
          >
            <div
              className='
                w-12 h-12

                rounded-2xl

                bg-gradient-to-br
                from-blue-500
                to-indigo-600

                flex items-center
                justify-center

                text-lg
                font-bold
              '
            >
              A
            </div>

            <div>
              <h1
                className='
                  text-xl
                  font-semibold
                  tracking-tight
                '
              >
                Amaya
              </h1>

              <p
                className='
                  text-sm text-neutral-400 mt-0.5
                '
              >
                Admin Dashboard
              </p>
            </div>
          </div>
        </div>
        <div className='px-5 pt-5'>
          <div
            className='
              relative
            '
          >
            <Search
              size={18}
              className='
                absolute
                left-4 top-1/2
                -translate-y-1/2

                text-neutral-500
              '
            />

            <input
              type='text'
              placeholder='Search...'
              className='
                w-full

                bg-white/[0.04]
                border border-white/10

                rounded-xl

                pl-11
                pr-4
                py-3

                text-sm
                text-white

                outline-none

                placeholder:text-neutral-500

                focus:border-blue-500/40
                focus:bg-white/[0.06]

                transition-all
              '
            />
          </div>
        </div>

        <nav
          className='
            relative z-10

            flex-1

            px-4
            py-6

            space-y-2
          '
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                    group

                    flex items-center
                    justify-between

                    rounded-2xl

                    px-4
                    py-3.5

                    transition-all
                    duration-300

                    ${
                      active
                        ? `
                          bg-gradient-to-r
                          from-blue-500/20
                          to-indigo-500/10

                          border border-blue-500/20

                          text-white

                          shadow-lg
                          shadow-blue-500/10
                        `
                        : `
                          text-neutral-400

                          hover:text-white
                          hover:bg-white/[0.04]
                        `
                    }
                  `}
              >
                <div
                  className='
                      flex items-center
                      gap-3
                    '
                >
                  <div
                    className={`
                        w-10 h-10

                        rounded-xl

                        flex items-center
                        justify-center

                        transition-all

                        ${
                          active
                            ? `
                              bg-blue-500/20
                              text-blue-300
                            `
                            : `
                              bg-white/[0.04]
                              text-neutral-500

                              group-hover:text-white
                            `
                        }
                      `}
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <p
                      className='
                          text-sm
                          font-medium
                        '
                    >
                      {item.label}
                    </p>

                    <p
                      className='
                          text-xs
                          text-neutral-500
                          mt-0.5
                        '
                    >
                      Manage {item.label.toLowerCase()}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  size={16}
                  className={`
                      transition-all

                      ${active ? 'text-blue-300' : 'text-neutral-600'}
                    `}
                />
              </Link>
            );
          })}
        </nav>

        <div
          className='
            relative z-10

            border-t border-white/10

            p-5
            space-y-3
          '
        >
          <button
            onClick={logout}
            className='
              w-full

              flex items-center
              gap-3

              rounded-2xl

              px-4
              py-3.5

              bg-red-500/10
              text-red-300

              hover:bg-red-500/20

              transition-all
            '
          >
            <LogOut size={18} />

            <span
              className='
                text-sm
                font-medium
              '
            >
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      <main
        className='
          flex-1
          overflow-auto
        '
      >
        {children}
      </main>
    </div>
  );
}
