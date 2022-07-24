import React from 'react';
import Link from '@docusaurus/Link';

export default function Footer() {
  return (
    <footer className="bg-background-100 py-6 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start p-4 md:px-12">
        <div className="mt-8 flex w-full flex-col lg:flex-row">
          <div className="mt-12 grid flex-1 grid-cols-2 gap-8 md:grid-cols-2 lg:mt-0 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-normal text-text-100">指路</div>
              <ul className="list-none space-y-2 p-0 text-sm">
                <li>
                  <Link
                    href="https://www.yltzdhbc.top/"
                    className="text-current hover:no-underline"
                  >
                    DJI知名工程师
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://blog.csdn.net/qq_44343584"
                    className="text-current hover:no-underline"
                  >
                    武汉知名CEO
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div className="space-y-2">
              <div className="text-sm font-normal text-text-100">Sponsors</div>
              <ul className="list-none space-y-2 p-0 text-sm">
                <li>
                  <Link
                    href="/sponsors"
                    className="text-current hover:no-underline"
                  >
                    Sponsors
                  </Link>
                </li>
              </ul>
            </div> */}
            {/* <div className="space-y-2">
              <div className="text-sm font-normal text-text-100">
                Code of Conduct
              </div>
              <ul className="list-none space-y-2 p-0 text-sm">
                <li>
                  <Link
                    href="https://github.com/PatelN123/Digital-Support-Notes/blob/main/CODE_OF_CONDUCT.md"
                    className="text-current hover:no-underline"
                  >
                    Code of Conduct
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className="bold vercel-callout mt-7 w-full text-center text-sm text-text-100">
          <a
            href="https://vercel.com/?utm_source=digital-support-notes&utm_campaign=oss"
            className="vercel-callout"
          >
            Hosted and sponsored by ▲ Vercel
          </a>
        </div>
        <div className="mt-3 w-full text-center text-sm text-text-100">
          Copyright ©  All rights reserved. <br />
          {/* Coded with ❤️ by <a href="https://nayanpatel.net">
            Nayan Patel
          </a> &{' '}
          <a href="https://github.com/PatelN123/Digital-Support-Notes">
            the community
          </a> */}
        </div>
      </div>
    </footer>
  );
}
