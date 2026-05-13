'use client';

import Image from 'next/image';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',

        headers: {
          'content-type': 'application/json',
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className='
        relative
        min-h-screen

        overflow-hidden

        flex items-center
        justify-center

        px-6
      '
    >
      {/* ====================================================== */}
      {/* BACKGROUND IMAGE */}
      {/* ====================================================== */}

      <Image
        src='/images/01_home_hero_facade_wide.jpg'
        alt='Background'
        fill
        priority
        className='
          object-cover
        '
      />

      {/* ====================================================== */}
      {/* DARK OVERLAY */}
      {/* ====================================================== */}

      <div
        className='
          absolute inset-0

          bg-black/70
          backdrop-blur-[2px]
        '
      />

      {/* ====================================================== */}
      {/* GRADIENT GLOW */}
      {/* ====================================================== */}

      <div
        className='
          absolute
          top-[-120px]
          left-[-120px]

          w-[350px]
          h-[350px]

          rounded-full

          bg-blue-500/20

          blur-3xl
        '
      />

      <div
        className='
          absolute
          bottom-[-120px]
          right-[-120px]

          w-[350px]
          h-[350px]

          rounded-full

          bg-indigo-500/20

          blur-3xl
        '
      />

      {/* ====================================================== */}
      {/* LOGIN CARD */}
      {/* ====================================================== */}

      <div
        className='
          relative z-10

          w-full
          max-w-md

          rounded-[32px]

          border border-white/10

          bg-white/[0.06]

          backdrop-blur-2xl

          shadow-[0_20px_80px_rgba(0,0,0,0.55)]

          overflow-hidden
        '
      >
        {/* TOP BORDER */}

        <div
          className='
            h-1.5

            bg-gradient-to-r
            from-[#7C8B78]
            via-[#7C8B78]
            to-[#7C8B78]
          '
        />

        {/* CONTENT */}

        <div className='p-8 lg:p-10'>
          {/* ====================================================== */}
          {/* LOGO */}
          {/* ====================================================== */}

          <div className='text-center mb-10'>
            <div
              className='
                mx-auto mb-5

                w-20 h-20

                rounded-3xl

                bg-gradient-to-br
                from-[#A9825A]
                to-[#A9825A]

                flex items-center
                justify-center

                shadow-lg
                shadow-blue-500/30
              '
            >
              <ShieldCheck size={38} className='text-white' />
            </div>

            <h1
              className='
                text-3xl
                font-semibold
                tracking-tight
                text-white
              '
            >
              Amaya Admin
            </h1>

            <p
              className='
                mt-3
                text-sm
                text-neutral-300
              '
            >
              Secure access to the CRM dashboard
            </p>
          </div>

          {/* ====================================================== */}
          {/* FORM */}
          {/* ====================================================== */}

          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* EMAIL */}

            <div>
              <label
                className='
                  block
                  mb-2

                  text-sm
                  font-medium
                  text-neutral-200
                '
              >
                Email Address
              </label>

              <div className='relative'>
                <Mail
                  size={18}
                  className='
                    absolute
                    left-4 top-1/2
                    -translate-y-1/2

                    text-neutral-400
                  '
                />

                <input
                  type='email'
                  placeholder='admin@amaya.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='
                    w-full

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.05]

                    pl-12
                    pr-4
                    py-4

                    text-sm
                    text-white

                    outline-none

                    placeholder:text-neutral-500

                    focus:border-blue-500/50
                    focus:bg-white/[0.08]

                    transition-all
                  '
                  autoFocus
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                className='
                  block
                  mb-2

                  text-sm
                  font-medium
                  text-neutral-200
                '
              >
                Password
              </label>

              <div className='relative'>
                <Lock
                  size={18}
                  className='
                    absolute
                    left-4 top-1/2
                    -translate-y-1/2

                    text-neutral-400
                  '
                />

                <input
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='
                    w-full

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.05]

                    pl-12
                    pr-4
                    py-4

                    text-sm
                    text-white

                    outline-none

                    placeholder:text-neutral-500

                    focus:border-blue-500/50
                    focus:bg-white/[0.08]

                    transition-all
                  '
                />
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <div
                className='
                  rounded-2xl

                  border border-red-500/20

                  bg-red-500/10

                  px-4 py-3

                  text-sm
                  text-red-300
                '
              >
                {error}
              </div>
            )}

            {/* BUTTON */}

            <button
              type='submit'
              disabled={loading || !email || !password}
              className='
                group

                w-full

                rounded-2xl

                bg-gradient-to-r
                from-[#E7D8C6]
                to-[#A9825A]

                py-4

                text-sm
                font-semibold
                text-white

                shadow-lg
                shadow-blue-500/30

                hover:scale-[1.01]
                hover:opacity-95

                disabled:opacity-50
                disabled:cursor-not-allowed

                transition-all
              '
            >
              <span
                className='
                  flex items-center
                  justify-center
                  gap-2
                '
              >
                {loading ? 'Signing in...' : 'Sign In'}

                {!loading && (
                  <ArrowRight
                    size={18}
                    className='
                      transition-transform
                      group-hover:translate-x-1
                    '
                  />
                )}
              </span>
            </button>
          </form>

          {/* FOOTER */}

          <div
            className='
              mt-8
              pt-6

              border-t border-white/10

              text-center
            '
          >
            <p
              className='
                text-xs
                text-neutral-400
                leading-relaxed
              '
            >
              Protected admin portal for Amaya CRM operations and lead
              management.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
