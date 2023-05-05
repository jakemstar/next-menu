import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { type Session } from 'next-auth';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import ThemeSwitch from './themeswitch';
import { signOut } from 'next-auth/react';
import { classNames } from '~/utils/utility';

const navigation = [
  { name: 'Dashboard', href: '/', current: false },
  { name: 'Calendar', href: '/calendar', current: false },
  { name: 'Catalog', href: '/catalog', current: false },
  { name: 'Create', href: '/create', current: false },
]

type NavProps = {
  session: Session
}

export default function NavBar(props: NavProps) {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <Disclosure as="nav" className="transition-colors bg-indigo-200 dark:bg-slate-900">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="active:translate-y-0.5 inline-flex items-center justify-center p-2 transition-colors rounded-md text-slate-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Image
                    className="block w-auto h-8 lg:hidden dark:hidden"
                    src="/logoDark.svg"
                    alt="Your Company"
                    height={32}
                    width={50}
                  />
                  <Image
                    className="hidden w-auto h-8 lg:block dark:hidden"
                    src="/logoDark.svg"
                    alt="Your Company"
                    height={32}
                    width={50}
                  />
                  <Image
                    className="hidden w-auto h-8 dark:lg:hidden dark:block"
                    src="/logoLight.svg"
                    alt="Your Company"
                    height={32}
                    width={50}
                  />
                  <Image
                    className="hidden w-auto h-8 dark:lg:block"
                    src="/logoLight.svg"
                    alt="Your Company"
                    height={32}
                    width={50}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href === currentRoute ? 'bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900' : 'text-slate-900 dark:text-slate-50 hover:bg-slate-900 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-slate-900',
                          'transition-colors rounded-md px-3 py-2 font-medium active:translate-y-0.5'
                        )}
                        aria-current={item.href === currentRoute ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-3 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ThemeSwitch />
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="active:translate-y-0.5 flex text-sm transition-colors rounded-full bg-slate-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="w-10 h-10 rounded-full"
                        height={40}
                        width={40}
                        src={`${props.session.user.image||"/defaultProfile.jpg"}`}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 transition-colors origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={classNames(active ? 'bg-slate-100' : '', 'transition-colors block px-4 py-2 text-sm text-slate-700 active:translate-y-0.5')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(active ? 'bg-slate-100' : '', 'transition-colors block px-4 py-2 text-sm text-slate-700 active:translate-y-0.5')}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                              <button
                                onClick={() => void signOut()}
                                className={classNames(active ? 'bg-slate-100' : '', 'transition-colors block px-4 py-2 text-sm text-slate-700 w-full text-left active:translate-y-0.5')}
                              >
                                Sign out
                              </button>
                          )}
                        </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                  <Link key={item.name} href={item.href}
                  className={classNames(
                    item.href === currentRoute ? 'bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900' : 'text-slate-900 bg-violet-50 hover:bg-slate-900 hover:text-slate-50 dark:text-slate-50 dark:bg-slate-700 dark:hover:text-slate-900 dark:hover:bg-slate-50',
                    'transition-colors block rounded-md px-3 py-2 text-base font-medium active:translate-y-0.5'
                    )}
                    aria-current={item.href === currentRoute ? 'page' : undefined}>
                    {item.name}
                  </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
